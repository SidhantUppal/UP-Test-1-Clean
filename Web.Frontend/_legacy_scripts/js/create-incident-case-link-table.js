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

async function createIncidentCaseLinkTable() {
  try {
    const pool = await sql.connect(config);
    
    console.log('🔍 Checking if IncidentCaseLink table already exists...\n');
    
    // Check if table already exists
    const checkTableQuery = `
      SELECT COUNT(*) as TableExists
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'V7' 
      AND TABLE_NAME = 'IncidentCaseLink'
    `;
    
    const checkResult = await pool.request().query(checkTableQuery);
    const tableExists = checkResult.recordset[0].TableExists > 0;
    
    if (tableExists) {
      console.log('✅ IncidentCaseLink table already exists.');
      
      // Show existing table structure
      const structureQuery = `
        SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'IncidentCaseLink'
        ORDER BY ORDINAL_POSITION
      `;
      
      const structureResult = await pool.request().query(structureQuery);
      console.log('Current table structure:');
      structureResult.recordset.forEach(col => {
        console.log(`  ${col.COLUMN_NAME} - ${col.DATA_TYPE}${col.CHARACTER_MAXIMUM_LENGTH ? '(' + col.CHARACTER_MAXIMUM_LENGTH + ')' : ''} ${col.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL'}`);
      });
      
    } else {
      console.log('📋 Creating IncidentCaseLink table following V7 conventions...\n');
      
      const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='IncidentCaseLink' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
        BEGIN
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
            
            -- Foreign Key Constraints
            CONSTRAINT [FK_IncidentCaseLink_SourceIncidentCase] FOREIGN KEY ([SourceIncidentCaseID]) 
              REFERENCES [V7].[IncidentCase]([IncidentCaseID]),
            CONSTRAINT [FK_IncidentCaseLink_UserArea] FOREIGN KEY ([UserAreaID]) 
              REFERENCES [V7].[UserArea]([UserAreaID]),
            CONSTRAINT [FK_IncidentCaseLink_CreatedBy] FOREIGN KEY ([CreatedByUserID]) 
              REFERENCES [V7].[User]([UserID]),
            CONSTRAINT [FK_IncidentCaseLink_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) 
              REFERENCES [V7].[User]([UserID]),
            CONSTRAINT [FK_IncidentCaseLink_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) 
              REFERENCES [V7].[User]([UserID])
          )
          
          PRINT 'Created table [V7].[IncidentCaseLink]'
        END
      `;
      
      await pool.request().query(createTableQuery);
      
      // Create performance indexes
      console.log('📋 Creating performance indexes...\n');
      
      const indexQueries = [
        `
        CREATE NONCLUSTERED INDEX [IX_IncidentCaseLink_SourceIncident] 
          ON [V7].[IncidentCaseLink]([SourceIncidentCaseID])
          WHERE [ArchivedDate] IS NULL
        `,
        `
        CREATE NONCLUSTERED INDEX [IX_IncidentCaseLink_UserAreaID] 
          ON [V7].[IncidentCaseLink]([UserAreaID])
          WHERE [ArchivedDate] IS NULL
        `,
        `
        CREATE NONCLUSTERED INDEX [IX_IncidentCaseLink_LinkedRecord] 
          ON [V7].[IncidentCaseLink]([LinkedRecordType], [LinkedRecordID])
          WHERE [ArchivedDate] IS NULL
        `
      ];
      
      for (const indexQuery of indexQueries) {
        try {
          await pool.request().query(indexQuery);
          console.log('✅ Created index successfully');
        } catch (indexError) {
          console.log(`⚠️  Index creation warning: ${indexError.message}`);
        }
      }
      
      console.log('\n✅ IncidentCaseLink table created successfully!');
    }
    
    // Show final table structure
    const finalStructureQuery = `
      SELECT 
        c.COLUMN_NAME,
        c.DATA_TYPE,
        c.IS_NULLABLE,
        c.CHARACTER_MAXIMUM_LENGTH,
        CASE 
          WHEN pk.COLUMN_NAME IS NOT NULL THEN 'PK'
          WHEN fk.COLUMN_NAME IS NOT NULL THEN 'FK'
          ELSE ''
        END as KEY_TYPE
      FROM INFORMATION_SCHEMA.COLUMNS c
      LEFT JOIN (
        SELECT ku.COLUMN_NAME
        FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
        INNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
          ON tc.CONSTRAINT_NAME = ku.CONSTRAINT_NAME
        WHERE tc.TABLE_SCHEMA = 'V7' AND tc.TABLE_NAME = 'IncidentCaseLink' AND tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
      ) pk ON c.COLUMN_NAME = pk.COLUMN_NAME
      LEFT JOIN (
        SELECT ku.COLUMN_NAME
        FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
        INNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
          ON tc.CONSTRAINT_NAME = ku.CONSTRAINT_NAME
        WHERE tc.TABLE_SCHEMA = 'V7' AND tc.TABLE_NAME = 'IncidentCaseLink' AND tc.CONSTRAINT_TYPE = 'FOREIGN KEY'
      ) fk ON c.COLUMN_NAME = fk.COLUMN_NAME
      WHERE c.TABLE_SCHEMA = 'V7' AND c.TABLE_NAME = 'IncidentCaseLink'
      ORDER BY c.ORDINAL_POSITION
    `;
    
    const finalResult = await pool.request().query(finalStructureQuery);
    
    console.log('\n📋 Final IncidentCaseLink table structure:');
    console.log('Column Name'.padEnd(25) + 'Data Type'.padEnd(20) + 'Nullable'.padEnd(10) + 'Key');
    console.log('-'.repeat(70));
    
    finalResult.recordset.forEach(column => {
      let dataType = column.DATA_TYPE;
      if (column.CHARACTER_MAXIMUM_LENGTH && column.CHARACTER_MAXIMUM_LENGTH !== -1) {
        dataType += `(${column.CHARACTER_MAXIMUM_LENGTH})`;
      } else if (column.CHARACTER_MAXIMUM_LENGTH === -1) {
        dataType += '(MAX)';
      }
      
      console.log(`${column.COLUMN_NAME.padEnd(25)}${dataType.padEnd(20)}${column.IS_NULLABLE.padEnd(10)}${column.KEY_TYPE}`);
    });
    
    await pool.close();
    console.log('\n🔌 Database connection closed.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

createIncidentCaseLinkTable();