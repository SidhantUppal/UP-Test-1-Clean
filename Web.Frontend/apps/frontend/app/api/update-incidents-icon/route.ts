import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

// Database configuration - using SQL Authentication for Azure
const dbConfig: sql.config = {
  server: process.env.DB_HOST || 'YOUR_DATABASE_SERVER.database.windows.net',
  database: process.env.DB_NAME || 'V7-Dev',
  user: process.env.DB_USER || 'YOUR_DB_USER',
  password: process.env.DB_PASSWORD || 'YOUR_DB_PASSWORD',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true' || true,
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' || false,
    enableArithAbort: true,
    connectTimeout: 30000,
    requestTimeout: 30000
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

export async function POST(request: NextRequest) {
  let pool: sql.ConnectionPool | null = null;
  
  try {
    // New medical briefcase icon path
    const newIcon = 'M20 7h-3V6a2 2 0 00-2-2H9a2 2 0 00-2 2v1H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 7h6V6H9v1zm3 3v6m-3-3h6';
    const oldIcon = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z';
    
    // Connect to database
    pool = await sql.connect(dbConfig);
    
    const roles = ['admin', 'manager', 'employee', 'contractor', 'readonly'];
    const results = [];
    
    for (const roleId of roles) {
      const poolRequest = pool.request();
      poolRequest.input('roleId', sql.NVarChar, roleId);
      poolRequest.input('oldIcon', sql.NVarChar, oldIcon);
      poolRequest.input('newIcon', sql.NVarChar, newIcon);
      
      const updateQuery = `
        UPDATE dbo.RoleNavigationPreferences 
        SET NavigationPreferences = REPLACE(NavigationPreferences, @oldIcon, @newIcon),
            UpdatedDate = sysdatetimeoffset()
        WHERE RoleID = @roleId
      `;
      
      const result = await poolRequest.query(updateQuery);
      results.push({
        roleId: roleId,
        rowsAffected: result.rowsAffected[0]
      });
    }
    
    // Verify the updates
    const verifyRequest = pool.request();
    verifyRequest.input('newIconPartial', sql.NVarChar, 'M20 7h-3V6a2 2 0');
    
    const verifyQuery = `
      SELECT RoleID, RoleName, UpdatedDate 
      FROM dbo.RoleNavigationPreferences 
      WHERE NavigationPreferences LIKE '%' + @newIconPartial + '%'
    `;
    
    const verifyResult = await verifyRequest.query(verifyQuery);
    
    return NextResponse.json({
      success: true,
      message: 'Incidents icon updated successfully in all role navigation preferences!',
      results: results,
      updatedRoles: verifyResult.recordset
    });
    
  } catch (error) {
    console.error('Error updating incidents icon:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update incidents icon', details: error.message },
      { status: 500 }
    );
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}