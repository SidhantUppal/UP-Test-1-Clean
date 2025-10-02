const sql = require('mssql');
require('dotenv').config();

const config = {
    server: process.env.DB_HOST || process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '1433'),
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
        enableArithAbort: true
    }
};

async function checkDocumentTables() {
    let pool;
    try {
        console.log('Connecting to Azure V7-Dev Database...');
        pool = await sql.connect(config);
        console.log('Connected successfully!\n');

        // Query 1: Find all tables with "Document" in the name
        console.log('=== TABLES WITH "DOCUMENT" IN NAME ===\n');
        const documentTablesQuery = `
            SELECT 
                s.name AS SchemaName,
                t.name AS TableName,
                t.create_date AS CreatedDate,
                t.modify_date AS ModifiedDate,
                p.rows AS TableRowCount
            FROM sys.tables t
            INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
            LEFT JOIN sys.partitions p ON t.object_id = p.object_id AND p.index_id IN (0, 1)
            WHERE t.name LIKE '%Document%'
            ORDER BY s.name, t.name;
        `;
        
        const documentTables = await pool.request().query(documentTablesQuery);
        
        if (documentTables.recordset.length > 0) {
            console.log('Found tables with "Document" in name:');
            documentTables.recordset.forEach(table => {
                console.log(`  ${table.SchemaName}.${table.TableName} (Rows: ${table.RowCount || 0})`);
            });
        } else {
            console.log('No tables found with "Document" in the name.');
        }

        // Query 2: Check V7 schema specifically for document-related tables
        console.log('\n=== V7 SCHEMA DOCUMENT-RELATED TABLES ===\n');
        const v7DocumentQuery = `
            SELECT 
                t.name AS TableName,
                p.rows AS RowCount
            FROM sys.tables t
            INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
            LEFT JOIN sys.partitions p ON t.object_id = p.object_id AND p.index_id IN (0, 1)
            WHERE s.name = 'V7' 
                AND (t.name LIKE '%Document%' 
                     OR t.name LIKE '%Template%'
                     OR t.name LIKE '%Attachment%')
            ORDER BY t.name;
        `;
        
        const v7DocumentTables = await pool.request().query(v7DocumentQuery);
        
        if (v7DocumentTables.recordset.length > 0) {
            console.log('Found document-related tables in V7 schema:');
            v7DocumentTables.recordset.forEach(table => {
                console.log(`  V7.${table.TableName} (Rows: ${table.RowCount || 0})`);
            });
        } else {
            console.log('No document-related tables found in V7 schema.');
        }

        // Query 3: Get detailed structure of any Document tables found
        console.log('\n=== DETAILED STRUCTURE OF DOCUMENT TABLES ===\n');
        
        // First check if specific document tables exist
        const checkSpecificTables = `
            SELECT 
                s.name AS SchemaName,
                t.name AS TableName
            FROM sys.tables t
            INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
            WHERE (s.name = 'V7' AND t.name IN ('DocumentTemplate', 'DocumentTemplateTag', 'DocumentTemplateUsage'))
               OR t.name LIKE '%DocumentTemplate%'
            ORDER BY s.name, t.name;
        `;
        
        const specificTables = await pool.request().query(checkSpecificTables);
        
        for (const table of specificTables.recordset) {
            console.log(`\nTable: ${table.SchemaName}.${table.TableName}`);
            console.log('----------------------------------------');
            
            // Get column details
            const columnsQuery = `
                SELECT 
                    c.name AS ColumnName,
                    ty.name AS DataType,
                    c.max_length AS MaxLength,
                    c.is_nullable AS IsNullable,
                    c.is_identity AS IsIdentity,
                    ISNULL(pk.is_primary_key, 0) AS IsPrimaryKey,
                    ISNULL(fk.referenced_table, '') AS ForeignKeyReference
                FROM sys.columns c
                INNER JOIN sys.types ty ON c.user_type_id = ty.user_type_id
                INNER JOIN sys.tables t ON c.object_id = t.object_id
                INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
                LEFT JOIN (
                    SELECT ic.object_id, ic.column_id, 1 AS is_primary_key
                    FROM sys.index_columns ic
                    INNER JOIN sys.indexes i ON ic.object_id = i.object_id AND ic.index_id = i.index_id
                    WHERE i.is_primary_key = 1
                ) pk ON c.object_id = pk.object_id AND c.column_id = pk.column_id
                LEFT JOIN (
                    SELECT 
                        fkc.parent_object_id,
                        fkc.parent_column_id,
                        OBJECT_SCHEMA_NAME(fkc.referenced_object_id) + '.' + OBJECT_NAME(fkc.referenced_object_id) AS referenced_table
                    FROM sys.foreign_key_columns fkc
                ) fk ON c.object_id = fk.parent_object_id AND c.column_id = fk.parent_column_id
                WHERE s.name = '${table.SchemaName}' AND t.name = '${table.TableName}'
                ORDER BY c.column_id;
            `;
            
            const columns = await pool.request().query(columnsQuery);
            
            columns.recordset.forEach(col => {
                let colDef = `  ${col.ColumnName} ${col.DataType}`;
                if (col.DataType.includes('char') || col.DataType.includes('binary')) {
                    colDef += `(${col.MaxLength === -1 ? 'MAX' : col.MaxLength})`;
                }
                if (col.IsPrimaryKey) colDef += ' [PK]';
                if (col.IsIdentity) colDef += ' [IDENTITY]';
                if (!col.IsNullable) colDef += ' NOT NULL';
                if (col.ForeignKeyReference) colDef += ` -> ${col.ForeignKeyReference}`;
                console.log(colDef);
            });
            
            // Get row count
            const countQuery = `SELECT COUNT(*) AS Count FROM [${table.SchemaName}].[${table.TableName}]`;
            const count = await pool.request().query(countQuery);
            console.log(`\nRow Count: ${count.recordset[0].Count}`);
        }

        // Query 4: Check for any other potential document storage tables
        console.log('\n=== OTHER POTENTIAL DOCUMENT-RELATED TABLES ===\n');
        const otherDocumentQuery = `
            SELECT DISTINCT
                s.name AS SchemaName,
                t.name AS TableName,
                p.rows AS RowCount
            FROM sys.tables t
            INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
            LEFT JOIN sys.partitions p ON t.object_id = p.object_id AND p.index_id IN (0, 1)
            WHERE t.name LIKE '%File%'
               OR t.name LIKE '%Attach%'
               OR t.name LIKE '%Upload%'
               OR t.name LIKE '%Storage%'
               OR t.name LIKE '%Content%'
               OR t.name LIKE '%Template%'
            ORDER BY s.name, t.name;
        `;
        
        const otherDocTables = await pool.request().query(otherDocumentQuery);
        
        if (otherDocTables.recordset.length > 0) {
            console.log('Found other potential document-related tables:');
            const grouped = {};
            otherDocTables.recordset.forEach(table => {
                if (!grouped[table.SchemaName]) {
                    grouped[table.SchemaName] = [];
                }
                grouped[table.SchemaName].push(`${table.TableName} (Rows: ${table.RowCount || 0})`);
            });
            
            Object.keys(grouped).sort().forEach(schema => {
                console.log(`\n  Schema: ${schema}`);
                grouped[schema].forEach(table => {
                    console.log(`    - ${table}`);
                });
            });
        }

    } catch (error) {
        console.error('Error:', error.message);
        if (error.code) {
            console.error('Error Code:', error.code);
        }
    } finally {
        if (pool) {
            await pool.close();
            console.log('\nDatabase connection closed.');
        }
    }
}

// Run the check
checkDocumentTables().catch(console.error);