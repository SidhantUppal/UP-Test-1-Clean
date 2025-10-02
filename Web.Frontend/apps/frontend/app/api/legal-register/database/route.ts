import { NextRequest, NextResponse } from 'next/server';
import * as sql from 'mssql';

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
    min: 2,
    idleTimeoutMillis: 60000,
    acquireTimeoutMillis: 15000
  }
};

// Global connection pool with better error handling
let globalPool: sql.ConnectionPool | null = null;
let isConnecting = false;

async function getConnection() {
  // If pool exists and is healthy, return it
  if (globalPool && globalPool.connected) {
    return globalPool;
  }

  // If already connecting, wait a bit and retry
  if (isConnecting) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getConnection();
  }

  try {
    isConnecting = true;
    
    // Clean up any existing pool
    if (globalPool) {
      try {
        await globalPool.close();
      } catch (e) {
        // Ignore close errors
      }
      globalPool = null;
    }

    // Create new pool
    globalPool = new sql.ConnectionPool(dbConfig);
    
    globalPool.on('error', err => {
      console.error('Database pool error:', err);
      globalPool = null;
    });
    
    await globalPool.connect();
    return globalPool;
  } finally {
    isConnecting = false;
  }
}

// GET - Fetch legal register data from database
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const industryName = searchParams.get('industryName') || '';
    const complianceStatus = searchParams.get('complianceStatus') || '';
    const riskLevel = searchParams.get('riskLevel') || '';
    const limit = parseInt(searchParams.get('limit') || '5000');

    // Get database connection
    const pool = await getConnection();
    
    // Check which columns exist
    let hasResponsiblePersonColumn = false;
    let hasOrgGroupColumn = false;
    let hasLocationColumn = false;
    let hasEntryTypeColumn = false;
    let hasUserDocumentTypeColumn = false;
    let employeeNameColumns: { firstName: string | null, lastName: string | null } = { firstName: null, lastName: null };
    
    try {
      const columnCheck = await pool.request().query(`
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'LegalRegister' 
        AND TABLE_SCHEMA = 'dbo' 
        AND COLUMN_NAME IN ('ResponsiblePersonId', 'OrgGroupID', 'LocationID', 'EntryType', 'UserDocumentType')
      `);
      
      const existingColumns = columnCheck.recordset.map((row: any) => row.COLUMN_NAME);
      hasResponsiblePersonColumn = existingColumns.includes('ResponsiblePersonId');
      hasOrgGroupColumn = existingColumns.includes('OrgGroupID');
      hasLocationColumn = existingColumns.includes('LocationID');
      hasEntryTypeColumn = existingColumns.includes('EntryType');
      hasUserDocumentTypeColumn = existingColumns.includes('UserDocumentType');
      
      // Check Employee table columns if ResponsiblePersonId exists
      if (hasResponsiblePersonColumn) {
        try {
          const employeeColumnCheck = await pool.request().query(`
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Employee' 
            AND TABLE_SCHEMA = 'V7' 
            AND COLUMN_NAME IN ('FirstName', 'LastName', 'First_Name', 'Last_Name', 'FullName', 'Full_Name', 'Name')
          `);
          
          const empColumns = employeeColumnCheck.recordset.map((row: any) => row.COLUMN_NAME);
          if (empColumns.includes('FirstName')) employeeNameColumns.firstName = 'FirstName';
          else if (empColumns.includes('First_Name')) employeeNameColumns.firstName = 'First_Name';
          
          if (empColumns.includes('LastName')) employeeNameColumns.lastName = 'LastName';
          else if (empColumns.includes('Last_Name')) employeeNameColumns.lastName = 'Last_Name';
          
        } catch (empColumnError: unknown) {
          const errorMessage = empColumnError instanceof Error ? empColumnError.message : 'Unknown error';
          console.log('Could not check Employee table columns:', errorMessage);
          employeeNameColumns = { firstName: null, lastName: null };
        }
      }

    } catch (columnError: unknown) {
      const errorMessage = columnError instanceof Error ? columnError.message : 'Unknown error';
      console.log('Could not check for columns:', errorMessage);
    }

    // Build query based on column availability
    let query = `
      SELECT TOP ${limit}
        lr.LegalRegisterID,
        lr.Name,
        lr.Link,
        lr.LatestUpdate,
        lr.LastViewedDate,
        CASE 
          WHEN DATEDIFF(day, lr.LatestUpdate, sysdatetimeoffset()) <= 7 THEN 1 
          ELSE 0 
        END as IsRecent,
        lr.RiskLevel,
        lr.ComplianceStatus,
        lr.Notes,
        lr.IndustryName,
        lr.LegislationType,
        ${hasEntryTypeColumn ? 'lr.EntryType' : "'Government' as EntryType"},
        ${hasUserDocumentTypeColumn ? 'lr.UserDocumentType' : 'NULL as UserDocumentType'},
        ${hasResponsiblePersonColumn ? 'lr.ResponsiblePersonId' : 'NULL as ResponsiblePersonId'},
        ${hasResponsiblePersonColumn && employeeNameColumns.firstName && employeeNameColumns.lastName ? 
          `e.${employeeNameColumns.firstName} + ' ' + e.${employeeNameColumns.lastName}` : 
          hasResponsiblePersonColumn && employeeNameColumns.firstName ? `e.${employeeNameColumns.firstName}` : 'NULL'} as ResponsiblePersonName,
        ${hasOrgGroupColumn ? 'lr.OrgGroupID' : 'NULL as OrgGroupID'},
        ${hasOrgGroupColumn ? 'og.Title' : 'NULL'} as OrgGroupName,
        ${hasLocationColumn ? 'lr.LocationID' : 'NULL as LocationID'},
        ${hasLocationColumn ? 'l.Title' : 'NULL'} as LocationName
      FROM [dbo].[LegalRegister] lr
      ${hasResponsiblePersonColumn ? 'LEFT JOIN [V7].[Employee] e ON lr.ResponsiblePersonId = e.EmployeeID' : ''}
      ${hasOrgGroupColumn ? 'LEFT JOIN [V7].[OrgGroup] og ON lr.OrgGroupID = og.OrgGroupID' : ''}
      ${hasLocationColumn ? 'LEFT JOIN [V7].[Location] l ON lr.LocationID = l.LocationID' : ''}
      WHERE 1=1
    `;
    
    const poolRequest = pool.request();
    
    if (search) {
      query += ` AND (lr.Name LIKE @search OR lr.LegislationType LIKE @search OR lr.Notes LIKE @search)`;
      poolRequest.input('search', sql.VarChar, `%${search}%`);
    }
    
    if (industryName && industryName !== 'All Industries') {
      query += ` AND (IndustryName = @industryName OR IndustryName = 'All Industries')`;
      poolRequest.input('industryName', sql.VarChar, industryName);
    }
    
    if (complianceStatus) {
      query += ` AND ComplianceStatus = @complianceStatus`;
      poolRequest.input('complianceStatus', sql.VarChar, complianceStatus);
    }
    
    if (riskLevel) {
      query += ` AND RiskLevel = @riskLevel`;
      poolRequest.input('riskLevel', sql.VarChar, riskLevel);
    }
    
    query += ` ORDER BY LatestUpdate DESC`;
    
    const result = await poolRequest.query(query);
    
    return NextResponse.json({
      success: true,
      data: result.recordset,
      total: result.recordset.length,
      database: 'connected'
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Database connection failed:', errorMessage);

    // Reset global pool on error
    if (globalPool) {
      globalPool = null;
    }

    return NextResponse.json({
      success: false,
      error: 'Database connection failed: ' + errorMessage,
      database: 'disconnected'
    }, { status: 500 });
  }
}

// PUT - Update legal register entry in database
export async function PUT(request: NextRequest) {
  // Declare id outside try block so it's accessible in catch
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  console.log('PUT request received for ID:', id);
  
  if (!id) {
    console.error('No ID provided in PUT request');
    return NextResponse.json(
      { success: false, error: 'ID is required' },
      { status: 400 }
    );
  }
  
  let body;
  try {
    body = await request.json();
    console.log('Request body:', body);
  } catch (jsonError: unknown) {
    const errorMessage = jsonError instanceof Error ? jsonError.message : 'JSON parsing failed';
    console.error('Failed to parse JSON body:', errorMessage);
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
  
  try {
    // Get database connection
    const pool = await getConnection();
    
    // Check which columns exist
    let hasResponsiblePersonColumn = false;
    let hasOrgGroupColumn = false;
    let hasLocationColumn = false;
    let hasEntryTypeColumn = false;
    let hasUserDocumentTypeColumn = false;
    
    try {
      const columnCheck = await pool.request().query(`
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'LegalRegister' 
        AND TABLE_SCHEMA = 'dbo' 
        AND COLUMN_NAME IN ('ResponsiblePersonId', 'OrgGroupID', 'LocationID', 'EntryType', 'UserDocumentType')
      `);
      
      const existingColumns = columnCheck.recordset.map((row: any) => row.COLUMN_NAME);
      hasResponsiblePersonColumn = existingColumns.includes('ResponsiblePersonId');
      hasOrgGroupColumn = existingColumns.includes('OrgGroupID');
      hasLocationColumn = existingColumns.includes('LocationID');
      hasEntryTypeColumn = existingColumns.includes('EntryType');
      hasUserDocumentTypeColumn = existingColumns.includes('UserDocumentType');

    } catch (columnError: unknown) {
      const errorMessage = columnError instanceof Error ? columnError.message : 'Unknown error';
      console.log('Could not check for columns:', errorMessage);
    }

    const poolRequest = pool.request();
    poolRequest.input('id', sql.Int, parseInt(id));
    poolRequest.input('complianceStatus', sql.VarChar, body.complianceStatus);
    poolRequest.input('notes', sql.VarChar, body.notes || '');
    poolRequest.input('riskLevel', sql.VarChar, body.riskLevel);
    poolRequest.input('latestUpdate', sql.DateTime, body.latestUpdate ? new Date(body.latestUpdate) : new Date());
    
    // Handle LastViewedDate for NEW badge functionality
    if (body.lastViewedDate) {
      poolRequest.input('lastViewedDate', sql.DateTime, new Date(body.lastViewedDate));
    }
    
    // Add inputs for columns that exist and have values provided
    if (hasResponsiblePersonColumn && body.responsiblePersonId !== undefined) {
      poolRequest.input('responsiblePersonId', sql.Int, body.responsiblePersonId || null);
    }
    if (hasOrgGroupColumn && body.orgGroupId !== undefined) {
      poolRequest.input('orgGroupId', sql.Int, body.orgGroupId || null);
    }
    if (hasLocationColumn && body.locationId !== undefined) {
      poolRequest.input('locationId', sql.Int, body.locationId || null);
    }
    if (hasEntryTypeColumn && body.entryType !== undefined) {
      poolRequest.input('entryType', sql.VarChar, body.entryType);
    }
    if (hasUserDocumentTypeColumn && body.userDocumentType !== undefined) {
      poolRequest.input('userDocumentType', sql.VarChar, body.userDocumentType || null);
    }
    
    // Build update statement based on available columns
    let updateParts = [
      'ComplianceStatus = @complianceStatus',
      'Notes = @notes',
      'RiskLevel = @riskLevel',
      'LatestUpdate = @latestUpdate'
    ];
    
    // Add LastViewedDate if provided (for NEW badge functionality)
    if (body.lastViewedDate) {
      updateParts.push('LastViewedDate = @lastViewedDate');
    }
    
    if (hasResponsiblePersonColumn && body.responsiblePersonId !== undefined) {
      updateParts.push('ResponsiblePersonId = @responsiblePersonId');
    }
    if (hasOrgGroupColumn && body.orgGroupId !== undefined) {
      updateParts.push('OrgGroupID = @orgGroupId');
    }
    if (hasLocationColumn && body.locationId !== undefined) {
      updateParts.push('LocationID = @locationId');
    }
    if (hasEntryTypeColumn && body.entryType !== undefined) {
      updateParts.push('EntryType = @entryType');
    }
    if (hasUserDocumentTypeColumn && body.userDocumentType !== undefined) {
      updateParts.push('UserDocumentType = @userDocumentType');
    }
    
    const query = `
      UPDATE [dbo].[LegalRegister]
      SET ${updateParts.join(', ')}
      WHERE LegalRegisterID = @id
    `;
    
    const result = await poolRequest.query(query);
    
    if (result.rowsAffected[0] > 0) {
      return NextResponse.json({
        success: true,
        message: 'Legal register entry updated successfully',
        database: 'connected'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Entry not found' },
        { status: 404 }
      );
    }
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Database operation failed:', errorMessage);

    // Reset global pool on error
    if (globalPool) {
      globalPool = null;
    }

    return NextResponse.json({
      success: false,
      error: 'Database operation failed: ' + errorMessage,
      database: 'disconnected'
    }, { status: 500 });
  }
}

// POST - Create new legal register entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('POST body received:', JSON.stringify(body));
    
    // Get database connection
    const pool = await getConnection();
    
    // Check which columns exist
    let hasResponsiblePersonColumn = false;
    let hasOrgGroupColumn = false;
    let hasLocationColumn = false;
    let hasEntryTypeColumn = false;
    let hasUserDocumentTypeColumn = false;
    
    try {
      const columnCheck = await pool.request().query(`
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'LegalRegister' 
        AND TABLE_SCHEMA = 'dbo' 
        AND COLUMN_NAME IN ('ResponsiblePersonId', 'OrgGroupID', 'LocationID', 'EntryType', 'UserDocumentType')
      `);
      
      const existingColumns = columnCheck.recordset.map((row: any) => row.COLUMN_NAME);
      hasResponsiblePersonColumn = existingColumns.includes('ResponsiblePersonId');
      hasOrgGroupColumn = existingColumns.includes('OrgGroupID');
      hasLocationColumn = existingColumns.includes('LocationID');
      hasEntryTypeColumn = existingColumns.includes('EntryType');
      hasUserDocumentTypeColumn = existingColumns.includes('UserDocumentType');

    } catch (columnError: unknown) {
      const errorMessage = columnError instanceof Error ? columnError.message : 'Unknown error';
      console.log('Could not check for columns:', errorMessage);
    }
    
    const poolRequest = pool.request();
    poolRequest.input('name', sql.VarChar, body.Name || body.name);
    poolRequest.input('link', sql.VarChar, body.Link || body.link || '');
    poolRequest.input('industryName', sql.VarChar, body.IndustryName || body.industryName || 'All Industries');
    poolRequest.input('riskLevel', sql.VarChar, body.RiskLevel || body.riskLevel || 'Medium');
    poolRequest.input('complianceStatus', sql.VarChar, body.ComplianceStatus || body.complianceStatus || 'Under Review');
    poolRequest.input('notes', sql.VarChar, body.Notes || body.notes || '');
    poolRequest.input('legislationType', sql.VarChar, body.LegislationType || body.legislationType || 'General');
    
    // Add inputs for columns that exist
    if (hasResponsiblePersonColumn && body.responsiblePersonId !== undefined) {
      poolRequest.input('responsiblePersonId', sql.Int, body.responsiblePersonId || null);
    }
    if (hasOrgGroupColumn && body.orgGroupId !== undefined) {
      poolRequest.input('orgGroupId', sql.Int, body.orgGroupId || null);
    }
    if (hasLocationColumn && body.locationId !== undefined) {
      poolRequest.input('locationId', sql.Int, body.locationId || null);
    }
    if (hasEntryTypeColumn && body.entryType !== undefined) {
      poolRequest.input('entryType', sql.VarChar, body.entryType || 'Government');
    }
    if (hasUserDocumentTypeColumn && body.userDocumentType !== undefined) {
      poolRequest.input('userDocumentType', sql.VarChar, body.userDocumentType || null);
    }
    
    // Build column lists based on available columns
    let columns = ['Name', 'Link', 'IndustryName', 'RiskLevel', 'ComplianceStatus', 'Notes', 'LegislationType'];
    let values = ['@name', '@link', '@industryName', '@riskLevel', '@complianceStatus', '@notes', '@legislationType'];
    
    if (hasResponsiblePersonColumn && body.responsiblePersonId !== undefined) {
      columns.push('ResponsiblePersonId');
      values.push('@responsiblePersonId');
    }
    if (hasOrgGroupColumn && body.orgGroupId !== undefined) {
      columns.push('OrgGroupID');
      values.push('@orgGroupId');
    }
    if (hasLocationColumn && body.locationId !== undefined) {
      columns.push('LocationID');
      values.push('@locationId');
    }
    if (hasEntryTypeColumn && body.entryType !== undefined) {
      columns.push('EntryType');
      values.push('@entryType');
    }
    if (hasUserDocumentTypeColumn && body.userDocumentType !== undefined) {
      columns.push('UserDocumentType');
      values.push('@userDocumentType');
    }
    
    columns.push('LatestUpdate');
    values.push('sysdatetimeoffset()');
    
    const query = `
      INSERT INTO [dbo].[LegalRegister] (${columns.join(', ')})
      VALUES (${values.join(', ')});
      SELECT SCOPE_IDENTITY() as LegalRegisterID;
    `;
    
    const result = await poolRequest.query(query);
    const newId = result.recordset[0].LegalRegisterID;
    
    return NextResponse.json({
      success: true,
      message: 'Legal register entry created successfully',
      data: { LegalRegisterID: newId },
      database: 'connected'
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Database operation failed:', errorMessage);

    // Reset global pool on error
    if (globalPool) {
      globalPool = null;
    }

    return NextResponse.json({
      success: false,
      error: 'Database operation failed: ' + errorMessage,
      database: 'disconnected'
    }, { status: 500 });
  }
}