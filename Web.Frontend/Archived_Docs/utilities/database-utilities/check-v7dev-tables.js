const sql = require('mssql');

const config = {
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  server: 'YOUR_DATABASE_SERVER.database.windows.net',
  database: 'V7-Dev',  // CORRECT DATABASE
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectTimeout: 30000,
    requestTimeout: 30000
  }
};

async function checkV7DevTables() {
  try {
    console.log('Connecting to Azure SQL Database (V7-Dev)...');
    const pool = await sql.connect(config);
    console.log('✅ Connected to V7-Dev database!\n');
    
    // 1. Check for PAS79 table
    console.log('=== 1. PAS79 Fire Risk Assessment Table ===');
    const pas79Result = await pool.request().query(`
      SELECT TABLE_NAME, COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME LIKE '%pas79%' OR TABLE_NAME LIKE '%fire_risk_assessment_pas79%'
      ORDER BY TABLE_NAME, ORDINAL_POSITION
    `);
    
    if (pas79Result.recordset.length > 0) {
      const tableName = pas79Result.recordset[0].TABLE_NAME;
      console.log(`Found table: ${tableName}`);
      console.log('Columns:');
      pas79Result.recordset.forEach(row => console.log(`  - ${row.COLUMN_NAME}`));
      
      // Check for section 8-11 columns
      const importantColumns = ['occupancy_profile', 'means_of_escape', 'full_action_plan', 'additional_evidence'];
      const foundColumns = pas79Result.recordset.map(r => r.COLUMN_NAME);
      console.log('\nChecking for sections 8-11 columns:');
      importantColumns.forEach(col => {
        if (foundColumns.some(fc => fc.toLowerCase().includes(col))) {
          console.log(`  ✅ ${col} - FOUND`);
        } else {
          console.log(`  ❌ ${col} - MISSING`);
        }
      });
    } else {
      console.log('❌ No PAS79 table found');
    }
    
    // 2. Check for Standard Fire Risk Assessment
    console.log('\n=== 2. Standard Fire Risk Assessment Table ===');
    const standardResult = await pool.request().query(`
      SELECT TABLE_NAME, COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME LIKE '%fire_risk_assessment_standard%'
      ORDER BY TABLE_NAME, ORDINAL_POSITION
    `);
    
    if (standardResult.recordset.length > 0) {
      console.log(`Found table: ${standardResult.recordset[0].TABLE_NAME}`);
      console.log(`Total columns: ${standardResult.recordset.length}`);
    } else {
      console.log('❌ No Standard Fire Risk Assessment table found');
    }
    
    // 3. Check for Martyn's Law
    console.log('\n=== 3. Martyns Law Risk Assessment Table ===');
    const martynsResult = await pool.request().query(`
      SELECT TABLE_NAME, COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME LIKE '%martyns_law%'
      ORDER BY TABLE_NAME, ORDINAL_POSITION
    `);
    
    if (martynsResult.recordset.length > 0) {
      console.log(`Found table: ${martynsResult.recordset[0].TABLE_NAME}`);
      console.log(`Total columns: ${martynsResult.recordset.length}`);
    } else {
      console.log('❌ No Martyns Law table found');
    }
    
    // 4. Check for hazard task types
    console.log('\n=== 4. Hazard Task Types ===');
    try {
      const taskTypesResult = await pool.request().query(`
        SELECT * FROM task_types 
        WHERE category = 'hazard' OR type LIKE '%hazard%'
      `);
      
      if (taskTypesResult.recordset.length > 0) {
        console.log(`Found ${taskTypesResult.recordset.length} hazard-related task types:`);
        taskTypesResult.recordset.forEach(row => {
          console.log(`  - ${row.type} (Category: ${row.category})`);
        });
      } else {
        console.log('❌ No hazard task types found');
      }
    } catch (err) {
      if (err.message.includes('Invalid object name')) {
        console.log('❌ task_types table does not exist');
      } else {
        console.log('❌ Error checking task types:', err.message);
      }
    }
    
    // 5. Check for document management tables
    console.log('\n=== 5. Document Management Tables ===');
    const docTablesResult = await pool.request().query(`
      SELECT TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME IN (
        'document_assignments',
        'document_bundles',
        'document_templates',
        'document_template_tags'
      )
    `);
    
    const expectedDocTables = ['document_assignments', 'document_bundles', 'document_templates', 'document_template_tags'];
    const foundDocTables = docTablesResult.recordset.map(r => r.TABLE_NAME);
    
    expectedDocTables.forEach(table => {
      if (foundDocTables.includes(table)) {
        console.log(`  ✅ ${table} - EXISTS`);
      } else {
        console.log(`  ❌ ${table} - MISSING`);
      }
    });
    
    // 6. Summary
    console.log('\n=== SUMMARY FOR V7-Dev DATABASE ===');
    console.log('Database recovery status:');
    console.log(`- PAS79 table: ${pas79Result.recordset.length > 0 ? '✅ Exists' : '❌ Missing'}`);
    console.log(`- Standard Fire table: ${standardResult.recordset.length > 0 ? '✅ Exists' : '❌ Missing'}`);
    console.log(`- Martyns Law table: ${martynsResult.recordset.length > 0 ? '✅ Exists' : '❌ Missing'}`);
    console.log(`- Document tables: ${foundDocTables.length}/${expectedDocTables.length} found`);
    
    await pool.close();
    console.log('\n✅ V7-Dev database check complete');
    
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    if (err.message.includes('Cannot open database')) {
      console.error('The database "V7-Dev" may not exist or you may not have access.');
    }
  }
}

checkV7DevTables();