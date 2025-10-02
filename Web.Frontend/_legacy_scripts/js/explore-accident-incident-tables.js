#!/usr/bin/env node

/**
 * Database Explorer - Accident and Incident Tables
 * 
 * This script connects to the Azure V7 Dev database and searches for tables
 * containing "Accident" or "Incidents" in their names (case-insensitive).
 * 
 * Based on the established database connection patterns from the V7 codebase.
 */

const sql = require('mssql');
const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv to load from the root .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Azure SQL configuration based on established patterns
const azureConfig = {
  user: process.env.DB_USER || 'YOUR_DB_USER',
  password: process.env.DB_PASSWORD || 'YOUR_DB_PASSWORD',
  server: process.env.DB_SERVER || 'YOUR_DATABASE_SERVER.database.windows.net',
  database: process.env.DB_NAME || 'V7-Dev',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true' || true,
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' || false,
    connectTimeout: 30000,
    requestTimeout: 30000,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool = null;

/**
 * Establish database connection using the established V7 pattern
 */
async function connectToDatabase() {
  if (pool) return pool;
  
  try {
    console.log('🔍 Connecting to Azure V7 Dev Database...');
    console.log(`   Server: ${azureConfig.server}`);
    console.log(`   Database: ${azureConfig.database}`);
    console.log(`   User: ${azureConfig.user}`);
    
    pool = await sql.connect(azureConfig);
    
    // Test connection with a simple query
    await pool.request().query('SELECT 1 as test');
    
    console.log('✅ Successfully connected to Azure V7 Dev Database');
    return pool;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    throw error;
  }
}

/**
 * Search for tables containing "Accident", "Incident", or "Incidents" (case-insensitive)
 */
async function findAccidentIncidentTables() {
  const pool = await connectToDatabase();
  
  console.log('\n🔍 Searching for tables containing "Accident", "Incident", or "Incidents"...\n');
  
  const searchQuery = `
    SELECT 
      t.TABLE_SCHEMA,
      t.TABLE_NAME,
      t.TABLE_TYPE,
      CASE 
        WHEN UPPER(t.TABLE_NAME) LIKE '%ACCIDENT%' THEN 'Accident'
        WHEN UPPER(t.TABLE_NAME) LIKE '%INCIDENT%' AND UPPER(t.TABLE_NAME) NOT LIKE '%INCIDENTS%' THEN 'Incident'
        WHEN UPPER(t.TABLE_NAME) LIKE '%INCIDENTS%' THEN 'Incidents'
        ELSE 'Match'
      END as MATCH_TYPE
    FROM INFORMATION_SCHEMA.TABLES t
    WHERE (
      UPPER(t.TABLE_NAME) LIKE '%ACCIDENT%' 
      OR UPPER(t.TABLE_NAME) LIKE '%INCIDENT%'
    )
    AND t.TABLE_TYPE = 'BASE TABLE'
    ORDER BY t.TABLE_SCHEMA, t.TABLE_NAME
  `;
  
  try {
    const result = await pool.request().query(searchQuery);
    return result.recordset;
  } catch (error) {
    console.error('❌ Error searching for tables:', error.message);
    throw error;
  }
}

/**
 * Get detailed column information for a specific table
 */
async function getTableSchema(schemaName, tableName) {
  const pool = await connectToDatabase();
  
  const schemaQuery = `
    SELECT 
      c.COLUMN_NAME,
      c.DATA_TYPE,
      c.IS_NULLABLE,
      c.COLUMN_DEFAULT,
      c.CHARACTER_MAXIMUM_LENGTH,
      c.NUMERIC_PRECISION,
      c.NUMERIC_SCALE,
      c.ORDINAL_POSITION,
      CASE 
        WHEN pk.COLUMN_NAME IS NOT NULL THEN 'YES'
        ELSE 'NO'
      END as IS_PRIMARY_KEY,
      CASE 
        WHEN fk.COLUMN_NAME IS NOT NULL THEN 'YES'
        ELSE 'NO'
      END as IS_FOREIGN_KEY,
      fk.REFERENCED_TABLE_SCHEMA,
      fk.REFERENCED_TABLE_NAME,
      fk.REFERENCED_COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS c
    LEFT JOIN (
      SELECT 
        ku.TABLE_SCHEMA,
        ku.TABLE_NAME,
        ku.COLUMN_NAME
      FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
      INNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
        ON tc.CONSTRAINT_NAME = ku.CONSTRAINT_NAME
        AND tc.TABLE_SCHEMA = ku.TABLE_SCHEMA
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
      INNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
        ON rc.CONSTRAINT_NAME = ku.CONSTRAINT_NAME
        AND rc.CONSTRAINT_SCHEMA = ku.TABLE_SCHEMA
      INNER JOIN INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE ccu
        ON rc.UNIQUE_CONSTRAINT_NAME = ccu.CONSTRAINT_NAME
        AND rc.UNIQUE_CONSTRAINT_SCHEMA = ccu.CONSTRAINT_SCHEMA
    ) fk ON c.TABLE_SCHEMA = fk.TABLE_SCHEMA 
      AND c.TABLE_NAME = fk.TABLE_NAME 
      AND c.COLUMN_NAME = fk.COLUMN_NAME
    WHERE c.TABLE_SCHEMA = @schemaName 
      AND c.TABLE_NAME = @tableName
    ORDER BY c.ORDINAL_POSITION
  `;
  
  try {
    const request = pool.request();
    request.input('schemaName', sql.NVarChar, schemaName);
    request.input('tableName', sql.NVarChar, tableName);
    
    const result = await request.query(schemaQuery);
    return result.recordset;
  } catch (error) {
    console.error(`❌ Error getting schema for ${schemaName}.${tableName}:`, error.message);
    return [];
  }
}

/**
 * Get row count for a table
 */
async function getTableRowCount(schemaName, tableName) {
  const pool = await connectToDatabase();
  
  try {
    const countQuery = `SELECT COUNT(*) as row_count FROM [${schemaName}].[${tableName}]`;
    const result = await pool.request().query(countQuery);
    return result.recordset[0].row_count;
  } catch (error) {
    console.warn(`⚠️  Could not get row count for ${schemaName}.${tableName}: ${error.message}`);
    return 'N/A';
  }
}

/**
 * Display results in a formatted table
 */
function displayResults(tables, schemaDetails) {
  console.log('📊 SEARCH RESULTS SUMMARY');
  console.log('=' .repeat(80));
  console.log(`Found ${tables.length} table(s) containing "Accident", "Incident", or "Incidents":\n`);
  
  if (tables.length === 0) {
    console.log('No tables found matching the search criteria.');
    return;
  }
  
  // Group by match type
  const accidentTables = tables.filter(t => t.MATCH_TYPE === 'Accident');
  const incidentTables = tables.filter(t => t.MATCH_TYPE === 'Incident');
  const incidentsTables = tables.filter(t => t.MATCH_TYPE === 'Incidents');
  
  if (accidentTables.length > 0) {
    console.log('🚨 TABLES CONTAINING "ACCIDENT":');
    console.log('-'.repeat(50));
    accidentTables.forEach(table => {
      const rowCount = schemaDetails[`${table.TABLE_SCHEMA}.${table.TABLE_NAME}`]?.rowCount || 'N/A';
      console.log(`   📋 [${table.TABLE_SCHEMA}].[${table.TABLE_NAME}] (${rowCount} rows)`);
    });
    console.log('');
  }
  
  if (incidentTables.length > 0) {
    console.log('📋 TABLES CONTAINING "INCIDENT":');
    console.log('-'.repeat(50));
    incidentTables.forEach(table => {
      const rowCount = schemaDetails[`${table.TABLE_SCHEMA}.${table.TABLE_NAME}`]?.rowCount || 'N/A';
      console.log(`   📋 [${table.TABLE_SCHEMA}].[${table.TABLE_NAME}] (${rowCount} rows)`);
    });
    console.log('');
  }
  
  if (incidentsTables.length > 0) {
    console.log('📋 TABLES CONTAINING "INCIDENTS":');
    console.log('-'.repeat(50));
    incidentsTables.forEach(table => {
      const rowCount = schemaDetails[`${table.TABLE_SCHEMA}.${table.TABLE_NAME}`]?.rowCount || 'N/A';
      console.log(`   📋 [${table.TABLE_SCHEMA}].[${table.TABLE_NAME}] (${rowCount} rows)`);
    });
    console.log('');
  }
  
  // Display detailed schema information
  console.log('🔍 DETAILED SCHEMA INFORMATION');
  console.log('=' .repeat(80));
  
  tables.forEach(table => {
    const fullTableName = `${table.TABLE_SCHEMA}.${table.TABLE_NAME}`;
    const schema = schemaDetails[fullTableName]?.columns || [];
    const rowCount = schemaDetails[fullTableName]?.rowCount || 'N/A';
    
    console.log(`\n📋 TABLE: [${table.TABLE_SCHEMA}].[${table.TABLE_NAME}]`);
    console.log(`   Type: ${table.TABLE_TYPE}`);
    console.log(`   Rows: ${rowCount}`);
    console.log(`   Columns: ${schema.length}`);
    console.log('   ' + '-'.repeat(75));
    
    if (schema.length > 0) {
      console.log('   Column Name'.padEnd(25) + 'Data Type'.padEnd(15) + 'Nullable'.padEnd(10) + 'Key Info');
      console.log('   ' + '-'.repeat(75));
      
      schema.forEach(column => {
        let dataType = column.DATA_TYPE;
        if (column.CHARACTER_MAXIMUM_LENGTH) {
          dataType += `(${column.CHARACTER_MAXIMUM_LENGTH})`;
        } else if (column.NUMERIC_PRECISION) {
          dataType += `(${column.NUMERIC_PRECISION}${column.NUMERIC_SCALE ? ',' + column.NUMERIC_SCALE : ''})`;
        }
        
        let keyInfo = '';
        if (column.IS_PRIMARY_KEY === 'YES') keyInfo += 'PK ';
        if (column.IS_FOREIGN_KEY === 'YES') keyInfo += `FK→${column.REFERENCED_TABLE_SCHEMA}.${column.REFERENCED_TABLE_NAME}`;
        
        console.log(`   ${column.COLUMN_NAME.padEnd(25)}${dataType.padEnd(15)}${column.IS_NULLABLE.padEnd(10)}${keyInfo}`);
      });
    } else {
      console.log('   ❌ Could not retrieve column information');
    }
  });
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('🔍 Azure V7 Dev Database Explorer');
    console.log('=' .repeat(50));
    console.log('Searching for tables containing "Accident", "Incident", or "Incidents"...\n');
    
    // Find matching tables
    const tables = await findAccidentIncidentTables();
    
    // Get detailed schema information for each table
    const schemaDetails = {};
    for (const table of tables) {
      const fullTableName = `${table.TABLE_SCHEMA}.${table.TABLE_NAME}`;
      console.log(`📊 Analyzing schema for ${fullTableName}...`);
      
      const [columns, rowCount] = await Promise.all([
        getTableSchema(table.TABLE_SCHEMA, table.TABLE_NAME),
        getTableRowCount(table.TABLE_SCHEMA, table.TABLE_NAME)
      ]);
      
      schemaDetails[fullTableName] = { columns, rowCount };
    }
    
    console.log('✅ Schema analysis complete!\n');
    
    // Display results
    displayResults(tables, schemaDetails);
    
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    if (error.code) {
      console.error(`   Error Code: ${error.code}`);
    }
    process.exit(1);
  } finally {
    if (pool) {
      try {
        await pool.close();
        console.log('\n🔌 Database connection closed.');
      } catch (closeError) {
        console.warn('⚠️  Warning: Error closing database connection:', closeError.message);
      }
    }
  }
}

// Execute the script
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = { connectToDatabase, findAccidentIncidentTables, getTableSchema };