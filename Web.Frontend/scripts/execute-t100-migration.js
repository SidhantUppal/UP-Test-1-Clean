import sql from 'mssql';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'YOUR_DATABASE_SERVER.database.windows.net',
  database: process.env.DB_NAME || 'V7-Dev',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    requestTimeout: 300000 // 5 minutes timeout for large scripts
  }
};

async function executeSqlFile(pool, filePath, scriptName) {
  try {
    console.log(`\n📄 Executing ${scriptName}...`);
    
    // Read the SQL file
    const sqlContent = fs.readFileSync(filePath, 'utf8');
    
    // Split by GO statements
    const batches = sqlContent.split(/\nGO\r?\n|\nGO$/gim);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i].trim();
      if (!batch) continue;
      
      // Skip :r commands (SQLCMD specific)
      if (batch.includes(':r ')) {
        console.log(`   ⚠️  Skipping SQLCMD command: ${batch}`);
        continue;
      }
      
      try {
        await pool.request().query(batch);
        successCount++;
      } catch (err) {
        errorCount++;
        console.error(`   ❌ Error in batch ${i + 1}: ${err.message}`);
        // Continue with next batch instead of stopping
      }
    }
    
    console.log(`   ✅ Completed: ${successCount} batches successful, ${errorCount} errors`);
    return { success: successCount, errors: errorCount };
    
  } catch (err) {
    console.error(`   ❌ Failed to execute ${scriptName}: ${err.message}`);
    return { success: 0, errors: 1 };
  }
}

async function runMigration() {
  let pool;
  
  try {
    console.log('🔄 Connecting to Azure SQL Database V7-Dev...');
    console.log(`   Server: ${config.server}`);
    console.log(`   Database: ${config.database}`);
    console.log(`   User: ${config.user}`);
    
    pool = await sql.connect(config);
    console.log('✅ Connected successfully!\n');
    
    const migrationPath = path.join(__dirname, 'migration', 't100-schema');
    
    // Scripts to execute in order
    const scripts = [
      { file: '01-create-t100-schema.sql', name: 'Create T100 Schema' },
      { file: '02-training-elearning-tables.sql', name: 'Training & E-Learning Tables' },
      { file: '03-risk-assessment-tables.sql', name: 'Risk Assessment Tables' },
      { file: '04-safe-systems-work-tables.sql', name: 'Safe Systems of Work Tables' },
      { file: '06-policies-tables.sql', name: 'Policies Tables' },
      { file: '05-reference-data.sql', name: 'Reference Data' }
    ];
    
    console.log('🚀 Starting T100 Schema Migration...');
    console.log('=====================================\n');
    
    let totalSuccess = 0;
    let totalErrors = 0;
    
    // Execute each script
    for (const script of scripts) {
      const filePath = path.join(migrationPath, script.file);
      
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Script not found: ${script.file}`);
        continue;
      }
      
      const result = await executeSqlFile(pool, filePath, script.name);
      totalSuccess += result.success;
      totalErrors += result.errors;
    }
    
    console.log('\n=====================================');
    console.log('📊 Migration Summary:');
    console.log(`   Total batches executed: ${totalSuccess}`);
    console.log(`   Total errors: ${totalErrors}`);
    
    // Verify migration
    console.log('\n🔍 Verifying migration...');
    
    const verifyQuery = `
      SELECT 
        'T100 Schema Tables' as Category,
        COUNT(*) as TableCount
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' AND TABLE_TYPE = 'BASE TABLE'
      
      UNION ALL
      
      SELECT 
        'Training Tables' as Category,
        COUNT(*) as TableCount
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' 
      AND TABLE_NAME LIKE '%Course%'
      
      UNION ALL
      
      SELECT 
        'Risk Assessment Tables' as Category,
        COUNT(*) as TableCount
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' 
      AND (TABLE_NAME LIKE '%Risk%' OR TABLE_NAME LIKE '%Hazard%' OR TABLE_NAME LIKE '%Control%')
      
      UNION ALL
      
      SELECT 
        'Safe Systems Tables' as Category,
        COUNT(*) as TableCount
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' 
      AND (TABLE_NAME LIKE '%Method%' OR TABLE_NAME LIKE '%Safe%' OR TABLE_NAME LIKE '%SSOW%' OR TABLE_NAME LIKE '%Work%')
      
      UNION ALL
      
      SELECT 
        'Policy Tables' as Category,
        COUNT(*) as TableCount
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' 
      AND TABLE_NAME LIKE '%Policy%'
    `;
    
    const result = await pool.request().query(verifyQuery);
    
    console.log('\n📋 Tables Created:');
    result.recordset.forEach(row => {
      console.log(`   ${row.Category}: ${row.TableCount} tables`);
    });
    
    if (totalErrors === 0) {
      console.log('\n✅ Migration completed successfully!');
    } else {
      console.log('\n⚠️  Migration completed with errors. Please review the output above.');
    }
    
  } catch (err) {
    console.error('\n❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// Check if we have database credentials
if (!process.env.DB_PASSWORD) {
  console.error('❌ Error: DB_PASSWORD not found in environment variables');
  console.error('   Please ensure .env file exists with database credentials');
  process.exit(1);
}

// Run the migration
console.log('🏁 T100 Schema Migration Tool');
console.log('=============================\n');
runMigration();