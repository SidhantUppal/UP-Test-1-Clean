// Verify NEW badge status in Azure V7-Dev database
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

async function verifyNewBadgeStatus() {
  let pool;
  
  try {
    console.log('🔍 Checking NEW badge status in Azure V7-Dev...\n');
    
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('✅ Connected to database');

    // Check the NEW badge logic from the database perspective
    const query = `
      SELECT TOP 10
        LegalRegisterID,
        Name,
        LatestUpdate,
        ComplianceStatus,
        LastViewedDate,
        DATEDIFF(day, LatestUpdate, sysdatetimeoffset()) as DaysOld,
        CASE 
          WHEN DATEDIFF(day, LatestUpdate, sysdatetimeoffset()) <= 7 
               AND ComplianceStatus = 'Under Review' 
               AND (LastViewedDate IS NULL OR LastViewedDate < LatestUpdate)
          THEN 'YES' 
          ELSE 'NO' 
        END as ShouldShowNewBadge
      FROM [dbo].[LegalRegister] 
      ORDER BY LatestUpdate DESC
    `;
    
    const result = await pool.request().query(query);
    
    console.log('\n📋 Current NEW badge status for latest legislation:\n');
    
    result.recordset.forEach((item, index) => {
      console.log(`${index + 1}. ${item.Name}`);
      console.log(`   Latest Update: ${new Date(item.LatestUpdate).toDateString()} (${item.DaysOld} days ago)`);
      console.log(`   Status: ${item.ComplianceStatus}`);
      console.log(`   Last Viewed: ${item.LastViewedDate ? new Date(item.LastViewedDate).toDateString() : 'Never'}`);
      console.log(`   🏷️  Should Show NEW Badge: ${item.ShouldShowNewBadge}`);
      console.log('');
    });
    
    const newBadgeCount = result.recordset.filter(item => item.ShouldShowNewBadge === 'YES').length;
    console.log(`🎯 Total items that should show NEW badge: ${newBadgeCount} out of ${result.recordset.length}`);
    
    if (newBadgeCount > 0) {
      console.log('\n✅ NEW badges should be visible! Refresh your Legal Register page.');
    } else {
      console.log('\n⚠️  No NEW badges should be showing. You may need to:');
      console.log('   - Check if items are set to "Under Review" status');
      console.log('   - Verify LatestUpdate is within 7 days');
      console.log('   - Ensure LastViewedDate is NULL or older than LatestUpdate');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (pool) {
      await pool.close();
      console.log('\n👋 Database connection closed');
    }
  }
}

verifyNewBadgeStatus().catch(console.error);