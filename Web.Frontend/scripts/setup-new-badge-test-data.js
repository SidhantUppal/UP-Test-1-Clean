// Setup test data for NEW badge functionality in Azure V7-Dev
import sql from 'mssql';

// Database configuration - using environment variables for Azure V7-Dev
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

async function setupTestData() {
  let pool;
  
  try {
    console.log('🎯 Setting up NEW badge test data in Azure V7-Dev...');
    
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('✅ Connected to Azure V7-Dev database');

    // Get a few legislation items to update for testing
    const getLegislationQuery = `
      SELECT TOP 5 LegalRegisterID, Name 
      FROM [dbo].[LegalRegister] 
      ORDER BY LegalRegisterID
    `;
    
    const result = await pool.request().query(getLegislationQuery);
    const legislationItems = result.recordset;
    
    if (legislationItems.length === 0) {
      console.log('❌ No legislation found in database');
      return;
    }
    
    console.log(`📝 Found ${legislationItems.length} legislation items to update for testing`);
    
    let successCount = 0;
    
    for (let i = 0; i < legislationItems.length; i++) {
      const item = legislationItems[i];
      
      try {
        const updateRequest = pool.request();
        updateRequest.input('id', sql.Int, item.LegalRegisterID);
        updateRequest.input('latestUpdate', sql.DateTime, new Date()); // Today's date
        updateRequest.input('complianceStatus', sql.NVarChar, 'Under Review');
        
        // Clear LastViewedDate to trigger NEW badge
        const updateQuery = `
          UPDATE [dbo].[LegalRegister]
          SET 
            LatestUpdate = @latestUpdate,
            ComplianceStatus = @complianceStatus,
            LastViewedDate = NULL
          WHERE LegalRegisterID = @id
        `;
        
        await updateRequest.query(updateQuery);
        
        console.log(`✅ Updated: ${item.Name}`);
        console.log(`   - LatestUpdate: Today (${new Date().toDateString()})`);
        console.log(`   - ComplianceStatus: Under Review`);
        console.log(`   - LastViewedDate: NULL (will show NEW badge)`);
        
        successCount++;
        
      } catch (err) {
        console.error(`❌ Failed to update ${item.Name}:`, err.message);
      }
    }
    
    console.log(`\n🎉 Successfully updated ${successCount} out of ${legislationItems.length} items`);
    
    // Verify the updates
    const verifyQuery = `
      SELECT 
        Name, 
        LatestUpdate, 
        ComplianceStatus, 
        LastViewedDate,
        CASE 
          WHEN DATEDIFF(day, LatestUpdate, sysdatetimeoffset()) <= 7 
               AND ComplianceStatus = 'Under Review' 
               AND LastViewedDate IS NULL
          THEN 'YES' 
          ELSE 'NO' 
        END as ShouldShowNewBadge
      FROM [dbo].[LegalRegister] 
      WHERE LegalRegisterID IN (${legislationItems.map(item => item.LegalRegisterID).join(',')})
      ORDER BY LegalRegisterID
    `;
    
    const verifyResult = await pool.request().query(verifyQuery);
    
    console.log('\n📋 Verification - Items that should show NEW badge:');
    verifyResult.recordset.forEach(item => {
      console.log(`- ${item.Name}`);
      console.log(`  Latest Update: ${new Date(item.LatestUpdate).toDateString()}`);
      console.log(`  Status: ${item.ComplianceStatus}`);
      console.log(`  Last Viewed: ${item.LastViewedDate ? new Date(item.LastViewedDate).toDateString() : 'Never'}`);
      console.log(`  Should Show NEW Badge: ${item.ShouldShowNewBadge}`);
      console.log('');
    });
    
    const newBadgeCount = verifyResult.recordset.filter(item => item.ShouldShowNewBadge === 'YES').length;
    console.log(`🎯 ${newBadgeCount} items should now show the NEW badge!`);
    
    if (newBadgeCount > 0) {
      console.log('\n✅ Test setup complete! Refresh your Legal Register page to see NEW badges.');
    }
    
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    if (pool) {
      await pool.close();
      console.log('\n👋 Database connection closed');
    }
  }
}

// Run the setup
console.log('🚀 Starting NEW badge test data setup...\n');
setupTestData()
  .then(() => {
    console.log('\n✅ Setup complete!');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Setup failed:', err);
    process.exit(1);
  });