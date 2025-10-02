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

async function examineLinkedRecord() {
  try {
    const pool = await sql.connect(config);
    
    console.log('🔍 Examining V7.LegalRegisterLinkedRecord table structure...\n');
    
    const schemaQuery = `
      SELECT 
        c.COLUMN_NAME,
        c.DATA_TYPE,
        c.IS_NULLABLE,
        c.COLUMN_DEFAULT,
        c.CHARACTER_MAXIMUM_LENGTH,
        c.ORDINAL_POSITION,
        CASE 
          WHEN pk.COLUMN_NAME IS NOT NULL THEN 'YES'
          ELSE 'NO'
        END as IS_PRIMARY_KEY
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
      WHERE c.TABLE_SCHEMA = 'V7' 
        AND c.TABLE_NAME = 'LegalRegisterLinkedRecord'
      ORDER BY c.ORDINAL_POSITION
    `;
    
    const result = await pool.request().query(schemaQuery);
    
    if (result.recordset.length > 0) {
      console.log('Column Name'.padEnd(25) + 'Data Type'.padEnd(15) + 'Nullable'.padEnd(10) + 'Key Info');
      console.log('-'.repeat(70));
      
      result.recordset.forEach(column => {
        let dataType = column.DATA_TYPE;
        if (column.CHARACTER_MAXIMUM_LENGTH && column.CHARACTER_MAXIMUM_LENGTH !== -1) {
          dataType += `(${column.CHARACTER_MAXIMUM_LENGTH})`;
        } else if (column.CHARACTER_MAXIMUM_LENGTH === -1) {
          dataType += '(MAX)';
        }
        
        let keyInfo = '';
        if (column.IS_PRIMARY_KEY === 'YES') keyInfo = 'PK';
        
        console.log(`${column.COLUMN_NAME.padEnd(25)}${dataType.padEnd(15)}${column.IS_NULLABLE.padEnd(10)}${keyInfo}`);
      });
      
      // Get sample data
      console.log('\n🔍 Sample data (first 5 rows):');
      const dataQuery = 'SELECT TOP 5 * FROM [V7].[LegalRegisterLinkedRecord]';
      const dataResult = await pool.request().query(dataQuery);
      
      if (dataResult.recordset.length > 0) {
        console.log(JSON.stringify(dataResult.recordset, null, 2));
      } else {
        console.log('No data found in table.');
      }
    } else {
      console.log('❌ Table V7.LegalRegisterLinkedRecord not found or no access.');
    }
    
    await pool.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

examineLinkedRecord();