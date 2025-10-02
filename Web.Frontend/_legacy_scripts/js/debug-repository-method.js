const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  server: 'YOUR_DATABASE_SERVER.database.windows.net',
  database: 'V7-Dev',
  options: { encrypt: true, trustServerCertificate: false }
};

async function debugRepositoryMethod() {
  try {
    console.log('🔍 Testing repository method getIncidentCaseForLinking directly...\n');
    
    const pool = await sql.connect(config);
    console.log('✅ Connected to database');
    
    const incidentCaseId = 31;
    const userAreaId = 1;
    
    // This is the exact query from the repository
    const query = `
      SELECT 
        ic.IncidentCaseID,
        ic.CaseNumber,
        ic.Description,
        ic.Severity,
        ic.Status,
        ic.IncidentDate,
        it.TypeName,
        it.TypeCode
      FROM [V7].[IncidentCase] ic
      LEFT JOIN [V7].[IncidentType] it ON ic.IncidentTypeID = it.IncidentTypeID
      WHERE ic.IncidentCaseID = @incidentCaseId 
        AND ic.UserAreaID = @userAreaId 
        AND ic.IsDeleted = 0
    `;
    
    const request = pool.request();
    request.input('incidentCaseId', sql.Int, incidentCaseId);
    request.input('userAreaId', sql.Int, userAreaId);
    
    console.log('📋 Executing query with parameters:');
    console.log('   incidentCaseId:', incidentCaseId);
    console.log('   userAreaId:', userAreaId);
    console.log('');
    
    const result = await request.query(query);
    
    console.log('📊 Query result:');
    console.log('   recordset.length:', result.recordset.length);
    console.log('   recordset:', result.recordset);
    console.log('');
    
    if (result.recordset.length === 0) {
      console.log('❌ The query returned no results');
      
      // Let's check what data actually exists
      console.log('🔍 Checking actual incident data...');
      const checkQuery = `
        SELECT 
          IncidentCaseID,
          UserAreaID,
          CaseNumber,
          IsDeleted,
          IncidentTypeID
        FROM [V7].[IncidentCase] 
        WHERE IncidentCaseID = 31
      `;
      const checkResult = await pool.request().query(checkQuery);
      console.log('   Raw incident 31 data:', checkResult.recordset);
      
    } else {
      console.log('✅ Query returned results successfully');
      const incident = result.recordset[0];
      console.log('   Found incident:', incident);
    }
    
    await pool.close();
    console.log('\n✅ Database connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

debugRepositoryMethod();