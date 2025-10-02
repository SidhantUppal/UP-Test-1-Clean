import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

// Database configuration - using SQL Authentication
const dbConfig: sql.config = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'V7-Dev',
  user: process.env.DB_USER || 'v7_app',
  password: process.env.DB_PASSWORD || 'V7App@2024!',
  options: {
    encrypt: false, // Set to true for Azure
    trustServerCertificate: true, // For local SQL Server
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// GET - Fetch employees for dropdown
export async function GET(request: NextRequest) {
  let pool: sql.ConnectionPool | null = null;
  
  // Extract search parameters outside try block so they're available in catch
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') || '';
  const userAreaId = searchParams.get('userAreaId');
  
  try {
    
    // Connect to database
    pool = await sql.connect(dbConfig);
    
    let query = `
      SELECT 
        e.EmployeeID,
        e.FirstName,
        e.LastName,
        e.FirstName + ' ' + e.LastName as FullName,
        e.Email,
        e.JobTitle,
        e.Department,
        e.IsActive
      FROM [V7].[Employee] e
      WHERE e.IsActive = 1
    `;
    
    const poolRequest = pool.request();
    
    // Add UserAreaID filter if provided
    if (userAreaId) {
      query += ` AND e.UserAreaID = @userAreaId`;
      poolRequest.input('userAreaId', sql.Int, parseInt(userAreaId));
    }
    
    // Add search filter if provided
    if (search) {
      query += ` AND (
        e.FirstName LIKE @search 
        OR e.LastName LIKE @search 
        OR e.Email LIKE @search
        OR e.JobTitle LIKE @search
        OR e.Department LIKE @search
      )`;
      poolRequest.input('search', sql.VarChar, `%${search}%`);
    }
    
    query += ` ORDER BY e.FirstName, e.LastName`;
    
    const result = await poolRequest.query(query);
    
    return NextResponse.json({
      success: true,
      data: result.recordset,
      total: result.recordset.length
    });
    
  } catch (error) {
    console.error('Database connection failed:', error);
    
    // Return demo employee data if database fails
    const demoEmployees = [
      { EmployeeID: 1, FirstName: 'John', LastName: 'Smith', FullName: 'John Smith', Email: 'john.smith@example.com', JobTitle: 'Safety Manager', Department: 'Operations', IsActive: true },
      { EmployeeID: 2, FirstName: 'Sarah', LastName: 'Johnson', FullName: 'Sarah Johnson', Email: 'sarah.johnson@example.com', JobTitle: 'Compliance Officer', Department: 'Legal', IsActive: true },
      { EmployeeID: 3, FirstName: 'Michael', LastName: 'Williams', FullName: 'Michael Williams', Email: 'michael.williams@example.com', JobTitle: 'Risk Analyst', Department: 'Risk Management', IsActive: true },
      { EmployeeID: 4, FirstName: 'Emma', LastName: 'Brown', FullName: 'Emma Brown', Email: 'emma.brown@example.com', JobTitle: 'Environmental Officer', Department: 'HSE', IsActive: true },
      { EmployeeID: 5, FirstName: 'David', LastName: 'Jones', FullName: 'David Jones', Email: 'david.jones@example.com', JobTitle: 'Operations Manager', Department: 'Operations', IsActive: true }
    ];
    
    // Filter demo data by search if provided
    let filteredEmployees = demoEmployees;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredEmployees = demoEmployees.filter(emp => 
        emp.FirstName.toLowerCase().includes(searchLower) ||
        emp.LastName.toLowerCase().includes(searchLower) ||
        emp.Email.toLowerCase().includes(searchLower) ||
        emp.JobTitle.toLowerCase().includes(searchLower) ||
        emp.Department.toLowerCase().includes(searchLower)
      );
    }
    
    return NextResponse.json({
      success: true,
      data: filteredEmployees,
      total: filteredEmployees.length,
      database: 'disconnected',
      message: 'Using demo data'
    });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}