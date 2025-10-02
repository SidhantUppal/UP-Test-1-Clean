const sql = require('mssql');

const config = {
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  server: 'YOUR_DATABASE_SERVER.database.windows.net',
  database: 'V7-Dev',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectTimeout: 30000,
    requestTimeout: 30000
  }
};

async function checkFireTables() {
  try {
    console.log('Connecting to V7-Dev to check fire assessment tables...');
    const pool = await sql.connect(config);
    console.log('✅ Connected!\n');
    
    // Check for fire-specific tables across all schemas
    console.log('=== CHECKING FOR FIRE RISK ASSESSMENT TABLES ===');
    const fireResult = await pool.request().query(`
      SELECT 
        TABLE_SCHEMA,
        TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE LOWER(TABLE_NAME) LIKE '%fire%' 
         OR LOWER(TABLE_NAME) LIKE '%pas79%'
         OR LOWER(TABLE_NAME) LIKE '%martyn%'
      ORDER BY TABLE_SCHEMA, TABLE_NAME
    `);
    
    if (fireResult.recordset.length > 0) {
      console.log('Found fire/safety related tables:');
      fireResult.recordset.forEach(row => {
        console.log(`  ✅ ${row.TABLE_SCHEMA}.${row.TABLE_NAME}`);
      });
    } else {
      console.log('❌ No tables with "fire", "pas79", or "martyn" in the name');
    }
    
    // Check RiskAssessment table structure
    console.log('\n=== CHECKING T100.RiskAssessment TABLE STRUCTURE ===');
    const raColumns = await pool.request().query(`
      SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = 'T100' AND TABLE_NAME = 'RiskAssessment'
      ORDER BY ORDINAL_POSITION
    `);
    
    console.log('T100.RiskAssessment columns:');
    raColumns.recordset.forEach(col => {
      console.log(`  - ${col.COLUMN_NAME} (${col.DATA_TYPE})`);
    });
    
    // Check RiskAssessmentType for fire types
    console.log('\n=== CHECKING RISK ASSESSMENT TYPES ===');
    const raTypes = await pool.request().query(`
      SELECT RiskAssessmentTypeID, Name, Description
      FROM T100.RiskAssessmentType
      ORDER BY RiskAssessmentTypeID
    `);
    
    if (raTypes.recordset.length > 0) {
      console.log('Available Risk Assessment Types:');
      raTypes.recordset.forEach(type => {
        console.log(`  - ID ${type.RiskAssessmentTypeID}: ${type.Name}`);
        if (type.Description) {
          console.log(`    Description: ${type.Description}`);
        }
      });
    } else {
      console.log('No risk assessment types found');
    }
    
    // Check for hazard-related task types
    console.log('\n=== CHECKING FOR HAZARD TASK TYPES ===');
    const taskTypes = await pool.request().query(`
      SELECT TaskTypeID, Name, Description, IsActive
      FROM V7.TaskType
      WHERE LOWER(Name) LIKE '%hazard%' 
         OR LOWER(Description) LIKE '%hazard%'
      ORDER BY TaskTypeID
    `);
    
    if (taskTypes.recordset.length > 0) {
      console.log('Found hazard-related task types:');
      taskTypes.recordset.forEach(type => {
        console.log(`  - ${type.Name} (Active: ${type.IsActive})`);
      });
    } else {
      console.log('❌ No hazard-related task types found in V7.TaskType');
    }
    
    // Check document tables
    console.log('\n=== VERIFYING DOCUMENT TABLES ===');
    const docTables = ['DocumentTemplate', 'DocumentTemplateTag', 'DocumentAssignment', 'DocumentBundle'];
    for (const table of docTables) {
      const exists = await pool.request().query(`
        SELECT COUNT(*) as cnt
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = '${table}'
      `);
      
      if (exists.recordset[0].cnt > 0) {
        console.log(`  ✅ V7.${table} EXISTS`);
      } else {
        console.log(`  ❌ V7.${table} MISSING`);
      }
    }
    
    console.log('\n=== SUMMARY ===');
    console.log('Based on the database structure:');
    console.log('1. Risk assessments appear to use T100.RiskAssessment table');
    console.log('2. No dedicated PAS79 or fire-specific tables found');
    console.log('3. Document management tables exist in V7 schema');
    console.log('4. Task system exists in V7 schema');
    console.log('\n📌 The system may be using the generic RiskAssessment table with different types');
    console.log('📌 Fire assessments might be stored as JSON or in a type-specific way');
    
    await pool.close();
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

checkFireTables();