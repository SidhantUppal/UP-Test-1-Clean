import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

// Database configuration for Azure SQL
const dbConfig = {
  server: process.env.DB_SERVER || 'YOUR_DATABASE_SERVER.database.windows.net',
  database: process.env.DB_NAME || 'V7-Dev',
  user: process.env.DB_USER || 'YOUR_DB_USER',
  password: process.env.DB_PASSWORD || 'YOUR_DB_PASSWORD',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    connectTimeout: 30000,
    requestTimeout: 30000
  }
};

export async function GET(request: NextRequest) {
  try {
    // Get userAreaId from headers or query params
    const userAreaId = request.headers.get('x-userarea-id') || '1';
    
    // Connect to database
    const pool = await sql.connect(dbConfig);
    
    // Query users from the V7.User table
    const result = await pool.request()
      .input('userAreaId', sql.Int, parseInt(userAreaId))
      .query(`
        SELECT 
          UserID,
          FullName,
          Email,
          MasterUserAreaID
        FROM [V7].[User]
        WHERE ArchivedDate IS NULL
        ORDER BY FullName
      `);
    
    // Close the connection
    await pool.close();
    
    // Format the response for dropdown usage
    const users = result.recordset.map(user => ({
      id: user.UserID,
      name: user.FullName,
      email: user.Email || '',
      userAreaId: user.MasterUserAreaID
    }));
    
    return NextResponse.json({
      success: true,
      data: users,
      total: users.length
    });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch users',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}