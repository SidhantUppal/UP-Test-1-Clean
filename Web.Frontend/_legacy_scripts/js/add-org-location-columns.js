const sql = require('mssql');

// Database configuration for V7-Dev Azure
const dbConfig = {
  server: process.env.DB_SERVER || 'YOUR_DATABASE_SERVER.database.windows.net',
  database: process.env.DB_NAME || 'V7-Dev',
  user: process.env.DB_USER || 'YOUR_DB_USER',
  password: process.env.DB_PASSWORD || 'YOUR_DB_PASSWORD',
  options: {
    encrypt: true, // Required for Azure
    trustServerCertificate: false,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

async function addOrgLocationColumns() {
  let pool;
  
  try {
    console.log('Connecting to V7-Dev Azure database...');
    pool = await sql.connect(dbConfig);
    
    // Check if columns already exist
    console.log('Checking existing columns...');
    const columnCheck = await pool.request().query(`
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'LegalRegister' 
      AND TABLE_SCHEMA = 'dbo' 
      AND COLUMN_NAME IN ('OrgGroupID', 'LocationID')
    `);
    
    const existingColumns = columnCheck.recordset.map(row => row.COLUMN_NAME);
    console.log('Existing columns:', existingColumns);
    
    // Add OrgGroupID column if it doesn't exist
    if (!existingColumns.includes('OrgGroupID')) {
      console.log('Adding OrgGroupID column...');
      await pool.request().query(`
        ALTER TABLE [dbo].[LegalRegister] 
        ADD OrgGroupID INT NULL
      `);
      console.log('✅ OrgGroupID column added successfully');
    } else {
      console.log('OrgGroupID column already exists');
    }
    
    // Add LocationID column if it doesn't exist
    if (!existingColumns.includes('LocationID')) {
      console.log('Adding LocationID column...');
      await pool.request().query(`
        ALTER TABLE [dbo].[LegalRegister] 
        ADD LocationID INT NULL
      `);
      console.log('✅ LocationID column added successfully');
    } else {
      console.log('LocationID column already exists');
    }
    
    // Verify the columns were added
    console.log('Verifying columns were added...');
    const finalCheck = await pool.request().query(`
      SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'LegalRegister' 
      AND TABLE_SCHEMA = 'dbo' 
      AND COLUMN_NAME IN ('OrgGroupID', 'LocationID')
      ORDER BY COLUMN_NAME
    `);
    
    console.log('Final column check:');
    finalCheck.recordset.forEach(row => {
      console.log(`  - ${row.COLUMN_NAME}: ${row.DATA_TYPE}, Nullable: ${row.IS_NULLABLE}`);
    });
    
    console.log('\n🎉 Database columns added successfully!');
    console.log('You can now assign org groups and locations in the legal register.');
    
  } catch (error) {
    console.error('❌ Error adding columns:', error.message);
    throw error;
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// Run the script
if (require.main === module) {
  addOrgLocationColumns()
    .then(() => {
      console.log('Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Script failed:', error);
      process.exit(1);
    });
}

module.exports = { addOrgLocationColumns };