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
    trustServerCertificate: false
  }
};

async function executeFix() {
  let pool;
  
  try {
    console.log('🔄 Connecting to Azure SQL Database...');
    pool = await sql.connect(config);
    console.log('✅ Connected!\n');
    
    // Read and execute the SQL file
    const sqlContent = fs.readFileSync('fix-method-statement.sql', 'utf8');
    const batches = sqlContent.split(/\nGO\r?\n|\nGO$/gim);
    
    for (const batch of batches) {
      if (!batch.trim()) continue;
      
      try {
        await pool.request().query(batch);
        if (batch.includes('CREATE TABLE')) {
          const match = batch.match(/CREATE TABLE \[T100\]\.\[(\w+)\]/);
          if (match) console.log(`✅ Created: T100.${match[1]}`);
        }
      } catch (err) {
        console.error(`❌ Error: ${err.message}`);
      }
    }
    
    // Verify
    const verify = await pool.request().query(`
      SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' AND TABLE_NAME LIKE 'MethodStatement%'
    `);
    
    console.log('\n📋 Method Statement Tables:');
    verify.recordset.forEach(r => console.log(`   - T100.${r.TABLE_NAME}`));
    
  } catch (err) {
    console.error('❌ Failed:', err.message);
  } finally {
    if (pool) await pool.close();
  }
}

executeFix();