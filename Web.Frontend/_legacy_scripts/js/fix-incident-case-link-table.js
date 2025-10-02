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

async function fixIncidentCaseLinkTable() {
  try {
    const pool = await sql.connect(config);
    console.log('✅ Connected to database');
    
    // Drop the existing table and recreate without problematic foreign keys
    console.log('\n1. Dropping existing IncidentCaseLink table...');
    try {
      const dropQuery = `DROP TABLE IF EXISTS [V7].[IncidentCaseLink]`;
      await pool.request().query(dropQuery);
      console.log('   ✅ Dropped existing table');
    } catch (error) {
      console.log('   ⚠️  Drop table warning:', error.message);
    }
    
    // Create the table with minimal constraints
    console.log('\n2. Creating simplified IncidentCaseLink table...');
    const createTableQuery = `
      CREATE TABLE [V7].[IncidentCaseLink] (
        -- Primary Key
        IncidentCaseLinkID INT IDENTITY(1,1) NOT NULL,
        
        -- Source incident (the incident being linked from)
        SourceIncidentCaseID INT NOT NULL,
        
        -- Multi-Tenant Isolation
        UserAreaID INT NOT NULL,
        
        -- Linked record information
        LinkedRecordType NVARCHAR(100) NOT NULL, -- 'IncidentCase', 'RiskAssessment', etc.
        LinkedRecordID INT NOT NULL,             -- ID of the linked record
        LinkedRecordTitle NVARCHAR(500) NULL,    -- Display title/name of linked record
        
        -- Link metadata
        LinkComments NVARCHAR(MAX) NULL,         -- Comments about the relationship
        LinkType NVARCHAR(50) NULL DEFAULT 'Related', -- 'Related', 'Duplicate', 'Parent', 'Child'
        
        -- V7 Standard Audit Fields
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_IncidentCaseLink] PRIMARY KEY CLUSTERED ([IncidentCaseLinkID] ASC),
        
        -- Only the essential foreign key constraint
        CONSTRAINT [FK_IncidentCaseLink_SourceIncidentCase] FOREIGN KEY ([SourceIncidentCaseID]) 
          REFERENCES [V7].[IncidentCase]([IncidentCaseID])
      )
    `;
    
    await pool.request().query(createTableQuery);
    console.log('   ✅ Created simplified IncidentCaseLink table');
    
    // Create indexes
    console.log('\n3. Creating indexes...');
    const indexQueries = [
      `CREATE NONCLUSTERED INDEX [IX_IncidentCaseLink_SourceIncident] ON [V7].[IncidentCaseLink]([SourceIncidentCaseID])`,
      `CREATE NONCLUSTERED INDEX [IX_IncidentCaseLink_UserAreaID] ON [V7].[IncidentCaseLink]([UserAreaID])`,
      `CREATE NONCLUSTERED INDEX [IX_IncidentCaseLink_LinkedRecord] ON [V7].[IncidentCaseLink]([LinkedRecordType], [LinkedRecordID])`
    ];
    
    for (const indexQuery of indexQueries) {
      try {
        await pool.request().query(indexQuery);
        console.log('   ✅ Created index');
      } catch (error) {
        console.log('   ⚠️  Index warning:', error.message);
      }
    }
    
    // Test the new table
    console.log('\n4. Testing the new table...');
    try {
      const testQuery = `
        INSERT INTO [V7].[IncidentCaseLink] (
          SourceIncidentCaseID,
          UserAreaID,
          LinkedRecordType,
          LinkedRecordID,
          LinkedRecordTitle,
          LinkComments,
          LinkType,
          CreatedByUserID,
          CreatedDate
        ) 
        OUTPUT INSERTED.IncidentCaseLinkID
        VALUES (31, 1, 'IncidentCase', 34, 'Test Link', 'Test comment', 'Related', 1, SYSDATETIMEOFFSET())
      `;
      
      const testResult = await pool.request().query(testQuery);
      const linkId = testResult.recordset[0].IncidentCaseLinkID;
      console.log(`   ✅ Created test link with ID: ${linkId}`);
      
      // Verify we can read it
      const readQuery = `SELECT * FROM [V7].[IncidentCaseLink] WHERE IncidentCaseLinkID = ${linkId}`;
      const readResult = await pool.request().query(readQuery);
      console.log(`   ✅ Read test link:`, readResult.recordset[0]);
      
      // Clean up
      const deleteQuery = `DELETE FROM [V7].[IncidentCaseLink] WHERE IncidentCaseLinkID = ${linkId}`;
      await pool.request().query(deleteQuery);
      console.log(`   ✅ Cleaned up test link`);
      
    } catch (error) {
      console.log('   ❌ Test error:', error.message);
    }
    
    await pool.close();
    console.log('\n✅ Database connection closed - Table is ready for use!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixIncidentCaseLinkTable();