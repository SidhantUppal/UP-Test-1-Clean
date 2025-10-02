import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

// Database configuration - using SQL Authentication
const dbConfig: sql.config = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'V7-Dev',
  user: process.env.DB_USER || 'v7_app',
  password: process.env.DB_PASSWORD || 'V7App@2024!',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// GET - Fetch all available roles
export async function GET(request: NextRequest) {
  let pool: sql.ConnectionPool | null = null;
  
  try {
    // Connect to database
    pool = await sql.connect(dbConfig);
    
    const query = `
      SELECT 
        RoleID,
        RoleName,
        UpdatedDate
      FROM RoleNavigationPreferences
      ORDER BY RoleName
    `;
    
    const result = await pool.request().query(query);
    
    return NextResponse.json({
      success: true,
      data: result.recordset
    });
    
  } catch (error) {
    console.error('Error fetching roles:', error);
    
    // Return default roles if database fails
    return NextResponse.json({
      success: true,
      data: [
        { RoleID: 'admin', RoleName: 'Administrator' },
        { RoleID: 'manager', RoleName: 'Manager' },
        { RoleID: 'employee', RoleName: 'Employee' },
        { RoleID: 'contractor', RoleName: 'Contractor' },
        { RoleID: 'readonly', RoleName: 'Read Only' }
      ]
    });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}