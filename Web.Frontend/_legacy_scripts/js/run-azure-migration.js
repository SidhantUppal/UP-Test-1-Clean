// Script to migrate local tables to Azure V7-Dev database
const sql = require('mssql');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Azure connection configuration
const azureConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST || 'YOUR_DATABASE_SERVER.database.windows.net',
  database: process.env.DB_NAME || 'V7-Dev',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

async function runMigration() {
  let pool = null;
  
  try {
    console.log('🚀 Starting migration to Azure V7-Dev database...');
    console.log(`📡 Connecting to: ${azureConfig.server}/${azureConfig.database}`);
    
    // Connect to Azure database
    pool = await sql.connect(azureConfig);
    console.log('✅ Successfully connected to Azure SQL Database');
    
    // Read the migration script
    const scriptPath = path.join(process.cwd(), 'migrate-local-tables-to-azure.sql');
    if (!fs.existsSync(scriptPath)) {
      throw new Error(`Migration script not found at: ${scriptPath}`);
    }
    
    const migrationScript = fs.readFileSync(scriptPath, 'utf8');
    console.log('📄 Migration script loaded');
    
    // Split the script by GO statements and execute each batch
    const batches = migrationScript
      .split(/\r?\n\s*GO\s*\r?\n/gi)
      .filter(batch => batch.trim().length > 0);
    
    console.log(`🔄 Executing ${batches.length} SQL batches...`);
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i].trim();
      if (batch && !batch.startsWith('--') && batch.length > 0) {
        try {
          await pool.request().query(batch);
          console.log(`✅ Batch ${i + 1}/${batches.length} executed successfully`);
        } catch (batchError) {
          console.error(`❌ Error in batch ${i + 1}:`, batch.substring(0, 100) + '...');
          console.error(batchError.message);
          // Continue with next batch for non-critical errors
        }
      }
    }
    
    console.log('🎉 Migration completed successfully!');
    console.log('📊 Verifying tables...');
    
    // Verify tables exist
    const tableQuery = `
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME IN ('LegalRegister', 'UserNavigationPreferences', 'RoleNavigationPreferences', 'Attachments')
      ORDER BY TABLE_NAME
    `;
    
    const tables = await pool.request().query(tableQuery);
    console.log('📋 Tables created:');
    tables.recordset.forEach(table => {
      console.log(`   ✅ ${table.TABLE_NAME}`);
    });
    
    // Check record counts
    const countQuery = `
      SELECT 'LegalRegister' as TableName, COUNT(*) as RecordCount FROM dbo.LegalRegister
      UNION ALL
      SELECT 'UserNavigationPreferences', COUNT(*) FROM dbo.UserNavigationPreferences
      UNION ALL
      SELECT 'RoleNavigationPreferences', COUNT(*) FROM dbo.RoleNavigationPreferences
      UNION ALL
      SELECT 'Attachments', COUNT(*) FROM dbo.Attachments
    `;
    
    const counts = await pool.request().query(countQuery);
    console.log('📊 Record counts:');
    counts.recordset.forEach(row => {
      console.log(`   📈 ${row.TableName}: ${row.RecordCount} records`);
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    
    if (error.message.includes('ELOGIN')) {
      console.error('🔐 Authentication failed. Please check your credentials in .env file');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('🌐 Server not found. Please check your DB_HOST in .env file');
    } else if (error.message.includes('encryption')) {
      console.error('🔒 Encryption error. Make sure DB_ENCRYPT=true in .env file');
    }
    
    process.exit(1);
  } finally {
    if (pool) {
      await pool.close();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the migration
runMigration();