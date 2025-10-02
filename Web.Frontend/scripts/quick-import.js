// Quick import script - bypass POST endpoint issues
import fs from 'fs';
import sql from 'mssql';

// Database configuration - using the same config as the frontend
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
  },
  pool: {
    max: 10,
    min: 2,
    idleTimeoutMillis: 60000,
    acquireTimeoutMillis: 15000
  }
};

// Read the legislation data
const legislationData = JSON.parse(fs.readFileSync('hse-legislation-import.json', 'utf8'));

console.log(`Importing ${legislationData.length} legislation items directly to Azure database...`);

async function importDirectly() {
  let pool;
  try {
    // Connect to database
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('✅ Connected to Azure database');

    let successCount = 0;
    let failCount = 0;

    for (const [index, item] of legislationData.entries()) {
      try {
        console.log(`[${index + 1}/${legislationData.length}] ${item.Name}`);
        
        const request = pool.request();
        request.input('name', sql.VarChar, item.Name);
        request.input('link', sql.VarChar, item.Link || '');
        request.input('industryName', sql.VarChar, item.IndustryName || 'All Industries');
        request.input('riskLevel', sql.VarChar, item.RiskLevel || 'Medium');
        request.input('complianceStatus', sql.VarChar, item.ComplianceStatus || 'Under Review');
        request.input('notes', sql.VarChar, item.Notes || '');
        request.input('legislationType', sql.VarChar, item.LegislationType || 'General');

        const query = `
          INSERT INTO [dbo].[LegalRegister] (Name, Link, IndustryName, RiskLevel, ComplianceStatus, Notes, LegislationType, LatestUpdate)
          VALUES (@name, @link, @industryName, @riskLevel, @complianceStatus, @notes, @legislationType, sysdatetimeoffset());
        `;

        await request.query(query);
        console.log(`✅ Success: ${item.Name}`);
        successCount++;

      } catch (error) {
        console.log(`❌ Failed: ${item.Name} - ${error.message}`);
        failCount++;
      }

      // Small delay between inserts
      if (index < legislationData.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    console.log(`\n🎉 Import completed!`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📊 Total: ${legislationData.length}`);

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    if (pool) {
      await pool.close();
      console.log('Database connection closed');
    }
  }
}

importDirectly().catch(console.error);