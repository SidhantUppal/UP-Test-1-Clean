// Quick script to add missing incident types to database
const sql = require('mssql');

// Azure SQL configuration (from database.js)
const config = {
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  server: 'YOUR_DATABASE_SERVER.database.windows.net',
  database: 'V7-Dev',
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

async function setupIncidentTypes() {
  try {
    console.log('Connecting to database...');
    const pool = await sql.connect(config);
    
    console.log('Adding missing incident types...');
    
    const sqlScript = `
      -- Accident Book Record
      IF NOT EXISTS (SELECT * FROM V7.IncidentType WHERE TypeCode = 'ACCIDENT_BOOK')
      BEGIN
          INSERT INTO V7.IncidentType (TypeName, TypeCode, Description, DisplayOrder, IsActive) VALUES
          ('Accident Book Record', 'ACCIDENT_BOOK', 'Detailed accident recording with injury details', 2, 1);
          PRINT 'Added Accident Book Record type';
      END
      ELSE
      BEGIN
          PRINT 'Accident Book Record type already exists';
      END
      
      -- Dangerous Occurrence
      IF NOT EXISTS (SELECT * FROM V7.IncidentType WHERE TypeCode = 'DANGEROUS_OCCURRENCE')
      BEGIN
          INSERT INTO V7.IncidentType (TypeName, TypeCode, Description, DisplayOrder, IsActive) VALUES
          ('Dangerous Occurrence', 'DANGEROUS_OCCURRENCE', 'Report dangerous occurrences and near misses', 4, 1);
          PRINT 'Added Dangerous Occurrence type';
      END
      ELSE
      BEGIN
          PRINT 'Dangerous Occurrence type already exists';
      END
      
      -- Near Miss
      IF NOT EXISTS (SELECT * FROM V7.IncidentType WHERE TypeCode = 'NEAR_MISS')
      BEGIN
          INSERT INTO V7.IncidentType (TypeName, TypeCode, Description, DisplayOrder, IsActive) VALUES
          ('Near Miss', 'NEAR_MISS', 'Report incidents that could have caused harm', 6, 1);
          PRINT 'Added Near Miss type';
      END
      ELSE
      BEGIN
          PRINT 'Near Miss type already exists';
      END
      
      -- Road Traffic Incident
      IF NOT EXISTS (SELECT * FROM V7.IncidentType WHERE TypeCode = 'ROAD_TRAFFIC')
      BEGIN
          INSERT INTO V7.IncidentType (TypeName, TypeCode, Description, DisplayOrder, IsActive) VALUES
          ('Road Traffic Incident', 'ROAD_TRAFFIC', 'Vehicle and road traffic incident reports', 7, 1);
          PRINT 'Added Road Traffic Incident type';
      END
      ELSE
      BEGIN
          PRINT 'Road Traffic Incident type already exists';
      END
      
      -- Update the existing WOBBLE entry to be more descriptive
      UPDATE V7.IncidentType 
      SET TypeName = 'High Potential Incident', 
          Description = 'High potential incidents and safety concerns'
      WHERE TypeCode = 'WOBBLE';
      PRINT 'Updated Wobble type to High Potential Incident';
      
      -- Show all incident types
      SELECT IncidentTypeID, TypeName, TypeCode, Description, DisplayOrder, IsActive 
      FROM V7.IncidentType 
      ORDER BY DisplayOrder;
    `;
    
    const result = await pool.request().query(sqlScript);
    
    console.log('\n=== INCIDENT TYPES SETUP COMPLETED ===');
    console.log('Available incident types:');
    result.recordset.forEach(type => {
      console.log(`- ${type.TypeName} (${type.TypeCode})`);
    });
    
    await pool.close();
    console.log('\n✅ Setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up incident types:', error);
  }
}

setupIncidentTypes();