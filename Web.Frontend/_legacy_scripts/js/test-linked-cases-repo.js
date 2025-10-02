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

async function testLinkedCasesRepository() {
  try {
    const pool = await sql.connect(config);
    console.log('✅ Connected to database');
    
    // Test 1: Check if UserArea table exists and has records
    console.log('\n1. Checking UserArea table...');
    try {
      const userAreaQuery = `SELECT TOP 5 * FROM [V7].[UserArea]`;
      const userAreaResult = await pool.request().query(userAreaQuery);
      console.log(`   Found ${userAreaResult.recordset.length} UserArea records`);
      if (userAreaResult.recordset.length > 0) {
        console.log('   Sample:', userAreaResult.recordset[0]);
      }
    } catch (error) {
      console.log('   ❌ UserArea table error:', error.message);
    }
    
    // Test 2: Check if User table exists and has records
    console.log('\n2. Checking User table...');
    try {
      const userQuery = `SELECT TOP 5 * FROM [V7].[User]`;
      const userResult = await pool.request().query(userQuery);
      console.log(`   Found ${userResult.recordset.length} User records`);
      if (userResult.recordset.length > 0) {
        console.log('   Sample UserID:', userResult.recordset[0].UserID);
      }
    } catch (error) {
      console.log('   ❌ User table error:', error.message);
    }
    
    // Test 3: Test the getIncidentCaseForLinking query directly
    console.log('\n3. Testing getIncidentCaseForLinking query for incident 31...');
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
    request.input('incidentCaseId', sql.Int, 31);
    request.input('userAreaId', sql.Int, 1);
    
    const result = await request.query(query);
    console.log(`   Found ${result.recordset.length} incident(s)`);
    if (result.recordset.length > 0) {
      console.log('   Incident details:', result.recordset[0]);
    } else {
      console.log('   ❌ No incident found with ID 31 and UserAreaID 1');
      
      // Let's check what UserAreaID incident 31 actually has
      const checkQuery = `SELECT IncidentCaseID, UserAreaID, CaseNumber FROM [V7].[IncidentCase] WHERE IncidentCaseID = 31`;
      const checkResult = await pool.request().query(checkQuery);
      if (checkResult.recordset.length > 0) {
        console.log('   Actual incident 31 details:', checkResult.recordset[0]);
      }
    }
    
    // Test 4: Test the IncidentCaseLink table
    console.log('\n4. Testing IncidentCaseLink table...');
    try {
      const linkQuery = `SELECT COUNT(*) as LinkCount FROM [V7].[IncidentCaseLink]`;
      const linkResult = await pool.request().query(linkQuery);
      console.log(`   IncidentCaseLink table has ${linkResult.recordset[0].LinkCount} records`);
    } catch (error) {
      console.log('   ❌ IncidentCaseLink table error:', error.message);
    }
    
    // Test 5: Try to create a test link record (then delete it)
    console.log('\n5. Testing link creation...');
    try {
      const insertQuery = `
        INSERT INTO [V7].[IncidentCaseLink] (
          SourceIncidentCaseID,
          UserAreaID,
          LinkedRecordType,
          LinkedRecordID,
          LinkedRecordTitle,
          LinkComments,
          LinkType,
          CreatedByUserID,
          CreatedDate
        ) 
        OUTPUT INSERTED.IncidentCaseLinkID
        VALUES (
          31, 1, 'IncidentCase', 34, 'Test Link', 'Test comment', 'Related', 1, SYSDATETIMEOFFSET()
        )
      `;
      
      const insertResult = await pool.request().query(insertQuery);
      const linkId = insertResult.recordset[0].IncidentCaseLinkID;
      console.log(`   ✅ Created test link with ID: ${linkId}`);
      
      // Clean up - delete the test record
      const deleteQuery = `DELETE FROM [V7].[IncidentCaseLink] WHERE IncidentCaseLinkID = ${linkId}`;
      await pool.request().query(deleteQuery);
      console.log(`   ✅ Cleaned up test link`);
      
    } catch (error) {
      console.log('   ❌ Link creation error:', error.message);
    }
    
    await pool.close();
    console.log('\n✅ Database connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testLinkedCasesRepository();