const sql = require('mssql');

const config = {
  server: 'localhost',
  database: 'V7-Dev',
  user: 'sa',
  password: 'T100@2024!',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

async function testConnection() {
  try {
    console.log('Connecting to SQL Server...');
    const pool = await sql.connect(config);
    console.log('✅ Connected to V7-Dev database successfully!');
    
    // Check if LegalRegister table exists
    console.log('\nChecking for LegalRegister table...');
    const tableCheck = await pool.request().query(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'LegalRegister'
    `);
    
    if (tableCheck.recordset.length > 0) {
      console.log('✅ LegalRegister table exists');
      
      // Get row count
      const countResult = await pool.request().query('SELECT COUNT(*) as count FROM LegalRegister');
      console.log(`   - Current row count: ${countResult.recordset[0].count}`);
      
      // Get table structure
      const columns = await pool.request().query(`
        SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'LegalRegister'
        ORDER BY ORDINAL_POSITION
      `);
      
      console.log('\n   Table structure:');
      columns.recordset.forEach(col => {
        const length = col.CHARACTER_MAXIMUM_LENGTH ? `(${col.CHARACTER_MAXIMUM_LENGTH === -1 ? 'MAX' : col.CHARACTER_MAXIMUM_LENGTH})` : '';
        console.log(`   - ${col.COLUMN_NAME}: ${col.DATA_TYPE}${length} ${col.IS_NULLABLE === 'NO' ? 'NOT NULL' : 'NULL'}`);
      });
      
    } else {
      console.log('❌ LegalRegister table does not exist');
      console.log('\nWould you like to create it? Here\'s the SQL:');
      console.log(`
CREATE TABLE LegalRegister (
    LegalRegisterID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(500) NOT NULL,
    Link NVARCHAR(1000),
    LatestUpdate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    RiskLevel NVARCHAR(50),
    ComplianceStatus NVARCHAR(50),
    Notes NVARCHAR(MAX),
    IndustryName NVARCHAR(200),
    LegislationType NVARCHAR(100),
    CreatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    ModifiedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    CreatedBy NVARCHAR(100),
    ModifiedBy NVARCHAR(100)
);

-- Create indexes for better performance
CREATE INDEX IX_LegalRegister_IndustryName ON LegalRegister(IndustryName);
CREATE INDEX IX_LegalRegister_ComplianceStatus ON LegalRegister(ComplianceStatus);
CREATE INDEX IX_LegalRegister_RiskLevel ON LegalRegister(RiskLevel);
      `);
    }
    
    // List all tables in the database
    console.log('\n\nOther tables in V7-Dev database:');
    const tables = await pool.request().query(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
    `);
    
    tables.recordset.forEach(table => {
      console.log(`   - ${table.TABLE_NAME}`);
    });
    
    await pool.close();
    console.log('\n✅ Connection closed successfully');
    
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('\nPlease check:');
    console.error('1. SQL Server is running');
    console.error('2. Database "V7-Dev" exists');
    console.error('3. Credentials are correct');
    console.error('4. SQL Server allows SQL authentication');
  }
}

testConnection();