import sql from 'mssql';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'YOUR_DATABASE_SERVER.database.windows.net',
  database: process.env.DB_NAME || 'V7-Dev',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    requestTimeout: 300000
  }
};

async function executeFix() {
  let pool;
  
  try {
    console.log('🔄 Connecting to Azure SQL Database...');
    pool = await sql.connect(config);
    console.log('✅ Connected successfully!\n');
    
    console.log('📄 Executing SSOW tables fix...');
    
    // Read the SQL file
    const sqlContent = fs.readFileSync('fix-missing-ssow-tables.sql', 'utf8');
    
    // Split by GO statements
    const batches = sqlContent.split(/\nGO\r?\n|\nGO$/gim);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i].trim();
      if (!batch) continue;
      
      try {
        await pool.request().query(batch);
        successCount++;
        
        // Log table creation
        if (batch.includes('CREATE TABLE')) {
          const tableMatch = batch.match(/CREATE TABLE \[T100\]\.\[(\w+)\]/);
          if (tableMatch) {
            console.log(`   ✅ Created table: T100.${tableMatch[1]}`);
          }
        }
      } catch (err) {
        errorCount++;
        console.error(`   ❌ Error in batch ${i + 1}: ${err.message}`);
      }
    }
    
    console.log(`\n📊 Execution Summary:`);
    console.log(`   Successful batches: ${successCount}`);
    console.log(`   Failed batches: ${errorCount}`);
    
    // Verify the tables were created
    console.log('\n🔍 Verifying SSOW tables...');
    
    const verifyQuery = `
      SELECT TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' 
      AND TABLE_TYPE = 'BASE TABLE'
      AND TABLE_NAME IN ('MethodStatement', 'MethodStatementStep', 'SafeWorkingProcedure', 'SafeWorkingProcedureStep')
      ORDER BY TABLE_NAME
    `;
    
    const result = await pool.request().query(verifyQuery);
    
    console.log('\n✅ SSOW Tables Created:');
    result.recordset.forEach(row => {
      console.log(`   - T100.${row.TABLE_NAME}`);
    });
    
    if (result.recordset.length === 4) {
      console.log('\n✅ All missing SSOW tables have been created successfully!');
    } else {
      console.log(`\n⚠️  Only ${result.recordset.length} of 4 tables were created.`);
    }
    
    // Final count of all SSOW tables
    const finalCountQuery = `
      SELECT COUNT(*) as TotalCount
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' 
      AND TABLE_TYPE = 'BASE TABLE'
      AND (TABLE_NAME LIKE '%Method%' OR TABLE_NAME LIKE '%Safe%' OR TABLE_NAME LIKE '%SSOW%' OR TABLE_NAME LIKE '%Work%')
    `;
    
    const finalCount = await pool.request().query(finalCountQuery);
    console.log(`\n📋 Total Safe Systems of Work tables in T100 schema: ${finalCount.recordset[0].TotalCount}`);
    
  } catch (err) {
    console.error('❌ Execution failed:', err.message);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// Run the fix
console.log('🏁 SSOW Tables Fix Tool');
console.log('======================\n');
executeFix();