import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

async function getConnection() {
  const config = {
    user: process.env.DB_USER || 'CloudSA729a31f0',
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'YOUR_DATABASE_SERVER.database.windows.net',
    database: process.env.DB_NAME || 'V7-Dev',
    options: {
      encrypt: true,
      trustServerCertificate: false
    }
  };
  
  return await sql.connect(config);
}

async function checkAllTables() {
  try {
    console.log('Connecting to Azure SQL Database V7-Dev...');
    const pool = await getConnection();
    console.log('Connected successfully!\n');

    // Check all schemas with table counts
    const schemasQuery = `
      SELECT 
        TABLE_SCHEMA, 
        COUNT(*) as TableCount
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
      GROUP BY TABLE_SCHEMA
      ORDER BY TABLE_SCHEMA
    `;
    
    const schemasResult = await pool.request().query(schemasQuery);
    console.log('=== SCHEMAS IN DATABASE ===');
    schemasResult.recordset.forEach(row => {
      console.log(`${row.TABLE_SCHEMA}: ${row.TableCount} tables`);
    });

    // Check V7 Schema Tables
    console.log('\n=== V7 SCHEMA TABLES ===');
    const v7Query = `
      SELECT TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = 'V7' AND TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
    `;
    
    const v7Result = await pool.request().query(v7Query);
    console.log(`Found ${v7Result.recordset.length} tables in V7 schema:`);
    
    // Group V7 tables by module
    const assetTables = v7Result.recordset.filter(t => t.TABLE_NAME.includes('Asset'));
    const incidentTables = v7Result.recordset.filter(t => t.TABLE_NAME.includes('Incident'));
    const taskTables = v7Result.recordset.filter(t => t.TABLE_NAME.includes('Task'));
    const processTables = v7Result.recordset.filter(t => t.TABLE_NAME.includes('Process'));
    
    if (assetTables.length > 0) {
      console.log('\nAsset-related tables:');
      assetTables.forEach(t => console.log(`  - V7.${t.TABLE_NAME}`));
    }
    
    if (incidentTables.length > 0) {
      console.log('\nIncident-related tables:');
      incidentTables.forEach(t => console.log(`  - V7.${t.TABLE_NAME}`));
    }
    
    if (taskTables.length > 0) {
      console.log('\nTask-related tables:');
      taskTables.forEach(t => console.log(`  - V7.${t.TABLE_NAME}`));
    }
    
    if (processTables.length > 0) {
      console.log('\nProcess-related tables:');
      processTables.forEach(t => console.log(`  - V7.${t.TABLE_NAME}`));
    }
    
    console.log('\nOther V7 tables:');
    v7Result.recordset
      .filter(t => !t.TABLE_NAME.includes('Asset') && 
                   !t.TABLE_NAME.includes('Incident') && 
                   !t.TABLE_NAME.includes('Task') &&
                   !t.TABLE_NAME.includes('Process'))
      .forEach(t => console.log(`  - V7.${t.TABLE_NAME}`));

    // Check T100 Schema Tables
    console.log('\n=== T100 SCHEMA TABLES ===');
    const t100Query = `
      SELECT TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = 'T100' AND TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
    `;
    
    const t100Result = await pool.request().query(t100Query);
    console.log(`Found ${t100Result.recordset.length} tables in T100 schema`);
    
    if (t100Result.recordset.length > 0) {
      // Group T100 tables by module
      const trainingTables = t100Result.recordset.filter(t => t.TABLE_NAME.includes('Course'));
      const riskTables = t100Result.recordset.filter(t => 
        t.TABLE_NAME.includes('Risk') || 
        t.TABLE_NAME.includes('Hazard') || 
        t.TABLE_NAME.includes('Control'));
      const ssowTables = t100Result.recordset.filter(t => 
        t.TABLE_NAME.includes('Method') || 
        t.TABLE_NAME.includes('SSOW') || 
        t.TABLE_NAME.includes('Safe') ||
        t.TABLE_NAME.includes('WorkInstruction') ||
        t.TABLE_NAME.includes('WorkingProcedure'));
      const policyTables = t100Result.recordset.filter(t => t.TABLE_NAME.includes('Policy'));
      
      if (trainingTables.length > 0) {
        console.log('\nTraining & E-Learning tables:');
        trainingTables.forEach(t => console.log(`  - T100.${t.TABLE_NAME}`));
      }
      
      if (riskTables.length > 0) {
        console.log('\nRisk Assessment tables:');
        riskTables.forEach(t => console.log(`  - T100.${t.TABLE_NAME}`));
      }
      
      if (ssowTables.length > 0) {
        console.log('\nSafe Systems of Work tables:');
        ssowTables.forEach(t => console.log(`  - T100.${t.TABLE_NAME}`));
      }
      
      if (policyTables.length > 0) {
        console.log('\nPolicy tables:');
        policyTables.forEach(t => console.log(`  - T100.${t.TABLE_NAME}`));
      }
    }

    // Check Portal Schema Tables
    console.log('\n=== PORTAL SCHEMA TABLES ===');
    const portalQuery = `
      SELECT TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = 'Portal' AND TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
    `;
    
    const portalResult = await pool.request().query(portalQuery);
    console.log(`Found ${portalResult.recordset.length} tables in Portal schema`);
    
    if (portalResult.recordset.length > 0) {
      // Check for key Portal tables
      const keyPortalTables = ['Company', 'Role', 'Permission', 'SystemConfiguration', 'Licence'];
      console.log('\nKey Portal tables:');
      keyPortalTables.forEach(tableName => {
        const exists = portalResult.recordset.some(t => t.TABLE_NAME === tableName);
        console.log(`  - Portal.${tableName}: ${exists ? '✅ EXISTS' : '❌ NOT FOUND'}`);
      });
      
      // Show first 10 Portal tables
      console.log('\nFirst 10 Portal tables:');
      portalResult.recordset.slice(0, 10).forEach(t => console.log(`  - Portal.${t.TABLE_NAME}`));
      if (portalResult.recordset.length > 10) {
        console.log(`  ... and ${portalResult.recordset.length - 10} more tables`);
      }
    }

    // Summary Report
    console.log('\n=== MIGRATION STATUS REPORT ===');
    console.log('\n1. TRAINING & E-LEARNING:');
    const courseCount = t100Result.recordset.filter(t => t.TABLE_NAME.includes('Course')).length;
    console.log(`   - Current Status: ${courseCount > 0 ? `✅ ${courseCount} tables exist in T100 schema` : '❌ No tables in T100 schema'}`);
    console.log('   - Migration Scripts: 16 tables ready in 02-training-elearning-tables.sql');
    console.log(`   - Action Required: ${courseCount === 0 ? 'Run migration scripts' : 'Already migrated'}`);
    
    console.log('\n2. RISK ASSESSMENT:');
    const riskCount = t100Result.recordset.filter(t => 
      t.TABLE_NAME.includes('Risk') || 
      t.TABLE_NAME.includes('Hazard') || 
      t.TABLE_NAME.includes('Control')).length;
    console.log(`   - Current Status: ${riskCount > 0 ? `✅ ${riskCount} tables exist in T100 schema` : '❌ No tables in T100 schema'}`);
    console.log('   - Migration Scripts: 24 tables ready in 03-risk-assessment-tables.sql');
    console.log(`   - Action Required: ${riskCount === 0 ? 'Run migration scripts' : 'Already migrated'}`);
    
    console.log('\n3. SAFE SYSTEMS OF WORK:');
    const ssowCount = t100Result.recordset.filter(t => 
      t.TABLE_NAME.includes('Method') || 
      t.TABLE_NAME.includes('SSOW') || 
      t.TABLE_NAME.includes('Safe') ||
      t.TABLE_NAME.includes('WorkInstruction') ||
      t.TABLE_NAME.includes('WorkingProcedure')).length;
    console.log(`   - Current Status: ${ssowCount > 0 ? `✅ ${ssowCount} tables exist in T100 schema` : '❌ No tables in T100 schema'}`);
    console.log('   - Migration Scripts: 15+ tables ready in 04-safe-systems-work-tables.sql');
    console.log(`   - Action Required: ${ssowCount === 0 ? 'Run migration scripts' : 'Already migrated'}`);
    
    console.log('\n4. POLICIES:');
    const policyCount = t100Result.recordset.filter(t => t.TABLE_NAME.includes('Policy')).length;
    console.log(`   - Current Status: ${policyCount > 0 ? `✅ ${policyCount} tables exist in T100 schema` : '❌ No tables in T100 schema'}`);
    console.log('   - Migration Scripts: 15+ tables ready in 06-policies-tables.sql');
    console.log(`   - Action Required: ${policyCount === 0 ? 'Run migration scripts' : 'Already migrated'}`);
    
    console.log('\n5. ASSETS:');
    console.log(`   - Current Status: ✅ ${assetTables.length} tables exist in V7 schema (refactored)`);
    console.log('   - No T100 import needed - using V7 tables');
    
    console.log('\n6. INCIDENTS:');
    console.log(`   - Current Status: ✅ ${incidentTables.length} tables exist in V7 schema (refactored)`);
    console.log('   - Replaces legacy T100.AccidentCase');
    
    console.log('\n7. PORTAL TABLES:');
    console.log(`   - Current Status: ${portalResult.recordset.length > 0 ? `✅ ${portalResult.recordset.length} tables exist` : '❌ No Portal schema'}`);
    console.log('   - Action Required: Generate and run Portal table import scripts from v7-portal');

    console.log('\n=== NEXT STEPS ===');
    if (t100Result.recordset.length === 0) {
      console.log('1. Run T100 migration scripts: /scripts/migration/t100-schema/00-master-execution.sql');
    }
    if (portalResult.recordset.length === 0) {
      console.log('2. Import Portal schema tables from v7-portal database');
    }
    console.log('3. Import reference data and client data after table creation');

    await pool.close();
    
  } catch (error) {
    console.error('Error checking tables:', error);
    process.exit(1);
  }
}

// Run the check
checkAllTables();