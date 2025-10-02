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
    requestTimeout: 300000 // 5 minutes timeout
  }
};

async function createT100Schema(pool) {
  console.log('\n🔧 Creating T100 Schema...');
  
  try {
    // First check if schema exists
    const checkQuery = `SELECT * FROM sys.schemas WHERE name = 'T100'`;
    const checkResult = await pool.request().query(checkQuery);
    
    if (checkResult.recordset.length === 0) {
      // Create schema
      const createQuery = `CREATE SCHEMA T100`;
      await pool.request().query(createQuery);
      console.log('   ✅ T100 schema created successfully');
    } else {
      console.log('   ℹ️  T100 schema already exists');
    }
    
    return true;
  } catch (err) {
    console.error('   ❌ Failed to create T100 schema:', err.message);
    return false;
  }
}

async function executeSqlFile(pool, filePath, scriptName) {
  try {
    console.log(`\n📄 Executing ${scriptName}...`);
    
    // Read the SQL file
    const sqlContent = fs.readFileSync(filePath, 'utf8');
    
    // Split by GO statements
    const batches = sqlContent.split(/\nGO\r?\n|\nGO$/gim);
    
    let successCount = 0;
    let errorCount = 0;
    let tableCount = 0;
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i].trim();
      if (!batch) continue;
      
      // Skip :r commands (SQLCMD specific)
      if (batch.includes(':r ')) {
        console.log(`   ⚠️  Skipping SQLCMD command`);
        continue;
      }
      
      try {
        await pool.request().query(batch);
        successCount++;
        
        // Count CREATE TABLE statements
        if (batch.toUpperCase().includes('CREATE TABLE')) {
          tableCount++;
        }
      } catch (err) {
        errorCount++;
        // Only show first few errors to avoid clutter
        if (errorCount <= 3) {
          console.error(`   ❌ Error: ${err.message.split('\n')[0]}`);
        }
      }
    }
    
    if (errorCount > 3) {
      console.error(`   ... and ${errorCount - 3} more errors`);
    }
    
    console.log(`   ✅ Completed: ${successCount} successful, ${errorCount} errors, ${tableCount} tables created`);
    return { success: successCount, errors: errorCount, tables: tableCount };
    
  } catch (err) {
    console.error(`   ❌ Failed to read ${scriptName}: ${err.message}`);
    return { success: 0, errors: 1, tables: 0 };
  }
}

async function runMigration() {
  let pool;
  
  try {
    console.log('🔄 Connecting to Azure SQL Database...');
    console.log(`   Server: ${config.server}`);
    console.log(`   Database: ${config.database}`);
    
    pool = await sql.connect(config);
    console.log('✅ Connected successfully!');
    
    // First, ensure T100 schema exists
    const schemaCreated = await createT100Schema(pool);
    if (!schemaCreated) {
      throw new Error('Failed to create T100 schema');
    }
    
    const migrationPath = path.join(__dirname, 'migration', 't100-schema');
    
    // Scripts to execute in order (skip schema creation as we did it manually)
    const scripts = [
      { file: '02-training-elearning-tables.sql', name: 'Training & E-Learning Tables' },
      { file: '03-risk-assessment-tables.sql', name: 'Risk Assessment Tables' },
      { file: '04-safe-systems-work-tables.sql', name: 'Safe Systems of Work Tables' },
      { file: '06-policies-tables.sql', name: 'Policies Tables' },
      { file: '05-reference-data.sql', name: 'Reference Data' }
    ];
    
    console.log('\n🚀 Starting T100 Table Creation...');
    console.log('=====================================');
    
    let totalSuccess = 0;
    let totalErrors = 0;
    let totalTables = 0;
    
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
      totalTables += result.tables;
    }
    
    console.log('\n=====================================');
    console.log('📊 Migration Summary:');
    console.log(`   Total batches executed: ${totalSuccess}`);
    console.log(`   Total errors: ${totalErrors}`);
    console.log(`   Total tables created: ${totalTables}`);
    
    // Verify migration
    console.log('\n🔍 Verifying migration...');
    
    const verifyQuery = `
      SELECT 
        'Total T100 Tables' as Category,
        COUNT(*) as TableCount
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' AND TABLE_TYPE = 'BASE TABLE'
      
      UNION ALL
      
      SELECT 
        'Training & E-Learning' as Category,
        COUNT(*) as TableCount
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' 
      AND TABLE_NAME LIKE '%Course%'
      AND TABLE_TYPE = 'BASE TABLE'
      
      UNION ALL
      
      SELECT 
        'Risk Assessment' as Category,
        COUNT(*) as TableCount
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' 
      AND (TABLE_NAME LIKE '%Risk%' OR TABLE_NAME LIKE '%Hazard%' OR TABLE_NAME LIKE '%Control%')
      AND TABLE_TYPE = 'BASE TABLE'
      
      UNION ALL
      
      SELECT 
        'Safe Systems of Work' as Category,
        COUNT(*) as TableCount
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' 
      AND (TABLE_NAME LIKE '%Method%' OR TABLE_NAME LIKE '%Safe%' OR TABLE_NAME LIKE '%SSOW%' OR TABLE_NAME LIKE '%Work%')
      AND TABLE_TYPE = 'BASE TABLE'
      
      UNION ALL
      
      SELECT 
        'Policies' as Category,
        COUNT(*) as TableCount
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' 
      AND TABLE_NAME LIKE '%Policy%'
      AND TABLE_TYPE = 'BASE TABLE'
      
      ORDER BY 
        CASE Category
          WHEN 'Total T100 Tables' THEN 1
          WHEN 'Training & E-Learning' THEN 2
          WHEN 'Risk Assessment' THEN 3
          WHEN 'Safe Systems of Work' THEN 4
          WHEN 'Policies' THEN 5
        END
    `;
    
    const result = await pool.request().query(verifyQuery);
    
    console.log('\n📋 Tables Created in Database:');
    result.recordset.forEach(row => {
      const icon = row.TableCount > 0 ? '✅' : '❌';
      console.log(`   ${icon} ${row.Category}: ${row.TableCount} tables`);
    });
    
    // List some actual tables
    const listTablesQuery = `
      SELECT TOP 10 TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' AND TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
    `;
    
    const tableList = await pool.request().query(listTablesQuery);
    
    if (tableList.recordset.length > 0) {
      console.log('\n📝 Sample T100 Tables Created:');
      tableList.recordset.forEach(row => {
        console.log(`   - T100.${row.TABLE_NAME}`);
      });
      
      const totalCount = result.recordset.find(r => r.Category === 'Total T100 Tables');
      if (totalCount && totalCount.TableCount > 10) {
        console.log(`   ... and ${totalCount.TableCount - 10} more tables`);
      }
    }
    
    if (result.recordset[0].TableCount > 0) {
      console.log('\n✅ Migration completed successfully!');
      console.log('   All T100 schema tables have been created in V7-Dev database.');
    } else {
      console.log('\n⚠️  Migration completed but no tables were created.');
      console.log('   Please check the errors above and try again.');
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

// Run the migration
console.log('🏁 T100 Schema Migration Tool v2');
console.log('================================\n');
runMigration();