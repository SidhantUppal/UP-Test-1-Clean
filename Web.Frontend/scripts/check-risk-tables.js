import sql from 'mssql';
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

async function checkRiskTables() {
  let pool;
  
  try {
    console.log('🔄 Connecting to Azure SQL Database...');
    pool = await sql.connect(config);
    console.log('✅ Connected successfully!\n');
    
    // List all risk-related tables
    const query = `
      SELECT TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' 
      AND TABLE_TYPE = 'BASE TABLE'
      AND (
        TABLE_NAME LIKE '%Risk%' OR 
        TABLE_NAME LIKE '%Hazard%' OR 
        TABLE_NAME LIKE '%Control%' OR
        TABLE_NAME LIKE '%Persons%'
      )
      ORDER BY TABLE_NAME
    `;
    
    const result = await pool.request().query(query);
    
    console.log('📊 Risk Assessment Tables in T100 Schema:');
    console.log('=========================================\n');
    
    const expectedTables = [
      // Core Risk Assessment Tables
      'RiskAssessment',
      'RiskAssessmentType',
      'RiskAssessmentFormatType',
      'RiskAssessmentStatusType',
      'RiskAssessmentHazard',
      'RiskAssessmentControlMeasure',
      'RiskAssessmentLocation',
      'RiskAssessmentOrgGroup',
      'RiskAssessmentOperation',
      'RiskAssessmentPersonsAtRisk',
      'RiskAssessmentApprovalLog',
      'RiskAssessmentAttachment',
      'RiskAssessmentExternalLink',
      
      // Risk Matrix Tables
      'RiskMatrixType',
      'RiskMatrixLikelihoodType',
      'RiskMatrixConsequenceType',
      'RiskMatrixTypeColour',
      'RiskLevelColourType',
      
      // Hazard & Control Libraries
      'Hazard',
      'HazardCategory',
      'HazardCategoryType',
      'ControlMeasure',
      'ControlMeasureType',
      'PersonsAtRisk',
      'PersonsInCharge'
    ];
    
    const existingTables = result.recordset.map(r => r.TABLE_NAME);
    
    console.log('✅ Existing Risk Assessment Tables:');
    existingTables.forEach(table => {
      console.log(`   - T100.${table}`);
    });
    
    console.log(`\nTotal: ${existingTables.length} tables\n`);
    
    // Check for missing tables
    const missingTables = expectedTables.filter(table => !existingTables.includes(table));
    
    if (missingTables.length > 0) {
      console.log('❌ Missing Risk Assessment Tables:');
      missingTables.forEach(table => {
        console.log(`   - T100.${table}`);
      });
      console.log(`\nMissing: ${missingTables.length} tables`);
    } else {
      console.log('✅ All expected Risk Assessment tables are present!');
    }
    
    // Check a sample table structure
    console.log('\n📋 Sample Table Structure (RiskAssessment):');
    const structureQuery = `
      SELECT TOP 5
        COLUMN_NAME,
        DATA_TYPE,
        CHARACTER_MAXIMUM_LENGTH,
        IS_NULLABLE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = 'T100' 
      AND TABLE_NAME = 'RiskAssessment'
      ORDER BY ORDINAL_POSITION
    `;
    
    const structureResult = await pool.request().query(structureQuery);
    structureResult.recordset.forEach(col => {
      const type = col.CHARACTER_MAXIMUM_LENGTH 
        ? `${col.DATA_TYPE}(${col.CHARACTER_MAXIMUM_LENGTH})` 
        : col.DATA_TYPE;
      console.log(`   - ${col.COLUMN_NAME}: ${type} ${col.IS_NULLABLE === 'NO' ? 'NOT NULL' : ''}`);
    });
    
    if (structureResult.recordset.length === 5) {
      console.log('   ... and more columns');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// Run check
console.log('🏁 Risk Assessment Tables Check');
console.log('===============================\n');
checkRiskTables();