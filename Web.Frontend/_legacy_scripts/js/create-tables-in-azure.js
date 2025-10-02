const sql = require('mssql');
require('dotenv').config();

const config = {
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: false,
        connectTimeout: 30000,
        requestTimeout: 30000
    }
};

async function createTablesInAzure() {
    let pool;
    try {
        console.log('Connecting to Azure V7-Dev database...');
        pool = await sql.connect(config);
        console.log('✅ Connected successfully\n');

        // 1. Create LegalRegister table
        console.log('Creating LegalRegister table...');
        try {
            await pool.request().query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LegalRegister' AND schema_id = SCHEMA_ID('dbo'))
                BEGIN
                    CREATE TABLE [dbo].[LegalRegister] (
                        [LegalRegisterID]     INT              IDENTITY(1,1) NOT NULL,
                        [Name]                NVARCHAR(500)    NOT NULL,
                        [Link]                NVARCHAR(1000)   NULL,
                        [LatestUpdate]        DATETIMEOFFSET (7)         NULL,
                        [RiskLevel]           NVARCHAR(50)     NULL,
                        [ComplianceStatus]    NVARCHAR(50)     NULL,
                        [Notes]               NVARCHAR(MAX)    NULL,
                        [IndustryName]        NVARCHAR(200)    NULL,
                        [LegislationType]     NVARCHAR(100)    NULL,
                        [CreatedDate]         DATETIMEOFFSET (7)         NULL,
                        [ModifiedDate]        DATETIMEOFFSET (7)         NULL,
                        [CreatedBy]           NVARCHAR(100)    NULL,
                        [ModifiedBy]          NVARCHAR(100)    NULL,
                        CONSTRAINT [PK_LegalRegister] PRIMARY KEY CLUSTERED ([LegalRegisterID] ASC)
                    );
                END
            `);
            console.log('✅ LegalRegister table created successfully');

            // Add indexes for LegalRegister
            await pool.request().query(`
                IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_LegalRegister_Name')
                    CREATE NONCLUSTERED INDEX [IX_LegalRegister_Name] ON [dbo].[LegalRegister] ([Name] ASC);
                
                IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_LegalRegister_IndustryName')
                    CREATE NONCLUSTERED INDEX [IX_LegalRegister_IndustryName] ON [dbo].[LegalRegister] ([IndustryName] ASC);
                
                IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_LegalRegister_ComplianceStatus')
                    CREATE NONCLUSTERED INDEX [IX_LegalRegister_ComplianceStatus] ON [dbo].[LegalRegister] ([ComplianceStatus] ASC);
            `);
            console.log('✅ LegalRegister indexes created successfully');
        } catch (err) {
            console.error('❌ Error creating LegalRegister table:', err.message);
        }

        // 2. Create LegalRegisterAttachments table
        console.log('\nCreating LegalRegisterAttachments table...');
        try {
            await pool.request().query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LegalRegisterAttachments' AND schema_id = SCHEMA_ID('dbo'))
                BEGIN
                    CREATE TABLE [dbo].[LegalRegisterAttachments] (
                        [AttachmentID]        INT              IDENTITY(1,1) NOT NULL,
                        [LegalRegisterID]     INT              NOT NULL,
                        [FileName]            NVARCHAR(500)    NOT NULL,
                        [FileType]            NVARCHAR(100)    NULL,
                        [FileSize]            BIGINT           NULL,
                        [FileData]            VARBINARY(MAX)   NULL,
                        [FileUrl]             NVARCHAR(1000)   NULL,
                        [UploadDate]          DATETIMEOFFSET (7)         NULL,
                        [UploadedBy]          NVARCHAR(100)    NULL,
                        CONSTRAINT [PK_LegalRegisterAttachments] PRIMARY KEY CLUSTERED ([AttachmentID] ASC)
                    );
                END
            `);
            console.log('✅ LegalRegisterAttachments table created successfully');

            // Add foreign key
            await pool.request().query(`
                IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_LegalRegisterAttachments_LegalRegister')
                BEGIN
                    ALTER TABLE [dbo].[LegalRegisterAttachments]
                    ADD CONSTRAINT [FK_LegalRegisterAttachments_LegalRegister] 
                    FOREIGN KEY ([LegalRegisterID]) REFERENCES [dbo].[LegalRegister]([LegalRegisterID])
                    ON DELETE CASCADE;
                END
            `);
            console.log('✅ Foreign key constraint added successfully');

            // Add indexes
            await pool.request().query(`
                IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_LegalRegisterAttachments_LegalRegisterID')
                    CREATE NONCLUSTERED INDEX [IX_LegalRegisterAttachments_LegalRegisterID] 
                    ON [dbo].[LegalRegisterAttachments] ([LegalRegisterID] ASC);
                
                IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_LegalRegisterAttachments_UploadDate')
                    CREATE NONCLUSTERED INDEX [IX_LegalRegisterAttachments_UploadDate] 
                    ON [dbo].[LegalRegisterAttachments] ([UploadDate] DESC);
            `);
            console.log('✅ LegalRegisterAttachments indexes created successfully');
        } catch (err) {
            console.error('❌ Error creating LegalRegisterAttachments table:', err.message);
        }

        // 3. Create UserNavigationPreferences table
        console.log('\nCreating UserNavigationPreferences table...');
        try {
            await pool.request().query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'UserNavigationPreferences' AND schema_id = SCHEMA_ID('dbo'))
                BEGIN
                    CREATE TABLE [dbo].[UserNavigationPreferences] (
                        [UserNavigationPreferencesID]  INT              IDENTITY(1,1) NOT NULL,
                        [UserID]                       INT              NOT NULL,
                        [NavigationPreferences]        NVARCHAR(MAX)    NOT NULL,
                        [CreatedDate]                  DATETIMEOFFSET (7)         NULL,
                        [UpdatedDate]                  DATETIMEOFFSET (7)         NULL,
                        CONSTRAINT [PK_UserNavigationPreferences] PRIMARY KEY CLUSTERED ([UserNavigationPreferencesID] ASC)
                    );
                END
            `);
            console.log('✅ UserNavigationPreferences table created successfully');

            // Add indexes
            await pool.request().query(`
                IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_UserNavigationPreferences_UserID_Unique')
                    CREATE UNIQUE NONCLUSTERED INDEX [IX_UserNavigationPreferences_UserID_Unique] 
                    ON [dbo].[UserNavigationPreferences] ([UserID] ASC);
                
                IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_UserNavigationPreferences_UpdatedDate')
                    CREATE NONCLUSTERED INDEX [IX_UserNavigationPreferences_UpdatedDate] 
                    ON [dbo].[UserNavigationPreferences] ([UpdatedDate] DESC);
            `);
            console.log('✅ UserNavigationPreferences indexes created successfully');
        } catch (err) {
            console.error('❌ Error creating UserNavigationPreferences table:', err.message);
        }

        // Verify all tables were created
        console.log('\n📊 Verifying tables...');
        const tables = ['LegalRegister', 'LegalRegisterAttachments', 'UserNavigationPreferences'];
        
        for (const tableName of tables) {
            const result = await pool.request()
                .query(`
                    SELECT 
                        t.name AS TableName,
                        p.rows AS RowCount
                    FROM sys.tables t
                    INNER JOIN sys.partitions p ON t.object_id = p.object_id
                    WHERE p.index_id <= 1 AND t.name = '${tableName}'
                `);
            
            if (result.recordset.length > 0) {
                console.log(`✅ ${tableName} exists (${result.recordset[0].RowCount} rows)`);
            } else {
                console.log(`❌ ${tableName} NOT FOUND`);
            }
        }

        console.log('\n✅ All tables have been created in Azure V7-Dev database!');

    } catch (err) {
        console.error('❌ Connection error:', err.message);
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Run the creation script
createTablesInAzure();