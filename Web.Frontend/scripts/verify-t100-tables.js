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

async function verifyTables() {
  let pool;
  
  try {
    console.log('🔄 Connecting to Azure SQL Database...');
    pool = await sql.connect(config);
    console.log('✅ Connected successfully!\n');
    
    // Count total tables
    const totalQuery = `
      SELECT COUNT(*) as TotalCount
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' AND TABLE_TYPE = 'BASE TABLE'
    `;
    
    const totalResult = await pool.request().query(totalQuery);
    console.log(`📊 Total T100 Tables Created: ${totalResult.recordset[0].TotalCount}`);
    console.log('=====================================\n');
    
    // Count by module
    const modules = [
      { name: 'Training & E-Learning', pattern: '%Course%' },
      { name: 'Risk Assessment', pattern: '%Risk%\' OR TABLE_NAME LIKE \'%Hazard%\' OR TABLE_NAME LIKE \'%Control%' },
      { name: 'Safe Systems of Work', pattern: '%Method%\' OR TABLE_NAME LIKE \'%Safe%\' OR TABLE_NAME LIKE \'%SSOW%\' OR TABLE_NAME LIKE \'%Work%' },
      { name: 'Policies', pattern: '%Policy%' }
    ];
    
    for (const module of modules) {
      const query = `
        SELECT COUNT(*) as Count
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_SCHEMA = 'T100' 
        AND TABLE_TYPE = 'BASE TABLE'
        AND (TABLE_NAME LIKE '${module.pattern}')
      `;
      
      const result = await pool.request().query(query);
      console.log(`✅ ${module.name}: ${result.recordset[0].Count} tables`);
    }
    
    // List all tables
    console.log('\n📝 All T100 Tables Created:');
    console.log('---------------------------');
    
    const listQuery = `
      SELECT TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'T100' AND TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
    `;
    
    const listResult = await pool.request().query(listQuery);
    
    // Group tables by module
    const trainingTables = [];
    const riskTables = [];
    const ssowTables = [];
    const policyTables = [];
    const otherTables = [];
    
    listResult.recordset.forEach(row => {
      const tableName = row.TABLE_NAME;
      if (tableName.includes('Course')) {
        trainingTables.push(tableName);
      } else if (tableName.includes('Risk') || tableName.includes('Hazard') || tableName.includes('Control') || tableName.includes('Persons')) {
        riskTables.push(tableName);
      } else if (tableName.includes('Method') || tableName.includes('Safe') || tableName.includes('SSOW') || tableName.includes('Work')) {
        ssowTables.push(tableName);
      } else if (tableName.includes('Policy')) {
        policyTables.push(tableName);
      } else {
        otherTables.push(tableName);
      }
    });
    
    if (trainingTables.length > 0) {
      console.log('\n🎓 Training & E-Learning Tables:');
      trainingTables.forEach(t => console.log(`   - T100.${t}`));
    }
    
    if (riskTables.length > 0) {
      console.log('\n⚠️  Risk Assessment Tables:');
      riskTables.forEach(t => console.log(`   - T100.${t}`));
    }
    
    if (ssowTables.length > 0) {
      console.log('\n🔧 Safe Systems of Work Tables:');
      ssowTables.forEach(t => console.log(`   - T100.${t}`));
    }
    
    if (policyTables.length > 0) {
      console.log('\n📋 Policy Tables:');
      policyTables.forEach(t => console.log(`   - T100.${t}`));
    }
    
    if (otherTables.length > 0) {
      console.log('\n📦 Other Tables:');
      otherTables.forEach(t => console.log(`   - T100.${t}`));
    }
    
    // Check for missing expected tables
    console.log('\n🔍 Checking for any missing tables...');
    
    const expectedTables = [
      'Course', 'CourseType', 'CourseCategory', 'CourseEnrolment',
      'RiskAssessment', 'RiskAssessmentHazard', 'RiskMatrixType',
      'MethodStatement', 'SafeWorkingProcedure', 'WorkInstruction',
      'Policy', 'PolicyType', 'PolicyAcknowledgment'
    ];
    
    const missingTables = [];
    for (const expected of expectedTables) {
      const exists = listResult.recordset.some(r => r.TABLE_NAME === expected);
      if (!exists) {
        missingTables.push(expected);
      }
    }
    
    if (missingTables.length > 0) {
      console.log('❌ Missing expected tables:');
      missingTables.forEach(t => console.log(`   - T100.${t}`));
    } else {
      console.log('✅ All expected core tables are present!');
    }
    
    console.log('\n✅ T100 Schema Migration Verification Complete!');
    console.log(`   Total tables created: ${totalResult.recordset[0].TotalCount}`);
    
  } catch (err) {
    console.error('❌ Verification failed:', err.message);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// Run verification
console.log('🏁 T100 Tables Verification Tool');
console.log('================================\n');
verifyTables();