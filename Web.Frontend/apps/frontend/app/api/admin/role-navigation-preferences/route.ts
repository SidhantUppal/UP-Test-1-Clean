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

// GET - Fetch role's navigation preferences
export async function GET(request: NextRequest) {
  let pool: sql.ConnectionPool | null = null;
  
  try {
    const { searchParams } = new URL(request.url);
    const roleId = searchParams.get('roleId');
    
    if (!roleId) {
      return NextResponse.json(
        { success: false, error: 'Role ID is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    pool = await sql.connect(dbConfig);
    
    const poolRequest = pool.request();
    poolRequest.input('roleId', sql.NVarChar, roleId);
    
    const query = `
      SELECT 
        RoleID,
        RoleName,
        NavigationPreferences,
        UpdatedDate
      FROM RoleNavigationPreferences
      WHERE RoleID = @roleId
    `;
    
    const result = await poolRequest.query(query);
    
    if (result.recordset.length > 0) {
      const row = result.recordset[0];
      const preferences = JSON.parse(row.NavigationPreferences);
      return NextResponse.json({
        success: true,
        data: {
          roleId: row.RoleID,
          roleName: row.RoleName,
          ...preferences
        }
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }
    
  } catch (error) {
    console.error('Error fetching role navigation preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch role preferences' },
      { status: 500 }
    );
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// POST - Save role's navigation preferences
export async function POST(request: NextRequest) {
  let pool: sql.ConnectionPool | null = null;
  
  try {
    const body = await request.json();
    const { roleId, roleName, primaryItems, maxPrimaryItems } = body;
    
    if (!roleId || !roleName || !primaryItems || !maxPrimaryItems) {
      return NextResponse.json(
        { success: false, error: 'Invalid role preferences data' },
        { status: 400 }
      );
    }
    
    const preferences = {
      primaryItems,
      maxPrimaryItems,
      lastUpdated: new Date().toISOString()
    };
    
    // Connect to database
    pool = await sql.connect(dbConfig);
    
    const poolRequest = pool.request();
    poolRequest.input('roleId', sql.NVarChar, roleId);
    poolRequest.input('roleName', sql.NVarChar, roleName);
    poolRequest.input('preferences', sql.NVarChar, JSON.stringify(preferences));
    
    // Check if role preferences already exist
    const checkQuery = `
      SELECT RoleID FROM RoleNavigationPreferences WHERE RoleID = @roleId
    `;
    
    const checkResult = await poolRequest.query(checkQuery);
    
    let query: string;
    if (checkResult.recordset.length > 0) {
      // Update existing preferences
      query = `
        UPDATE RoleNavigationPreferences 
        SET RoleName = @roleName, NavigationPreferences = @preferences, UpdatedDate = sysdatetimeoffset()
        WHERE RoleID = @roleId
      `;
    } else {
      // Insert new preferences
      query = `
        INSERT INTO RoleNavigationPreferences (RoleID, RoleName, NavigationPreferences, CreatedDate, UpdatedDate)
        VALUES (@roleId, @roleName, @preferences, sysdatetimeoffset(), sysdatetimeoffset())
      `;
    }
    
    await poolRequest.query(query);
    
    return NextResponse.json({
      success: true,
      message: 'Role navigation preferences saved successfully'
    });
    
  } catch (error) {
    console.error('Error saving role navigation preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save role preferences' },
      { status: 500 }
    );
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// DELETE - Delete role's navigation preferences
export async function DELETE(request: NextRequest) {
  let pool: sql.ConnectionPool | null = null;
  
  try {
    const { searchParams } = new URL(request.url);
    const roleId = searchParams.get('roleId');
    
    if (!roleId) {
      return NextResponse.json(
        { success: false, error: 'Role ID is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    pool = await sql.connect(dbConfig);
    
    const poolRequest = pool.request();
    poolRequest.input('roleId', sql.NVarChar, roleId);
    
    const query = `
      DELETE FROM RoleNavigationPreferences 
      WHERE RoleID = @roleId
    `;
    
    const result = await poolRequest.query(query);
    
    if (result.rowsAffected[0] > 0) {
      return NextResponse.json({
        success: true,
        message: 'Role navigation preferences deleted successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }
    
  } catch (error) {
    console.error('Error deleting role navigation preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete role preferences' },
      { status: 500 }
    );
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}