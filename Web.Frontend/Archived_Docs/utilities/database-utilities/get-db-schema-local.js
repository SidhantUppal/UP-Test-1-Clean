import sql from 'mssql';
import fs from 'fs';
import path from 'path';

// Database configuration - run this from your local machine
const config = {
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD', 
  server: 'YOUR_DATABASE_SERVER.database.windows.net',
  database: 'V7-Dev',
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

async function getDatabaseSchema() {
  let pool;
  
  try {
    console.log('🔍 Connecting to Azure SQL Database...');
    pool = await sql.connect(config);
    console.log('✅ Connected successfully!\n');
    
    const results = {
      timestamp: new Date().toISOString(),
      database: config.database,
      server: config.server,
      tables: [],
      permissionTables: [],
      userTables: [],
      rolesTables: [],
      allColumns: []
    };
    
    // 1. Get all tables
    console.log('📋 Getting all tables...');
    const tablesQuery = `
      SELECT 
        s.name AS SchemaName,
        t.name AS TableName,
        t.object_id,
        p.rows as RowCount
      FROM sys.tables t
      INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
      LEFT JOIN sys.dm_db_partition_stats p ON t.object_id = p.object_id AND p.index_id < 2
      ORDER BY s.name, t.name
    `;
    
    const tables = await pool.request().query(tablesQuery);
    results.tables = tables.recordset;
    console.log(`Found ${results.tables.length} tables\n`);
    
    // 2. Get all columns for all tables
    console.log('📊 Getting column information...');
    const columnsQuery = `
      SELECT 
        s.name AS SchemaName,
        t.name AS TableName,
        c.name AS ColumnName,
        ty.name AS DataType,
        c.max_length,
        c.precision,
        c.scale,
        c.is_nullable,
        c.is_identity,
        CASE WHEN pk.column_id IS NOT NULL THEN 1 ELSE 0 END AS IsPrimaryKey
      FROM sys.tables t
      INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
      INNER JOIN sys.columns c ON t.object_id = c.object_id
      INNER JOIN sys.types ty ON c.user_type_id = ty.user_type_id
      LEFT JOIN sys.indexes pk ON t.object_id = pk.object_id AND pk.is_primary_key = 1
      LEFT JOIN sys.index_columns pc ON pk.object_id = pc.object_id 
        AND pk.index_id = pc.index_id AND c.column_id = pc.column_id
      ORDER BY s.name, t.name, c.column_id
    `;
    
    const columns = await pool.request().query(columnsQuery);
    results.allColumns = columns.recordset;
    
    // 3. Find permission-related tables
    const permissionKeywords = ['permission', 'role', 'user', 'auth', 'access', 'right', 'privilege'];
    
    results.permissionTables = results.tables.filter(table => {
      const tableName = table.TableName.toLowerCase();
      return permissionKeywords.some(keyword => tableName.includes(keyword));
    });
    
    console.log(`Found ${results.permissionTables.length} permission-related tables:`);
    results.permissionTables.forEach(table => {
      console.log(`  - ${table.SchemaName}.${table.TableName} (${table.RowCount || 0} rows)`);
    });
    
    // 4. Get sample data from permission tables
    console.log('\n📋 Getting sample data from permission tables...');
    for (const table of results.permissionTables) {
      try {
        const sampleQuery = `SELECT TOP 3 * FROM [${table.SchemaName}].[${table.TableName}]`;
        const sampleData = await pool.request().query(sampleQuery);
        table.sampleData = sampleData.recordset;
        console.log(`  ✅ Got ${sampleData.recordset.length} sample rows from ${table.TableName}`);
      } catch (err) {
        console.log(`  ⚠️  Could not get sample data from ${table.TableName}: ${err.message}`);
        table.sampleData = [];
      }
    }
    
    // 5. Get foreign key relationships
    console.log('\n🔗 Getting foreign key relationships...');
    const fkQuery = `
      SELECT 
        fk.name AS ForeignKeyName,
        OBJECT_SCHEMA_NAME(fk.parent_object_id) AS ParentSchema,
        OBJECT_NAME(fk.parent_object_id) AS ParentTable,
        COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS ParentColumn,
        OBJECT_SCHEMA_NAME(fk.referenced_object_id) AS ReferencedSchema,
        OBJECT_NAME(fk.referenced_object_id) AS ReferencedTable,
        COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS ReferencedColumn
      FROM sys.foreign_keys AS fk
      INNER JOIN sys.foreign_key_columns AS fkc ON fk.object_id = fkc.constraint_object_id
      ORDER BY ParentSchema, ParentTable, ForeignKeyName
    `;
    
    const foreignKeys = await pool.request().query(fkQuery);
    results.foreignKeys = foreignKeys.recordset;
    
    // 6. Look for specific permission patterns
    console.log('\n🔍 Looking for permission patterns...');
    const permissionColumns = results.allColumns.filter(col => {
      const columnName = col.ColumnName.toLowerCase();
      return permissionKeywords.some(keyword => columnName.includes(keyword));
    });
    
    results.permissionColumns = permissionColumns;
    console.log(`Found ${permissionColumns.length} permission-related columns across all tables`);
    
    // 7. Save to file
    const outputPath = path.join(process.cwd(), 'database-schema-complete.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\n✅ Complete schema analysis saved to: ${outputPath}`);
    
    // 8. Create summary report
    const summaryPath = path.join(process.cwd(), 'database-schema-summary.txt');
    let summary = `T100 Database Schema Analysis
Generated: ${results.timestamp}
Database: ${results.database}
Server: ${results.server}

===== SUMMARY =====
Total Tables: ${results.tables.length}
Permission-related Tables: ${results.permissionTables.length}
Permission-related Columns: ${results.permissionColumns.length}
Foreign Key Relationships: ${results.foreignKeys.length}

===== PERMISSION TABLES =====
`;
    
    results.permissionTables.forEach(table => {
      summary += `\n${table.SchemaName}.${table.TableName} (${table.RowCount || 0} rows)\n`;
      const tableColumns = results.allColumns.filter(col => 
        col.SchemaName === table.SchemaName && col.TableName === table.TableName
      );
      tableColumns.forEach(col => {
        summary += `  - ${col.ColumnName} (${col.DataType}${col.IsPrimaryKey ? ', PK' : ''}${col.is_nullable ? ', nullable' : ''})\n`;
      });
      
      if (table.sampleData && table.sampleData.length > 0) {
        summary += `  Sample data:\n`;
        table.sampleData.forEach((row, idx) => {
          summary += `    Row ${idx + 1}: ${JSON.stringify(row)}\n`;
        });
      }
    });
    
    summary += `\n===== PERMISSION COLUMNS IN OTHER TABLES =====\n`;
    const groupedColumns = {};
    results.permissionColumns.forEach(col => {
      const tableKey = `${col.SchemaName}.${col.TableName}`;
      if (!groupedColumns[tableKey]) groupedColumns[tableKey] = [];
      groupedColumns[tableKey].push(col);
    });
    
    Object.keys(groupedColumns).forEach(tableKey => {
      summary += `\n${tableKey}:\n`;
      groupedColumns[tableKey].forEach(col => {
        summary += `  - ${col.ColumnName} (${col.DataType})\n`;
      });
    });
    
    fs.writeFileSync(summaryPath, summary);
    console.log(`📊 Summary report saved to: ${summaryPath}`);
    
    console.log('\n🎉 Analysis complete!');
    
  } catch (err) {
    console.error('\n❌ Error:', err.message);
    console.error('This script should be run from your local machine with database access.');
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

getDatabaseSchema();