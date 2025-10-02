import sql from 'mssql';

// Azure SQL configuration for V7-Dev
const azureConfig = {
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  server: 'YOUR_DATABASE_SERVER.database.windows.net',
  database: 'V7-Dev',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectTimeout: 30000,
    requestTimeout: 30000
  }
};

async function checkDocumentTables() {
  let pool;
  
  try {
    console.log('🔍 Connecting to Azure V7-Dev Database...');
    pool = await sql.connect(azureConfig);
    console.log('✅ Connected to Azure SQL Database\n');
    
    // Query 1: Find all tables with "Document" in the name
    console.log('=== TABLES WITH "DOCUMENT" IN NAME ===\n');
    const documentTablesQuery = `
      SELECT 
        TABLE_SCHEMA as SchemaName,
        TABLE_NAME as TableName,
        TABLE_TYPE as TableType
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME LIKE '%Document%'
      ORDER BY TABLE_SCHEMA, TABLE_NAME
    `;
    
    const documentTables = await pool.request().query(documentTablesQuery);
    
    if (documentTables.recordset.length > 0) {
      console.log('Found tables with "Document" in name:');
      documentTables.recordset.forEach(table => {
        console.log(`  - [${table.SchemaName}].[${table.TableName}] (${table.TableType})`);
      });
    } else {
      console.log('No tables found with "Document" in the name.');
    }
    
    // Query 2: Check for document-related tables (broader search)
    console.log('\n=== CHECKING OTHER DOCUMENT-RELATED TABLES ===\n');
    const relatedTablesQuery = `
      SELECT 
        TABLE_SCHEMA as SchemaName,
        TABLE_NAME as TableName
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME LIKE '%Attachment%'
         OR TABLE_NAME LIKE '%File%'
         OR TABLE_NAME LIKE '%Template%'
         OR TABLE_NAME LIKE '%Upload%'
      ORDER BY TABLE_SCHEMA, TABLE_NAME
    `;
    
    const relatedTables = await pool.request().query(relatedTablesQuery);
    
    if (relatedTables.recordset.length > 0) {
      console.log('Found related tables (Attachment/File/Template/Upload):');
      relatedTables.recordset.forEach(table => {
        console.log(`  - [${table.SchemaName}].[${table.TableName}]`);
      });
    }
    
    // Query 3: Get detailed structure of document-related tables
    console.log('\n=== DETAILED STRUCTURE OF DOCUMENT TABLES ===\n');
    
    // Get list of all document-related tables for structure check
    const allDocumentTablesQuery = `
      SELECT DISTINCT
        TABLE_SCHEMA as SchemaName,
        TABLE_NAME as TableName
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME LIKE '%Document%'
         OR TABLE_NAME LIKE '%Attachment%'
         OR TABLE_NAME LIKE '%Template%'
      ORDER BY TABLE_SCHEMA, TABLE_NAME
    `;
    
    const allDocTables = await pool.request().query(allDocumentTablesQuery);
    
    for (const table of allDocTables.recordset) {
      console.log(`\n📋 [${table.SchemaName}].[${table.TableName}]:`);
      
      // Get column structure
      const columnsQuery = `
        SELECT 
          COLUMN_NAME as ColumnName,
          DATA_TYPE as DataType,
          CHARACTER_MAXIMUM_LENGTH as MaxLength,
          IS_NULLABLE as IsNullable,
          COLUMN_DEFAULT as DefaultValue
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = @schema
          AND TABLE_NAME = @table
        ORDER BY ORDINAL_POSITION
      `;
      
      const columnsRequest = pool.request();
      columnsRequest.input('schema', sql.NVarChar, table.SchemaName);
      columnsRequest.input('table', sql.NVarChar, table.TableName);
      
      const columns = await columnsRequest.query(columnsQuery);
      
      console.log('  Columns:');
      columns.recordset.forEach(col => {
        const nullable = col.IsNullable === 'YES' ? 'NULL' : 'NOT NULL';
        const length = col.MaxLength ? `(${col.MaxLength === -1 ? 'MAX' : col.MaxLength})` : '';
        const defaultVal = col.DefaultValue ? ` DEFAULT ${col.DefaultValue}` : '';
        console.log(`    - ${col.ColumnName}: ${col.DataType}${length} ${nullable}${defaultVal}`);
      });
      
      // Check row count
      const countQuery = `
        SELECT COUNT(*) as RowCount
        FROM [${table.SchemaName}].[${table.TableName}]
      `;
      
      try {
        const countResult = await pool.request().query(countQuery);
        console.log(`  Row Count: ${countResult.recordset[0].RowCount}`);
      } catch (err) {
        console.log(`  Row Count: Unable to query (${err.message})`);
      }
    }
    
    // Query 4: Check V7 schema specifically for document tables
    console.log('\n=== V7 SCHEMA DOCUMENT TABLES ===\n');
    const v7DocumentQuery = `
      SELECT 
        TABLE_NAME as TableName
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = 'V7'
        AND (TABLE_NAME LIKE '%Document%' 
         OR TABLE_NAME LIKE '%Attachment%'
         OR TABLE_NAME LIKE '%Template%'
         OR TABLE_NAME LIKE '%File%')
      ORDER BY TABLE_NAME
    `;
    
    const v7DocTables = await pool.request().query(v7DocumentQuery);
    
    if (v7DocTables.recordset.length > 0) {
      console.log('V7 Schema document-related tables:');
      v7DocTables.recordset.forEach(table => {
        console.log(`  - [V7].[${table.TableName}]`);
      });
    } else {
      console.log('No document-related tables found in V7 schema.');
    }
    
    // Query 5: Check for DocumentTemplate tables specifically
    console.log('\n=== CHECKING FOR DocumentTemplate TABLES ===\n');
    const templateQuery = `
      SELECT 
        TABLE_SCHEMA as SchemaName,
        TABLE_NAME as TableName
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME IN ('DocumentTemplate', 'DocumentTemplateTag', 'DocumentTemplateUsage')
      ORDER BY TABLE_SCHEMA, TABLE_NAME
    `;
    
    const templateTables = await pool.request().query(templateQuery);
    
    if (templateTables.recordset.length > 0) {
      console.log('Found DocumentTemplate tables:');
      templateTables.recordset.forEach(table => {
        console.log(`  ✅ [${table.SchemaName}].[${table.TableName}] EXISTS`);
      });
    } else {
      console.log('❌ DocumentTemplate tables (DocumentTemplate, DocumentTemplateTag, DocumentTemplateUsage) NOT FOUND in any schema.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.originalError) {
      console.error('Original error:', error.originalError.message);
    }
  } finally {
    if (pool) {
      await pool.close();
      console.log('\n✅ Database connection closed');
    }
  }
}

// Run the check
checkDocumentTables().catch(console.error);