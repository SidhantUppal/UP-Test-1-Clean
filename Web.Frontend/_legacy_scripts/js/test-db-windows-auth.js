const sql = require('mssql');

const config = {
  server: 'localhost',
  database: 'V7-Dev',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    trustedConnection: true, // Use Windows Authentication
    enableArithAbort: true
  },
  authentication: {
    type: 'ntlm'
  }
};

async function testConnection() {
  try {
    console.log('Connecting to SQL Server using Windows Authentication...');
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
      console.log('\nCreating LegalRegister table...');
      
      try {
        await pool.request().query(`
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
          )
        `);
        
        console.log('✅ LegalRegister table created successfully!');
        
        // Create indexes
        console.log('Creating indexes...');
        await pool.request().query('CREATE INDEX IX_LegalRegister_IndustryName ON LegalRegister(IndustryName)');
        await pool.request().query('CREATE INDEX IX_LegalRegister_ComplianceStatus ON LegalRegister(ComplianceStatus)');
        await pool.request().query('CREATE INDEX IX_LegalRegister_RiskLevel ON LegalRegister(RiskLevel)');
        console.log('✅ Indexes created successfully!');
        
        // Insert sample data
        console.log('\nInserting sample data...');
        const sampleData = [
          ['Data Protection Act 2018', 'https://www.legislation.gov.uk/ukpga/2018/12/contents', 'High', 'Compliant', 'Annual review completed. All data processing activities documented.', 'Technology', 'Data Protection'],
          ['Health and Safety at Work Act 1974', 'https://www.hse.gov.uk/legislation/hswa.htm', 'Medium', 'Compliant', 'Risk assessments up to date. Safety training scheduled for Q2.', 'Manufacturing', 'Health & Safety'],
          ['Environmental Protection Act 1990', 'https://www.legislation.gov.uk/ukpga/1990/43/contents', 'Low', 'Non-Compliant', 'Waste management procedures need updating.', 'Manufacturing', 'Environmental'],
          ['Equality Act 2010', 'https://www.legislation.gov.uk/ukpga/2010/15/contents', 'Medium', 'Compliant', 'Diversity and inclusion policies reviewed and updated.', 'All Industries', 'Employment'],
          ['GDPR (UK)', 'https://ico.org.uk/for-organisations/guide-to-data-protection/', 'High', 'Partially Compliant', 'Privacy impact assessments in progress.', 'Technology', 'Data Protection']
        ];
        
        for (const data of sampleData) {
          await pool.request()
            .input('name', sql.NVarChar, data[0])
            .input('link', sql.NVarChar, data[1])
            .input('riskLevel', sql.NVarChar, data[2])
            .input('complianceStatus', sql.NVarChar, data[3])
            .input('notes', sql.NVarChar, data[4])
            .input('industryName', sql.NVarChar, data[5])
            .input('legislationType', sql.NVarChar, data[6])
            .query(`
              INSERT INTO LegalRegister (Name, Link, RiskLevel, ComplianceStatus, Notes, IndustryName, LegislationType)
              VALUES (@name, @link, @riskLevel, @complianceStatus, @notes, @industryName, @legislationType)
            `);
        }
        
        console.log('✅ Sample data inserted successfully!');
        
      } catch (createErr) {
        console.error('❌ Error creating table:', createErr.message);
      }
    }
    
    await pool.close();
    console.log('\n✅ Connection closed successfully');
    
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('\nError details:', err);
  }
}

testConnection();