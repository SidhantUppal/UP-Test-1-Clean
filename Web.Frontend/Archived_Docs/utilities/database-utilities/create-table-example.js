const sql = require('mssql');

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

async function createTable() {
  try {
    console.log('Connecting to Azure SQL...');
    await sql.connect(config);
    console.log('✅ Connected successfully\n');

    // Example: Create a ContractorCompliance table
    const createTableQuery = `
      IF NOT EXISTS (SELECT * FROM sys.tables t 
                     JOIN sys.schemas s ON t.schema_id = s.schema_id 
                     WHERE s.name = 'V7' AND t.name = 'ContractorCompliance')
      BEGIN
        CREATE TABLE [V7].[ContractorCompliance] (
          ComplianceID INT IDENTITY(1,1) PRIMARY KEY,
          ContractorID INT NOT NULL,
          UserAreaID INT NOT NULL,
          ComplianceType NVARCHAR(100) NOT NULL,
          ComplianceStatus NVARCHAR(50) NOT NULL,
          ExpiryDate DATETIMEOFFSET (7) NULL,
          DocumentPath NVARCHAR(500) NULL,
          Notes NVARCHAR(MAX) NULL,
          CreatedByUserID INT NOT NULL,
          CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET(),
          ModifiedByUserID INT NULL,
          ModifiedDate DATETIMEOFFSET NULL,
          
          -- Foreign Keys
          CONSTRAINT FK_ContractorCompliance_UserArea 
            FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
          
          -- Indexes
          INDEX IX_ContractorCompliance_ContractorID (ContractorID),
          INDEX IX_ContractorCompliance_ExpiryDate (ExpiryDate)
        );
        
        PRINT 'Table [V7].[ContractorCompliance] created successfully';
      END
      ELSE
      BEGIN
        PRINT 'Table [V7].[ContractorCompliance] already exists';
      END
    `;

    await sql.query(createTableQuery);
    console.log('✅ Table creation script executed\n');

    // Show table structure
    const columnsQuery = `
      SELECT 
        c.COLUMN_NAME,
        c.DATA_TYPE,
        c.CHARACTER_MAXIMUM_LENGTH,
        c.IS_NULLABLE,
        c.COLUMN_DEFAULT
      FROM INFORMATION_SCHEMA.COLUMNS c
      WHERE c.TABLE_SCHEMA = 'V7' AND c.TABLE_NAME = 'ContractorCompliance'
      ORDER BY c.ORDINAL_POSITION
    `;

    const columns = await sql.query(columnsQuery);
    console.log('📋 Table Structure for [V7].[ContractorCompliance]:');
    columns.recordset.forEach(col => {
      const length = col.CHARACTER_MAXIMUM_LENGTH ? `(${col.CHARACTER_MAXIMUM_LENGTH === -1 ? 'MAX' : col.CHARACTER_MAXIMUM_LENGTH})` : '';
      const nullable = col.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL';
      console.log(`   - ${col.COLUMN_NAME}: ${col.DATA_TYPE}${length} ${nullable}`);
    });

    // Add sample data
    console.log('\n🔧 Adding sample compliance records...');
    
    const sampleData = [
      { contractorId: 1, userAreaId: 2, type: 'Insurance Certificate', status: 'Valid', expiry: '2025-12-31' },
      { contractorId: 2, userAreaId: 2, type: 'Safety Training', status: 'Expired', expiry: '2024-06-30' },
      { contractorId: 3, userAreaId: 5, type: 'Background Check', status: 'Pending', expiry: null }
    ];

    for (const data of sampleData) {
      try {
        const request = new sql.Request();
        await request
          .input('ContractorID', sql.Int, data.contractorId)
          .input('UserAreaID', sql.Int, data.userAreaId)
          .input('ComplianceType', sql.NVarChar, data.type)
          .input('ComplianceStatus', sql.NVarChar, data.status)
          .input('ExpiryDate', sql.DateTime, data.expiry)
          .input('CreatedByUserID', sql.Int, 1)
          .query(`
            INSERT INTO [V7].[ContractorCompliance] 
            (ContractorID, UserAreaID, ComplianceType, ComplianceStatus, ExpiryDate, CreatedByUserID)
            VALUES (@ContractorID, @UserAreaID, @ComplianceType, @ComplianceStatus, @ExpiryDate, @CreatedByUserID)
          `);
        console.log(`   ✅ Added ${data.type} record`);
      } catch (err) {
        console.log(`   ⚠️  Error adding ${data.type}: ${err.message}`);
      }
    }

    // Show the data
    const dataQuery = `
      SELECT TOP 10 
        cc.ComplianceID,
        cc.ContractorID,
        ua.Title as Organization,
        cc.ComplianceType,
        cc.ComplianceStatus,
        cc.ExpiryDate
      FROM [V7].[ContractorCompliance] cc
      JOIN [V7].[UserArea] ua ON cc.UserAreaID = ua.UserAreaID
      ORDER BY cc.ComplianceID DESC
    `;

    const results = await sql.query(dataQuery);
    console.log('\n📊 Sample Data in ContractorCompliance:');
    results.recordset.forEach(row => {
      const expiry = row.ExpiryDate ? new Date(row.ExpiryDate).toISOString().split('T')[0] : 'N/A';
      console.log(`   - ${row.Organization}: ${row.ComplianceType} (${row.ComplianceStatus}, Expires: ${expiry})`);
    });

    await sql.close();
  } catch (err) {
    console.error('Database error:', err);
  }
}

createTable();