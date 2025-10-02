const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

// Azure SQL configuration (from .env file)
const azureConfig = {
  user: process.env.DB_USER || 'YOUR_DB_USER',
  password: process.env.DB_PASSWORD || 'YOUR_DB_PASSWORD',
  server: process.env.DB_SERVER || 'YOUR_DATABASE_SERVER.database.windows.net',
  database: process.env.DB_NAME || 'V7-Dev',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    connectTimeout: 30000,
    requestTimeout: 30000
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

async function exploreAccidentTables() {
  let pool;
  
  try {
    console.log('🔍 Connecting to Azure V7 Dev Database...');
    console.log(`   Server: ${azureConfig.server}`);
    console.log(`   Database: ${azureConfig.database}`);
    
    // Connect to database
    pool = await sql.connect(azureConfig);
    console.log('✅ Successfully connected to Azure SQL Database\n');
    
    // Query to find all tables containing "Accident" in their name
    console.log('🔍 Searching for tables containing "Accident" in their names...\n');
    
    const tableSearchQuery = `
      SELECT 
        t.TABLE_SCHEMA as SchemaName,
        t.TABLE_NAME as TableName,
        t.TABLE_TYPE as TableType
      FROM INFORMATION_SCHEMA.TABLES t
      WHERE UPPER(t.TABLE_NAME) LIKE '%ACCIDENT%'
      ORDER BY t.TABLE_SCHEMA, t.TABLE_NAME
    `;
    
    const tablesResult = await pool.request().query(tableSearchQuery);
    
    if (tablesResult.recordset.length === 0) {
      console.log('❌ No tables found containing "Accident" in their names.\n');
      
      // Let's also search for similar terms
      console.log('🔍 Searching for tables with similar terms (Incident, Case, Event)...\n');
      
      const similarTermsQuery = `
        SELECT 
          t.TABLE_SCHEMA as SchemaName,
          t.TABLE_NAME as TableName,
          t.TABLE_TYPE as TableType
        FROM INFORMATION_SCHEMA.TABLES t
        WHERE UPPER(t.TABLE_NAME) LIKE '%INCIDENT%'
           OR UPPER(t.TABLE_NAME) LIKE '%CASE%'
           OR UPPER(t.TABLE_NAME) LIKE '%EVENT%'
           OR UPPER(t.TABLE_NAME) LIKE '%HAZARD%'
        ORDER BY t.TABLE_SCHEMA, t.TABLE_NAME
      `;
      
      const similarResult = await pool.request().query(similarTermsQuery);
      
      if (similarResult.recordset.length > 0) {
        console.log('📋 Found tables with similar terms:');
        console.log('='.repeat(80));
        similarResult.recordset.forEach((table, index) => {
          console.log(`${index + 1}. [${table.SchemaName}].[${table.TableName}] (${table.TableType})`);
        });
        console.log('\n');
      }
      
      return;
    }
    
    console.log(`✅ Found ${tablesResult.recordset.length} table(s) containing "Accident":`);
    console.log('='.repeat(80));
    
    // Display found tables
    tablesResult.recordset.forEach((table, index) => {
      console.log(`${index + 1}. [${table.SchemaName}].[${table.TableName}] (${table.TableType})`);
    });
    console.log('\n');
    
    // Get detailed schema information for each Accident table
    for (const table of tablesResult.recordset) {
      console.log(`📋 Schema details for [${table.SchemaName}].[${table.TableName}]:`);
      console.log('-'.repeat(60));
      
      const schemaQuery = `
        SELECT 
          c.COLUMN_NAME as ColumnName,
          c.DATA_TYPE as DataType,
          c.CHARACTER_MAXIMUM_LENGTH as MaxLength,
          c.IS_NULLABLE as IsNullable,
          c.COLUMN_DEFAULT as DefaultValue,
          CASE 
            WHEN pk.COLUMN_NAME IS NOT NULL THEN 'YES'
            ELSE 'NO'
          END as IsPrimaryKey,
          CASE 
            WHEN fk.COLUMN_NAME IS NOT NULL THEN fk.REFERENCED_TABLE_SCHEMA + '.' + fk.REFERENCED_TABLE_NAME + '(' + fk.REFERENCED_COLUMN_NAME + ')'
            ELSE ''
          END as ForeignKeyReference
        FROM INFORMATION_SCHEMA.COLUMNS c
        LEFT JOIN (
          SELECT 
            ku.TABLE_SCHEMA,
            ku.TABLE_NAME,
            ku.COLUMN_NAME
          FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
          JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
            ON tc.CONSTRAINT_NAME = ku.CONSTRAINT_NAME
            AND tc.TABLE_SCHEMA = ku.TABLE_SCHEMA
            AND tc.TABLE_NAME = ku.TABLE_NAME
          WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
        ) pk ON c.TABLE_SCHEMA = pk.TABLE_SCHEMA 
            AND c.TABLE_NAME = pk.TABLE_NAME 
            AND c.COLUMN_NAME = pk.COLUMN_NAME
        LEFT JOIN (
          SELECT 
            ku.TABLE_SCHEMA,
            ku.TABLE_NAME,
            ku.COLUMN_NAME,
            ccu.TABLE_SCHEMA as REFERENCED_TABLE_SCHEMA,
            ccu.TABLE_NAME as REFERENCED_TABLE_NAME,
            ccu.COLUMN_NAME as REFERENCED_COLUMN_NAME
          FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS rc
          JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
            ON rc.CONSTRAINT_NAME = ku.CONSTRAINT_NAME
          JOIN INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE ccu
            ON rc.UNIQUE_CONSTRAINT_NAME = ccu.CONSTRAINT_NAME
        ) fk ON c.TABLE_SCHEMA = fk.TABLE_SCHEMA 
             AND c.TABLE_NAME = fk.TABLE_NAME 
             AND c.COLUMN_NAME = fk.COLUMN_NAME
        WHERE c.TABLE_SCHEMA = '${table.SchemaName}'
          AND c.TABLE_NAME = '${table.TableName}'
        ORDER BY c.ORDINAL_POSITION
      `;
      
      try {
        const schemaResult = await pool.request().query(schemaQuery);
        
        if (schemaResult.recordset.length > 0) {
          console.log('Columns:');
          schemaResult.recordset.forEach((column, index) => {
            const typeInfo = column.MaxLength ? `${column.DataType}(${column.MaxLength})` : column.DataType;
            const pkFlag = column.IsPrimaryKey === 'YES' ? ' [PK]' : '';
            const fkFlag = column.ForeignKeyReference ? ` [FK -> ${column.ForeignKeyReference}]` : '';
            const nullable = column.IsNullable === 'YES' ? 'NULL' : 'NOT NULL';
            const defaultVal = column.DefaultValue ? ` DEFAULT ${column.DefaultValue}` : '';
            
            console.log(`  ${index + 1}. ${column.ColumnName}: ${typeInfo} ${nullable}${defaultVal}${pkFlag}${fkFlag}`);
          });
        }
        
        // Get row count if it's a table
        if (table.TableType === 'BASE TABLE') {
          try {
            const countQuery = `SELECT COUNT(*) as RowCount FROM [${table.SchemaName}].[${table.TableName}]`;
            const countResult = await pool.request().query(countQuery);
            console.log(`\nRow Count: ${countResult.recordset[0].RowCount}`);
          } catch (countError) {
            console.log(`\nRow Count: Unable to determine (${countError.message})`);
          }
        }
        
      } catch (schemaError) {
        console.log(`❌ Error getting schema details: ${schemaError.message}`);
      }
      
      console.log('\n');
    }
    
  } catch (error) {
    console.error('❌ Database exploration failed:');
    console.error('   Error:', error.message);
    console.error('   Details:', error);
    
    if (error.code === 'ELOGIN') {
      console.error('\n💡 This appears to be an authentication error.');
      console.error('   Please verify the database credentials in .env file.');
    } else if (error.code === 'ESOCKET') {
      console.error('\n💡 This appears to be a connection error.');
      console.error('   Please check network connectivity and server address.');
    }
    
  } finally {
    if (pool) {
      try {
        await pool.close();
        console.log('🔌 Database connection closed.');
      } catch (closeError) {
        console.error('Error closing connection:', closeError.message);
      }
    }
  }
}

// Run the exploration
console.log('🚀 Starting Azure V7 Dev Database Table Exploration\n');
exploreAccidentTables()
  .then(() => {
    console.log('✅ Exploration completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  });