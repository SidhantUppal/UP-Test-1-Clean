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
    
    // Medical briefcase icon
    const medicalIcon = 'M20 7h-3V6a2 2 0 00-2-2H9a2 2 0 00-2 2v1H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 7h6V6H9v1zm3 3v6m-3-3h6';
    
    // Create user navigation preferences with the new medical icon
    const userPrefs = {
      primaryItems: [
        { id: 'home', name: 'Home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', href: '/', permission: 'dashboard.view' },
        { id: 'checklists', name: 'Checklists', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', href: '/checklists', permission: 'checklists.view', hasDropdown: true },
        { id: 'contractors', name: 'Contractors', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm8 6v-6M19 15l-3 3 3 3', href: '/contractors', permission: 'contractors.view', hasDropdown: true },
        { id: 'documents', name: 'Documents', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z', href: '/documents', permission: 'documents.view', hasDropdown: true },
        { id: 'permits', name: 'Permits', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', href: '/permits', permission: 'permits.view', hasDropdown: true },
        { id: 'incidents', name: 'Incidents', icon: medicalIcon, href: '/incidents', permission: 'incidents.view', hasDropdown: true },
        { id: 'risk-assessments', name: 'Risk Assessments', icon: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z', href: '/risk-assessments', permission: 'risk-assessments.view', hasDropdown: true },
        { id: 'e-learning', name: 'E-Learning', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z', href: '/e-learning', permission: 'elearning.view', hasDropdown: true }
      ],
      maxPrimaryItems: 8,
      lastUpdated: new Date().toISOString()
    };
    
    // First, ensure UserNavigationPreferences table exists
    const createUserTableQuery = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserNavigationPreferences' AND xtype='U')
      BEGIN
        CREATE TABLE dbo.UserNavigationPreferences (
          UserNavigationPreferencesID INT IDENTITY(1,1) PRIMARY KEY,
          UserID INT NOT NULL,
          NavigationPreferences NVARCHAR(MAX) NOT NULL,
          CreatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
          UpdatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
          CONSTRAINT UQ_UserNavigationPreferences_UserID UNIQUE (UserID)
        );
      END
    `;
    
    await pool.request().query(createUserTableQuery);
    
    // Insert or update user preferences for user ID 1
    const upsertQuery = `
      IF EXISTS (SELECT * FROM dbo.UserNavigationPreferences WHERE UserID = 1)
      BEGIN
        UPDATE dbo.UserNavigationPreferences 
        SET NavigationPreferences = @preferences, UpdatedDate = sysdatetimeoffset()
        WHERE UserID = 1
      END
      ELSE
      BEGIN
        INSERT INTO dbo.UserNavigationPreferences (UserID, NavigationPreferences, CreatedDate, UpdatedDate)
        VALUES (1, @preferences, sysdatetimeoffset(), sysdatetimeoffset())
      END
    `;
    
    const request = pool.request();
    request.input('preferences', sql.NVarChar, JSON.stringify(userPrefs));
    await request.query(upsertQuery);
    
    return NextResponse.json({
      success: true,
      message: 'User navigation preferences updated with medical briefcase icon!',
      data: userPrefs
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