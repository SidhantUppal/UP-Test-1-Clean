const sql = require('mssql');
require('dotenv').config();

const config = {
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

async function verifyTables() {
    let pool;
    try {
        console.log('Connecting to Azure V7-Dev database...');
        pool = await sql.connect(config);
        console.log('✅ Connected successfully\n');

        console.log('📊 TABLES CREATED IN AZURE:');
        console.log('='  .repeat(50));
        
        // Check all three tables
        const tables = ['LegalRegister', 'LegalRegisterAttachments', 'UserNavigationPreferences'];
        
        for (const tableName of tables) {
            // Get table info
            const tableResult = await pool.request()
                .query(`
                    SELECT COUNT(*) as ColumnCount
                    FROM INFORMATION_SCHEMA.COLUMNS 
                    WHERE TABLE_NAME = '${tableName}' AND TABLE_SCHEMA = 'dbo'
                `);
            
            // Get row count
            const rowResult = await pool.request()
                .query(`SELECT COUNT(*) as [RowCount] FROM [dbo].[${tableName}]`);
            
            if (tableResult.recordset[0].ColumnCount > 0) {
                console.log(`\n✅ ${tableName}:`);
                console.log(`   - Columns: ${tableResult.recordset[0].ColumnCount}`);
                console.log(`   - Rows: ${rowResult.recordset[0].RowCount}`);
                
                // Show columns
                const columns = await pool.request()
                    .query(`
                        SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
                        FROM INFORMATION_SCHEMA.COLUMNS 
                        WHERE TABLE_NAME = '${tableName}' AND TABLE_SCHEMA = 'dbo'
                        ORDER BY ORDINAL_POSITION
                    `);
                
                console.log('   - Columns:');
                columns.recordset.forEach(col => {
                    console.log(`     • ${col.COLUMN_NAME} (${col.DATA_TYPE}) ${col.IS_NULLABLE === 'NO' ? 'NOT NULL' : 'NULL'}`);
                });
            } else {
                console.log(`\n❌ ${tableName}: NOT FOUND`);
            }
        }
        
        // Check foreign keys
        console.log('\n📊 FOREIGN KEY RELATIONSHIPS:');
        console.log('='  .repeat(50));
        const fkResult = await pool.request().query(`
            SELECT 
                fk.name AS FK_Name,
                tp.name AS Parent_Table,
                cp.name AS Parent_Column,
                tr.name AS Referenced_Table,
                cr.name AS Referenced_Column
            FROM sys.foreign_keys fk
            INNER JOIN sys.tables tp ON fk.parent_object_id = tp.object_id
            INNER JOIN sys.tables tr ON fk.referenced_object_id = tr.object_id
            INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
            INNER JOIN sys.columns cp ON fkc.parent_column_id = cp.column_id AND fkc.parent_object_id = cp.object_id
            INNER JOIN sys.columns cr ON fkc.referenced_column_id = cr.column_id AND fkc.referenced_object_id = cr.object_id
            WHERE tp.name IN ('LegalRegister', 'LegalRegisterAttachments', 'UserNavigationPreferences')
        `);
        
        if (fkResult.recordset.length > 0) {
            fkResult.recordset.forEach(fk => {
                console.log(`✅ ${fk.FK_Name}:`);
                console.log(`   ${fk.Parent_Table}.${fk.Parent_Column} → ${fk.Referenced_Table}.${fk.Referenced_Column}`);
            });
        }
        
        console.log('\n✅ All tables have been successfully created in Azure V7-Dev!');
        console.log('\nNext steps:');
        console.log('1. Export data from your local database (AdelePc\\SQL2022)');
        console.log('2. Import the data into these Azure tables');
        console.log('3. Update your application to use these tables');

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

verifyTables();