// Set a few recent items to "Under Review" to demonstrate NEW badges
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

async function createNewBadges() {
  let pool;
  try {
    console.log('🎯 Setting up NEW badge demonstration...');
    
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('✅ Connected to database');

    // Get 5 recent items to convert to NEW badge items
    const selectQuery = `
      SELECT TOP 5 LegalRegisterID, Name 
      FROM [dbo].[LegalRegister] 
      ORDER BY LatestUpdate DESC
    `;
    
    const result = await pool.request().query(selectQuery);
    const items = result.recordset;
    
    console.log(`📋 Found ${items.length} items to update for NEW badge demo`);
    
    // Set these items to show NEW badges
    for (const item of items) {
      try {
        // Set recent date (within last 3 days), Under Review status, and clear LastViewedDate
        const recentDate = new Date();
        recentDate.setDate(recentDate.sysdatetimeoffset() - Math.floor(Math.random() * 3)); // 0-2 days ago
        
        const updateQuery = `
          UPDATE [dbo].[LegalRegister] 
          SET ComplianceStatus = 'Under Review',
              LatestUpdate = @recentDate,
              LastViewedDate = NULL
          WHERE LegalRegisterID = @id
        `;
        
        const request = pool.request();
        request.input('recentDate', sql.DateTime, recentDate);
        request.input('id', sql.Int, item.LegalRegisterID);
        
        await request.query(updateQuery);
        console.log(`✅ ${item.Name.substring(0, 50)}... - Set to show NEW badge`);
        
      } catch (error) {
        console.log(`❌ Failed to update ${item.Name}: ${error.message}`);
      }
    }
    
    console.log(`\n🎉 NEW badge setup complete!`);
    console.log(`📋 Updated ${items.length} items to show NEW badges`);
    console.log(`🔄 Refresh your browser to see the NEW badges!`);
    console.log(`👆 Click on any item with a NEW badge to make it disappear`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

createNewBadges().catch(console.error);