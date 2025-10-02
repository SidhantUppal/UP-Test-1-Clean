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

async function addResponsiblePersonColumn() {
  let pool;
  
  try {
    console.log('Connecting to V7-Dev Azure database...');
    pool = await sql.connect(dbConfig);
    
    // Check if column already exists
    console.log('Checking existing columns...');
    const columnCheck = await pool.request().query(`
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'LegalRegister' 
      AND TABLE_SCHEMA = 'dbo' 
      AND COLUMN_NAME = 'ResponsiblePersonId'
    `);
    
    const existingColumns = columnCheck.recordset.map(row => row.COLUMN_NAME);
    console.log('Existing ResponsiblePersonId column:', existingColumns);
    
    // Add ResponsiblePersonId column if it doesn't exist
    if (!existingColumns.includes('ResponsiblePersonId')) {
      console.log('Adding ResponsiblePersonId column...');
      await pool.request().query(`
        ALTER TABLE [dbo].[LegalRegister] 
        ADD ResponsiblePersonId INT NULL
      `);
      console.log('✅ ResponsiblePersonId column added successfully');
    } else {
      console.log('ResponsiblePersonId column already exists');
    }
    
    // Verify the column was added
    console.log('Verifying column was added...');
    const finalCheck = await pool.request().query(`
      SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'LegalRegister' 
      AND TABLE_SCHEMA = 'dbo' 
      AND COLUMN_NAME = 'ResponsiblePersonId'
    `);
    
    console.log('Final column check:');
    finalCheck.recordset.forEach(row => {
      console.log(`  - ${row.COLUMN_NAME}: ${row.DATA_TYPE}, Nullable: ${row.IS_NULLABLE}`);
    });
    
    // Verify Employee table exists for foreign key relationship
    console.log('\nVerifying Employee table exists...');
    const employeeTableCheck = await pool.request().query(`
      SELECT COUNT(*) as EmployeeCount
      FROM [V7].[Employee]
    `);
    
    console.log(`Found ${employeeTableCheck.recordset[0].EmployeeCount} employees in V7.Employee table`);
    
    console.log('\n🎉 Database column added successfully!');
    console.log('You can now assign responsible persons (employees) in the legal register.');
    
  } catch (error) {
    console.error('❌ Error adding column:', error.message);
    throw error;
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// Run the script
if (require.main === module) {
  addResponsiblePersonColumn()
    .then(() => {
      console.log('Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Script failed:', error);
      process.exit(1);
    });
}

module.exports = { addResponsiblePersonColumn };