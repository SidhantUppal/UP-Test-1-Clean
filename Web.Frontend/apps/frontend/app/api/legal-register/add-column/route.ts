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

// POST - Add LastViewedDate column to LegalRegister table
export async function POST(request: NextRequest) {
  let pool: sql.ConnectionPool | null = null;
  
  try {
    console.log('🔄 Starting LastViewedDate column addition...');
    
    // Connect to database
    pool = await sql.connect(dbConfig);
    
    // Check if LastViewedDate column exists
    const columnCheckRequest = pool.request();
    const columnCheck = await columnCheckRequest.query(`
      SELECT COUNT(*) as ColumnExists
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'dbo'
      AND TABLE_NAME = 'LegalRegister' 
      AND COLUMN_NAME = 'LastViewedDate'
    `);
    
    if (columnCheck.recordset[0].ColumnExists === 0) {
      console.log('🔄 Adding LastViewedDate column...');
      const alterRequest = pool.request();
      await alterRequest.query(`
        ALTER TABLE [dbo].[LegalRegister] 
        ADD LastViewedDate DATETIMEOFFSET NULL
      `);
      
      // Create index for performance
      const indexRequest = pool.request();
      await indexRequest.query(`
        CREATE NONCLUSTERED INDEX [IX_LegalRegister_LastViewedDate] 
        ON [dbo].[LegalRegister]([LastViewedDate])
      `);
      
      console.log('✅ LastViewedDate column and index added successfully!');
      
      return NextResponse.json({
        success: true,
        message: 'LastViewedDate column added successfully',
        action: 'column_added'
      });
    } else {
      console.log('ℹ️ LastViewedDate column already exists');
      return NextResponse.json({
        success: true,
        message: 'LastViewedDate column already exists',
        action: 'already_exists'
      });
    }
    
  } catch (error) {
    console.error('❌ Failed to add LastViewedDate column:', error.message);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to add LastViewedDate column: ' + error.message
    }, { status: 500 });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}