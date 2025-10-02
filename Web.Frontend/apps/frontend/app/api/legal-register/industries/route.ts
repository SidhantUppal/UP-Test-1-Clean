import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

// Database configuration - using SQL Authentication for Azure
const dbConfig: sql.config = {
  server: process.env.DB_SERVER || 'YOUR_DATABASE_SERVER.database.windows.net',
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

export async function GET(request: NextRequest) {
  let pool: sql.ConnectionPool | null = null;
  
  try {
    // Connect to database
    pool = await sql.connect(dbConfig);
    
    // Get distinct industries with counts
    const result = await pool.request().query(`
      SELECT 
        IndustryName as name,
        COUNT(*) as count,
        ROW_NUMBER() OVER (ORDER BY IndustryName) as id
      FROM [dbo].[LegalRegister]
      WHERE IndustryName IS NOT NULL AND IndustryName != ''
      GROUP BY IndustryName
      ORDER BY IndustryName
    `);

    const industries = result.recordset.map((row, index) => ({
      id: index + 1,
      name: row.name,
      count: row.count
    }));

    return NextResponse.json({
      success: true,
      data: industries
    });
    
  } catch (error) {
    console.error('Database operation failed:', error.message);
    
    // Fallback to mock data if database fails
    const mockIndustries = [
      { id: 1, name: 'All Industries', count: 0 },
      { id: 2, name: 'Technology', count: 0 },
      { id: 3, name: 'Manufacturing', count: 0 },
      { id: 4, name: 'Retail', count: 0 },
      { id: 5, name: 'Healthcare', count: 0 },
      { id: 6, name: 'Financial Services', count: 0 },
      { id: 7, name: 'Construction', count: 0 },
      { id: 8, name: 'Education', count: 0 },
      { id: 9, name: 'Hospitality', count: 0 },
      { id: 10, name: 'Transportation', count: 0 }
    ];

    return NextResponse.json({
      success: true,
      data: mockIndustries,
      message: 'Using mock data - database connection failed'
    });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}