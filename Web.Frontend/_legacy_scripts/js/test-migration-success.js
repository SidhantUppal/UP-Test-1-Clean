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

async function testMigration() {
    try {
        console.log('Connecting to Azure V7-Dev database...');
        const pool = await sql.connect(config);
        console.log('✅ Connected successfully\n');
        
        // Check if tables exist
        const tables = ['LegalRegister', 'LegalRegisterAttachments', 'UserNavigationPreferences'];
        
        for (const tableName of tables) {
            const result = await pool.request()
                .input('tableName', sql.NVarChar, tableName)
                .query(`
                    SELECT 
                        t.name AS TableName,
                        p.rows AS RowCount,
                        (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @tableName) AS ColumnCount
                    FROM sys.tables t
                    INNER JOIN sys.partitions p ON t.object_id = p.object_id
                    WHERE p.index_id <= 1 AND t.name = @tableName
                `);
            
            if (result.recordset.length > 0) {
                const tableInfo = result.recordset[0];
                console.log(`✅ ${tableInfo.TableName}:`);
                console.log(`   - Columns: ${tableInfo.ColumnCount}`);
                console.log(`   - Rows: ${tableInfo.RowCount}`);
            } else {
                console.log(`❌ ${tableName}: NOT FOUND`);
            }
        }
        
        // Check relationships
        console.log('\n📊 Checking foreign key relationships:');
        const fkResult = await pool.request().query(`
            SELECT 
                fk.name AS FK_Name,
                tp.name AS Parent_Table,
                tr.name AS Referenced_Table
            FROM sys.foreign_keys fk
            INNER JOIN sys.tables tp ON fk.parent_object_id = tp.object_id
            INNER JOIN sys.tables tr ON fk.referenced_object_id = tr.object_id
            WHERE tp.name IN ('LegalRegister', 'LegalRegisterAttachments', 'UserNavigationPreferences')
        `);
        
        if (fkResult.recordset.length > 0) {
            fkResult.recordset.forEach(fk => {
                console.log(`✅ ${fk.FK_Name}: ${fk.Parent_Table} -> ${fk.Referenced_Table}`);
            });
        } else {
            console.log('No foreign keys found (this is OK for these tables)');
        }
        
        await pool.close();
        console.log('\n✅ Migration verification complete!');
        
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

testMigration();