// Add LastViewedDate column to LegalRegister table for NEW badge functionality
import sql from 'mssql';

const dbConfig = {
  server: 'YOUR_DATABASE_SERVER.database.windows.net',
  database: 'V7-Dev',
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true,
    connectTimeout: 30000,
    requestTimeout: 30000
  }
};

async function addLastViewedDateColumn() {
  let pool;
  try {
    console.log('🎯 Adding LastViewedDate column for NEW badge functionality...');
    
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('✅ Connected to database');

    // Check if column already exists
    const checkQuery = `
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'LegalRegister' 
      AND TABLE_SCHEMA = 'dbo' 
      AND COLUMN_NAME = 'LastViewedDate'
    `;
    
    const checkResult = await pool.request().query(checkQuery);
    
    if (checkResult.recordset.length > 0) {
      console.log('⚠️  LastViewedDate column already exists');
      return;
    }

    // Add the column
    const addColumnQuery = `
      ALTER TABLE [dbo].[LegalRegister] 
      ADD LastViewedDate DATETIME2 NULL
    `;
    
    await pool.request().query(addColumnQuery);
    console.log('✅ LastViewedDate column added successfully');
    
    console.log(`
🎉 NEW badge functionality is now ready!

The NEW badge will show when:
✓ LatestUpdate is within 7 days
✓ ComplianceStatus = 'Under Review' 
✓ LastViewedDate is NULL or before LatestUpdate

The badge disappears when users interact with items.
    `);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

addLastViewedDateColumn().catch(console.error);