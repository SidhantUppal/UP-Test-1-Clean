import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

// Database configuration - using SQL Authentication for Azure
const dbConfig: sql.config = {
  server: process.env.DB_HOST || 'YOUR_DATABASE_SERVER.database.windows.net',
  database: process.env.DB_NAME || 'V7-Dev',
  user: process.env.DB_USER || 'YOUR_DB_USER',
  password: process.env.DB_PASSWORD || 'YOUR_DB_PASSWORD',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true' || true, // Set to true for Azure
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' || false, // For Azure SQL Server
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

// GET - Fetch user's navigation preferences
export async function GET(request: NextRequest) {
  let pool: sql.ConnectionPool | null = null;
  
  try {
    // For now, we'll use a default user ID of 1
    // In a real app, this would come from the user session
    const userId = 1;
    
    // Connect to database
    pool = await sql.connect(dbConfig);
    
    const poolRequest = pool.request();
    poolRequest.input('userId', sql.Int, userId);
    
    const query = `
      SELECT 
        NavigationPreferences
      FROM UserNavigationPreferences
      WHERE UserID = @userId
    `;
    
    const result = await poolRequest.query(query);
    
    if (result.recordset.length > 0) {
      const navigationPreferencesData = result.recordset[0].NavigationPreferences;
      let preferences;
      
      try {
        // Safely parse JSON with null/empty string handling
        if (navigationPreferencesData && navigationPreferencesData.trim()) {
          preferences = JSON.parse(navigationPreferencesData);
        } else {
          preferences = null;
        }
      } catch (parseError) {
        console.error('Error parsing user navigation preferences JSON:', parseError);
        preferences = null;
      }
      
      if (preferences) {
        return NextResponse.json({
          success: true,
          data: preferences
        });
      }
      // If preferences is null or couldn't be parsed, fall through to role defaults
    } else {
      // No user-specific preferences found, try to get role defaults
      // For now, we'll use a default role of 'employee' 
      // In a real app, this would come from the user's role in the session
      const userRole = 'employee'; // This should come from user session/database
      
      try {
        const roleQuery = `
          SELECT NavigationPreferences 
          FROM RoleNavigationPreferences 
          WHERE RoleID = @userRole
        `;
        
        const roleRequest = pool.request();
        roleRequest.input('userRole', sql.NVarChar, userRole);
        const roleResult = await roleRequest.query(roleQuery);
        
        if (roleResult.recordset.length > 0) {
          const roleNavigationPreferencesData = roleResult.recordset[0].NavigationPreferences;
          let rolePreferences;
          
          try {
            // Safely parse JSON with null/empty string handling
            if (roleNavigationPreferencesData && roleNavigationPreferencesData.trim()) {
              rolePreferences = JSON.parse(roleNavigationPreferencesData);
            } else {
              rolePreferences = null;
            }
          } catch (parseError) {
            console.error('Error parsing role navigation preferences JSON:', parseError);
            rolePreferences = null;
          }
          
          if (rolePreferences) {
            return NextResponse.json({
              success: true,
              data: rolePreferences,
              source: 'role-default'
            });
          }
        }
      } catch (roleError) {
        console.error('Error fetching role defaults:', roleError);
      }
      
      // Return system default preferences if no role defaults found
      return NextResponse.json({
        success: true,
        data: {
          primaryItems: [],
          maxPrimaryItems: 8
        },
        source: 'system-default'
      });
    }
    
  } catch (error) {
    console.error('Error fetching navigation preferences:', error);
    
    // Return default preferences if database fails
    return NextResponse.json({
      success: true,
      data: {
        primaryItems: [],
        maxPrimaryItems: 8
      }
    });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// POST - Save user's navigation preferences
export async function POST(request: NextRequest) {
  let pool: sql.ConnectionPool | null = null;
  
  try {
    const body = await request.json();
    const { primaryItems, maxPrimaryItems } = body;
    
    if (!primaryItems || !maxPrimaryItems) {
      return NextResponse.json(
        { success: false, error: 'Invalid preferences data' },
        { status: 400 }
      );
    }
    
    // For now, we'll use a default user ID of 1
    // In a real app, this would come from the user session
    const userId = 1;
    
    const preferences = {
      primaryItems,
      maxPrimaryItems,
      lastUpdated: new Date().toISOString()
    };
    
    // Connect to database
    pool = await sql.connect(dbConfig);
    
    const poolRequest = pool.request();
    poolRequest.input('userId', sql.Int, userId);
    poolRequest.input('preferences', sql.NVarChar, JSON.stringify(preferences));
    
    // Check if user preferences already exist
    const checkQuery = `
      SELECT UserID FROM UserNavigationPreferences WHERE UserID = @userId
    `;
    
    const checkResult = await poolRequest.query(checkQuery);
    
    let query: string;
    if (checkResult.recordset.length > 0) {
      // Update existing preferences
      query = `
        UPDATE UserNavigationPreferences 
        SET NavigationPreferences = @preferences, UpdatedDate = sysdatetimeoffset()
        WHERE UserID = @userId
      `;
    } else {
      // Insert new preferences
      query = `
        INSERT INTO UserNavigationPreferences (UserID, NavigationPreferences, CreatedDate, UpdatedDate)
        VALUES (@userId, @preferences, sysdatetimeoffset(), sysdatetimeoffset())
      `;
    }
    
    await poolRequest.query(query);
    
    return NextResponse.json({
      success: true,
      message: 'Navigation preferences saved successfully'
    });
    
  } catch (error) {
    console.error('Error saving navigation preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save preferences' },
      { status: 500 }
    );
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}