const sql = require('mssql');
require('dotenv').config();

// Azure configuration
const azureConfig = {
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: false,
        connectTimeout: 30000,
        requestTimeout: 30000
    }
};

// Local configuration
const localConfig = {
    server: 'localhost',
    database: 'V7-Dev',
    user: 'sa',
    password: 'Portal@2024!', // Try this first, then T100@2024! if it fails
    options: {
        encrypt: false,
        trustServerCertificate: true,
        connectTimeout: 30000,
        requestTimeout: 30000
    }
};

async function getTables(pool) {
    const result = await pool.request().query(`
        SELECT 
            TABLE_SCHEMA,
            TABLE_NAME,
            (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
             WHERE c.TABLE_SCHEMA = t.TABLE_SCHEMA AND c.TABLE_NAME = t.TABLE_NAME) as COLUMN_COUNT
        FROM INFORMATION_SCHEMA.TABLES t
        WHERE TABLE_TYPE = 'BASE TABLE'
        ORDER BY TABLE_SCHEMA, TABLE_NAME
    `);
    return result.recordset;
}

async function getTableDetails(pool, schema, table) {
    const columns = await pool.request()
        .input('schema', sql.NVarChar, schema)
        .input('table', sql.NVarChar, table)
        .query(`
            SELECT 
                COLUMN_NAME,
                DATA_TYPE,
                CHARACTER_MAXIMUM_LENGTH,
                IS_NULLABLE,
                COLUMN_DEFAULT
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = @schema AND TABLE_NAME = @table
            ORDER BY ORDINAL_POSITION
        `);
    
    const rowCount = await pool.request()
        .query(`SELECT COUNT(*) as count FROM [${schema}].[${table}]`);
    
    return {
        columns: columns.recordset,
        rowCount: rowCount.recordset[0].count
    };
}

async function compareDatabase() {
    let localPool, azurePool;
    
    try {
        // Connect to local database
        console.log('Connecting to LOCAL database...');
        try {
            localPool = await sql.connect(localConfig);
            console.log('✅ Connected to LOCAL V7-Dev database');
        } catch (err) {
            if (err.message.includes('Login failed')) {
                console.log('First password failed, trying alternative...');
                localConfig.password = 'T100@2024!';
                localPool = await sql.connect(localConfig);
                console.log('✅ Connected to LOCAL V7-Dev database with alternative password');
            } else {
                throw err;
            }
        }
        
        // Connect to Azure database
        console.log('\nConnecting to AZURE database...');
        azurePool = await sql.connect(azureConfig);
        console.log('✅ Connected to AZURE V7-Dev database');
        
        // Get tables from both databases
        console.log('\nFetching table information...');
        const localTables = await getTables(localPool);
        const azureTables = await getTables(azurePool);
        
        console.log(`\nLocal database: ${localTables.length} tables`);
        console.log(`Azure database: ${azureTables.length} tables`);
        
        // Create lookup maps
        const azureTableMap = new Map();
        azureTables.forEach(t => {
            azureTableMap.set(`${t.TABLE_SCHEMA}.${t.TABLE_NAME}`, t);
        });
        
        // Find tables that exist in local but not in Azure
        const missingInAzure = [];
        const existsInBoth = [];
        
        for (const localTable of localTables) {
            const key = `${localTable.TABLE_SCHEMA}.${localTable.TABLE_NAME}`;
            if (!azureTableMap.has(key)) {
                missingInAzure.push(localTable);
            } else {
                existsInBoth.push(localTable);
            }
        }
        
        console.log(`\n📊 COMPARISON RESULTS:`);
        console.log(`Tables only in LOCAL: ${missingInAzure.length}`);
        console.log(`Tables in BOTH: ${existsInBoth.length}`);
        
        if (missingInAzure.length > 0) {
            console.log('\n🔴 TABLES MISSING IN AZURE (need migration):');
            console.log('=' .repeat(60));
            
            for (const table of missingInAzure) {
                console.log(`\n${table.TABLE_SCHEMA}.${table.TABLE_NAME}`);
                try {
                    const details = await getTableDetails(localPool, table.TABLE_SCHEMA, table.TABLE_NAME);
                    console.log(`  Columns: ${details.columns.length}`);
                    console.log(`  Rows: ${details.rowCount}`);
                    
                    // Show first few columns
                    console.log('  Sample columns:');
                    details.columns.slice(0, 5).forEach(col => {
                        console.log(`    - ${col.COLUMN_NAME} (${col.DATA_TYPE}${col.CHARACTER_MAXIMUM_LENGTH ? `(${col.CHARACTER_MAXIMUM_LENGTH})` : ''})`);
                    });
                    if (details.columns.length > 5) {
                        console.log(`    ... and ${details.columns.length - 5} more columns`);
                    }
                } catch (err) {
                    console.log(`  ⚠️  Error getting details: ${err.message}`);
                }
            }
        }
        
        // Check for tables that exist in both but might have different row counts
        if (existsInBoth.length > 0) {
            console.log('\n🟡 TABLES IN BOTH DATABASES (checking row counts):');
            console.log('=' .repeat(60));
            
            let differencesFound = false;
            for (const table of existsInBoth.slice(0, 10)) { // Check first 10 tables
                try {
                    const localDetails = await getTableDetails(localPool, table.TABLE_SCHEMA, table.TABLE_NAME);
                    const azureDetails = await getTableDetails(azurePool, table.TABLE_SCHEMA, table.TABLE_NAME);
                    
                    if (localDetails.rowCount !== azureDetails.rowCount) {
                        if (!differencesFound) {
                            console.log('\nTables with different row counts:');
                            differencesFound = true;
                        }
                        console.log(`  ${table.TABLE_SCHEMA}.${table.TABLE_NAME}: Local=${localDetails.rowCount}, Azure=${azureDetails.rowCount}`);
                    }
                } catch (err) {
                    // Skip errors for this comparison
                }
            }
            
            if (!differencesFound) {
                console.log('  All checked tables have matching row counts');
            }
        }
        
        // Close connections
        await localPool.close();
        await azurePool.close();
        
        console.log('\n✅ Comparison complete!');
        
    } catch (err) {
        console.error('\n❌ Error:', err.message);
        console.error('Details:', err);
    } finally {
        if (localPool) await localPool.close();
        if (azurePool) await azurePool.close();
    }
}

// Run comparison
compareDatabase();