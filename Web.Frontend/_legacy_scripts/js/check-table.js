import { connectToDatabase } from './apps/services/incident-manager/src/database.js';

async function checkTable() {
  try {
    const pool = await connectToDatabase();
    
    // Check for AccidentCaseNote table specifically
    const accidentResult = await pool.request().query(`
      SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'V7' 
        AND TABLE_NAME = 'AccidentCaseNote'
      ORDER BY ORDINAL_POSITION
    `);
    
    console.log('AccidentCaseNote table structure:');
    console.log(JSON.stringify(accidentResult.recordset, null, 2));
    
    // Also check for any case note related tables
    const caseNoteResult = await pool.request().query(`
      SELECT DISTINCT TABLE_NAME
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'V7' 
        AND (TABLE_NAME LIKE '%CaseNote%' OR TABLE_NAME LIKE '%Case_Note%')
      ORDER BY TABLE_NAME
    `);
    
    console.log('\nAll case note related tables:');
    console.log(JSON.stringify(caseNoteResult.recordset, null, 2));
    
    process.exit(0);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkTable();