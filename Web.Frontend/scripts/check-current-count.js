// Check current legislation count
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

async function checkCount() {
  let pool;
  try {
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    
    const countResult = await pool.request()
      .query('SELECT COUNT(*) as count FROM LegalRegister');
    const currentCount = countResult.recordset[0].count;
    
    console.log(`📊 Current records in database: ${currentCount}`);
    console.log(`🎯 Target: 1000+ comprehensive UK legislation items`);
    console.log(`📈 Progress: ${Math.round((currentCount / 1000) * 100)}%`);
    console.log(`📋 Remaining to reach 1000: ${Math.max(0, 1000 - currentCount)}`);
    
    // Show type breakdown
    const typeResult = await pool.request().query(`
      SELECT LegislationType, COUNT(*) as Count
      FROM LegalRegister 
      GROUP BY LegislationType
      ORDER BY Count DESC
    `);
    
    console.log('\n📋 Current type breakdown:');
    typeResult.recordset.forEach(item => {
      console.log(`  ${item.LegislationType}: ${item.Count} items`);
    });
    
    // Show industry breakdown
    const industryResult = await pool.request().query(`
      SELECT IndustryName, COUNT(*) as Count
      FROM LegalRegister 
      GROUP BY IndustryName
      ORDER BY Count DESC
    `);
    
    console.log('\n🏭 Current industry breakdown:');
    industryResult.recordset.forEach(item => {
      console.log(`  ${item.IndustryName}: ${item.Count} items`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

checkCount();