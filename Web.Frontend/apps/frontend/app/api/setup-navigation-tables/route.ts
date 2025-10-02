import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

const dbConfig: sql.config = {
  server: process.env.DB_HOST || 'YOUR_DATABASE_SERVER.database.windows.net',
  database: process.env.DB_NAME || 'V7-Dev',
  user: process.env.DB_USER || 'YOUR_DB_USER',
  password: process.env.DB_PASSWORD || 'YOUR_DB_PASSWORD',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true,
    connectTimeout: 30000,
    requestTimeout: 30000
  }
};

export async function POST(request: NextRequest) {
  let pool: sql.ConnectionPool | null = null;
  
  try {
    pool = await sql.connect(dbConfig);
    
    // Create RoleNavigationPreferences table
    const createTableQuery = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='RoleNavigationPreferences' AND xtype='U')
      BEGIN
        CREATE TABLE dbo.RoleNavigationPreferences (
          RoleNavigationPreferencesID INT IDENTITY(1,1) PRIMARY KEY,
          RoleID NVARCHAR(50) NOT NULL,
          RoleName NVARCHAR(100) NOT NULL,
          NavigationPreferences NVARCHAR(MAX) NOT NULL,
          CreatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
          UpdatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
          CONSTRAINT UQ_RoleNavigationPreferences_RoleID UNIQUE (RoleID)
        );
      END
    `;
    
    await pool.request().query(createTableQuery);
    
    // Medical briefcase icon
    const medicalIcon = 'M20 7h-3V6a2 2 0 00-2-2H9a2 2 0 00-2 2v1H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 7h6V6H9v1zm3 3v6m-3-3h6';
    
    // Insert employee role with medical icon
    const employeePrefs = {
      primaryItems: [
        { id: 'home', name: 'Home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', href: '/', permission: 'dashboard.view' },
        { id: 'incidents', name: 'Incidents', icon: medicalIcon, href: '/incidents', permission: 'incidents.view', hasDropdown: true },
        { id: 'checklists', name: 'Checklists', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', href: '/checklists', permission: 'checklists.view', hasDropdown: true }
      ],
      maxPrimaryItems: 6
    };
    
    const insertQuery = `
      IF NOT EXISTS (SELECT * FROM dbo.RoleNavigationPreferences WHERE RoleID = 'employee')
      BEGIN
        INSERT INTO dbo.RoleNavigationPreferences (RoleID, RoleName, NavigationPreferences)
        VALUES ('employee', 'Employee', @preferences)
      END
      ELSE
      BEGIN
        UPDATE dbo.RoleNavigationPreferences 
        SET NavigationPreferences = @preferences, UpdatedDate = sysdatetimeoffset()
        WHERE RoleID = 'employee'
      END
    `;
    
    const request = pool.request();
    request.input('preferences', sql.NVarChar, JSON.stringify(employeePrefs));
    await request.query(insertQuery);
    
    return NextResponse.json({
      success: true,
      message: 'Navigation table setup complete with medical briefcase icon!'
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}