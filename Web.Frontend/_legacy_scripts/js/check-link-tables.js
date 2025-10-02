const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  server: 'YOUR_DATABASE_SERVER.database.windows.net',
  database: 'V7-Dev',
  options: { encrypt: true, trustServerCertificate: false }
};

async function findLinkTables() {
  try {
    const pool = await sql.connect(config);
    
    console.log('🔍 Searching for tables with linking/relationship keywords...\n');
    
    const query = `
      SELECT TABLE_SCHEMA, TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE (
        UPPER(TABLE_NAME) LIKE '%LINK%' 
        OR UPPER(TABLE_NAME) LIKE '%RELATION%'
        OR UPPER(TABLE_NAME) LIKE '%ASSOCIATION%'
        OR UPPER(TABLE_NAME) LIKE '%REFERENCE%'
        OR UPPER(TABLE_NAME) LIKE '%CASE%'
      )
      AND TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_SCHEMA, TABLE_NAME
    `;
    
    const result = await pool.request().query(query);
    console.log(`Found ${result.recordset.length} table(s) with linking/relationship keywords:`);
    result.recordset.forEach(table => {
      console.log(`  📋 [${table.TABLE_SCHEMA}].[${table.TABLE_NAME}]`);
    });
    
    await pool.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

findLinkTables();