const sql = require('mssql');

const config = {
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

async function checkAllTables() {
  try {
    console.log('Connecting to Azure SQL Database (V7-Dev)...');
    const pool = await sql.connect(config);
    console.log('✅ Connected to V7-Dev database!\n');
    
    // First, list ALL tables to see what's there
    console.log('=== ALL TABLES IN V7-Dev DATABASE ===');
    const allTablesResult = await pool.request().query(`
      SELECT 
        TABLE_SCHEMA,
        TABLE_NAME,
        TABLE_TYPE
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_SCHEMA, TABLE_NAME
    `);
    
    // Group tables by schema
    const tablesBySchema = {};
    allTablesResult.recordset.forEach(row => {
      if (!tablesBySchema[row.TABLE_SCHEMA]) {
        tablesBySchema[row.TABLE_SCHEMA] = [];
      }
      tablesBySchema[row.TABLE_SCHEMA].push(row.TABLE_NAME);
    });
    
    // Display tables by schema
    Object.keys(tablesBySchema).forEach(schema => {
      console.log(`\nSchema: ${schema}`);
      console.log('Tables:');
      tablesBySchema[schema].forEach(table => {
        console.log(`  - ${table}`);
      });
    });
    
    // Now search more broadly for our specific tables
    console.log('\n\n=== SEARCHING FOR FIRE/RISK ASSESSMENT TABLES ===');
    const fireTablesResult = await pool.request().query(`
      SELECT 
        TABLE_SCHEMA,
        TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME LIKE '%fire%' 
         OR TABLE_NAME LIKE '%pas79%' 
         OR TABLE_NAME LIKE '%risk%'
         OR TABLE_NAME LIKE '%martyn%'
         OR TABLE_NAME LIKE '%assessment%'
      ORDER BY TABLE_SCHEMA, TABLE_NAME
    `);
    
    if (fireTablesResult.recordset.length > 0) {
      console.log('Found potential risk/fire assessment tables:');
      fireTablesResult.recordset.forEach(row => {
        console.log(`  - ${row.TABLE_SCHEMA}.${row.TABLE_NAME}`);
      });
    } else {
      console.log('No fire/risk assessment tables found');
    }
    
    // Search for document tables
    console.log('\n=== SEARCHING FOR DOCUMENT TABLES ===');
    const docTablesResult = await pool.request().query(`
      SELECT 
        TABLE_SCHEMA,
        TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME LIKE '%document%'
         OR TABLE_NAME LIKE '%bundle%'
         OR TABLE_NAME LIKE '%template%'
      ORDER BY TABLE_SCHEMA, TABLE_NAME
    `);
    
    if (docTablesResult.recordset.length > 0) {
      console.log('Found document-related tables:');
      docTablesResult.recordset.forEach(row => {
        console.log(`  - ${row.TABLE_SCHEMA}.${row.TABLE_NAME}`);
      });
    } else {
      console.log('No document tables found');
    }
    
    // Search for task tables
    console.log('\n=== SEARCHING FOR TASK TABLES ===');
    const taskTablesResult = await pool.request().query(`
      SELECT 
        TABLE_SCHEMA,
        TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME LIKE '%task%'
      ORDER BY TABLE_SCHEMA, TABLE_NAME
    `);
    
    if (taskTablesResult.recordset.length > 0) {
      console.log('Found task-related tables:');
      taskTablesResult.recordset.forEach(row => {
        console.log(`  - ${row.TABLE_SCHEMA}.${row.TABLE_NAME}`);
      });
    } else {
      console.log('No task tables found');
    }
    
    // Count total tables
    console.log(`\n=== SUMMARY ===`);
    console.log(`Total tables in V7-Dev: ${allTablesResult.recordset.length}`);
    console.log(`Fire/Risk tables found: ${fireTablesResult.recordset.length}`);
    console.log(`Document tables found: ${docTablesResult.recordset.length}`);
    console.log(`Task tables found: ${taskTablesResult.recordset.length}`);
    
    await pool.close();
    console.log('\n✅ Complete table scan finished');
    
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
  }
}

checkAllTables();