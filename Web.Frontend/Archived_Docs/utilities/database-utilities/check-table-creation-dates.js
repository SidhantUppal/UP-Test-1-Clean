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

async function checkTableDates() {
  try {
    console.log('Connecting to V7-Dev to check table creation dates...');
    const pool = await sql.connect(config);
    console.log('✅ Connected!\n');
    
    // Check when fire/pas79/martyns tables were created
    console.log('=== CHECKING FOR FIRE/PAS79/MARTYNS LAW TABLES ===');
    const fireTablesResult = await pool.request().query(`
      SELECT
          s.name AS SchemaName,
          t.name AS TableName,
          t.create_date AS CreatedDate,
          t.modify_date AS Modified
      FROM sys.tables t
      INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
      WHERE t.name LIKE '%pas79%'
         OR t.name LIKE '%fire_risk%'
         OR t.name LIKE '%fire%risk%'
         OR t.name LIKE '%martyns_law%'
         OR t.name LIKE '%martyns%law%'
      ORDER BY t.create_date DESC
    `);
    
    if (fireTablesResult.recordset.length > 0) {
      console.log('Found fire/PAS79/Martyns Law tables:');
      fireTablesResult.recordset.forEach(row => {
        console.log(`\n  Table: ${row.SchemaName}.${row.TableName}`);
        console.log(`  Created: ${row.CreatedDate}`);
        console.log(`  Modified: ${row.Modified}`);
      });
    } else {
      console.log('❌ No tables found with pas79, fire_risk, or martyns_law in the name');
    }
    
    // Check all tables created recently (last 30 days)
    console.log('\n\n=== TABLES CREATED IN LAST 30 DAYS ===');
    const recentTablesResult = await pool.request().query(`
      SELECT TOP 20
          s.name AS SchemaName,
          t.name AS TableName,
          t.create_date AS CreatedDate,
          t.modify_date AS Modified
      FROM sys.tables t
      INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
      WHERE t.create_date >= DATEADD(day, -30, sysdatetimeoffset())
      ORDER BY t.create_date DESC
    `);
    
    if (recentTablesResult.recordset.length > 0) {
      console.log('Recently created tables:');
      recentTablesResult.recordset.forEach(row => {
        console.log(`  ${row.SchemaName}.${row.TableName} - Created: ${row.CreatedDate}`);
      });
    } else {
      console.log('No tables created in the last 30 days');
    }
    
    // Check document and task table creation dates
    console.log('\n\n=== DOCUMENT AND TASK TABLE CREATION DATES ===');
    const docTaskResult = await pool.request().query(`
      SELECT
          s.name AS SchemaName,
          t.name AS TableName,
          t.create_date AS CreatedDate,
          t.modify_date AS Modified
      FROM sys.tables t
      INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
      WHERE (t.name IN ('DocumentTemplate', 'DocumentTemplateTag', 'DocumentAssignment', 
                        'DocumentBundle', 'Task', 'TaskType', 'TaskAssignment')
             AND s.name = 'V7')
         OR (t.name LIKE '%RiskAssessment%' AND s.name = 'T100')
      ORDER BY s.name, t.name
    `);
    
    if (docTaskResult.recordset.length > 0) {
      console.log('Core system tables:');
      let currentSchema = '';
      docTaskResult.recordset.forEach(row => {
        if (row.SchemaName !== currentSchema) {
          currentSchema = row.SchemaName;
          console.log(`\n  Schema: ${currentSchema}`);
        }
        console.log(`    ${row.TableName} - Created: ${row.CreatedDate}`);
      });
    }
    
    // Check if there are any tables with 'hazard' in the name
    console.log('\n\n=== HAZARD-RELATED TABLES ===');
    const hazardResult = await pool.request().query(`
      SELECT
          s.name AS SchemaName,
          t.name AS TableName,
          t.create_date AS CreatedDate,
          t.modify_date AS Modified
      FROM sys.tables t
      INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
      WHERE LOWER(t.name) LIKE '%hazard%'
      ORDER BY t.create_date DESC
    `);
    
    if (hazardResult.recordset.length > 0) {
      console.log('Found hazard-related tables:');
      hazardResult.recordset.forEach(row => {
        console.log(`  ${row.SchemaName}.${row.TableName} - Created: ${row.CreatedDate}`);
      });
    } else {
      console.log('❌ No tables with "hazard" in the name');
    }
    
    console.log('\n\n=== SUMMARY ===');
    console.log('1. Fire/PAS79/Martyns Law tables: ' + 
                (fireTablesResult.recordset.length > 0 ? '✅ Found' : '❌ NOT FOUND'));
    console.log('2. Recent tables (last 30 days): ' + recentTablesResult.recordset.length);
    console.log('3. Hazard tables: ' + 
                (hazardResult.recordset.length > 0 ? '✅ Found' : '❌ NOT FOUND'));
    console.log('\n📌 If the specific tables don\'t exist, the system likely uses:');
    console.log('   - T100.RiskAssessment for all risk assessments (generic)');
    console.log('   - JSON data storage within existing tables');
    console.log('   - Type differentiation via RiskAssessmentTypeID');
    
    await pool.close();
    console.log('\n✅ Table date check complete');
    
  } catch (err) {
    console.error('❌ Database error:', err.message);
  }
}

checkTableDates();