// This script simulates what the API route does to isolate the issue
const sql = require('mssql');
require('dotenv').config();

// Same config as in the API route
const dbConfig = {
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

async function testAPIRouteLogic() {
    let pool = null;
    
    try {
        console.log('🧪 Testing API Route Logic...\n');
        console.log('Config:', {
            server: dbConfig.server,
            database: dbConfig.database,
            user: dbConfig.user,
            encrypt: dbConfig.options.encrypt
        });
        
        // Simulate the API route logic
        const searchParams = {
            search: '',
            industryName: '',
            complianceStatus: '',
            riskLevel: '',
            limit: 5000
        };
        
        console.log('1. Connecting to database...');
        pool = await sql.connect(dbConfig);
        console.log('✅ Connected successfully');
        
        console.log('\n2. Checking which columns exist...');
        let hasResponsiblePersonColumn = false;
        let hasOrgGroupColumn = false;
        let hasLocationColumn = false;
        
        try {
            const columnCheck = await pool.request().query(`
                SELECT COLUMN_NAME
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = 'LegalRegister' 
                AND TABLE_SCHEMA = 'dbo' 
                AND COLUMN_NAME IN ('ResponsiblePersonId', 'OrgGroupID', 'LocationID')
            `);
            
            const existingColumns = columnCheck.recordset.map(row => row.COLUMN_NAME);
            hasResponsiblePersonColumn = existingColumns.includes('ResponsiblePersonId');
            hasOrgGroupColumn = existingColumns.includes('OrgGroupID');
            hasLocationColumn = existingColumns.includes('LocationID');
            
            console.log('   ResponsiblePersonId:', hasResponsiblePersonColumn ? '✅ EXISTS' : '❌ MISSING');
            console.log('   OrgGroupID:', hasOrgGroupColumn ? '✅ EXISTS' : '❌ MISSING');
            console.log('   LocationID:', hasLocationColumn ? '✅ EXISTS' : '❌ MISSING');
            
        } catch (columnError) {
            console.log('⚠️  Could not check for columns:', columnError.message);
        }
        
        console.log('\n3. Building and executing main query...');
        let query = `
            SELECT TOP ${searchParams.limit}
                lr.LegalRegisterID,
                lr.Name,
                lr.Link,
                lr.LatestUpdate,
                NULL as LastViewedDate,
                CASE 
                  WHEN DATEDIFF(day, lr.LatestUpdate, sysdatetimeoffset()) <= 7 THEN 1 
                  ELSE 0 
                END as IsRecent,
                lr.RiskLevel,
                lr.ComplianceStatus,
                lr.Notes,
                lr.IndustryName,
                lr.LegislationType,
                ${hasResponsiblePersonColumn ? 'lr.ResponsiblePersonId' : 'NULL as ResponsiblePersonId'},
                ${hasResponsiblePersonColumn ? 'e.FirstName + \' \' + e.LastName' : 'NULL'} as ResponsiblePersonName,
                ${hasOrgGroupColumn ? 'lr.OrgGroupID' : 'NULL as OrgGroupID'},
                ${hasOrgGroupColumn ? 'og.Name' : 'NULL'} as OrgGroupName,
                ${hasLocationColumn ? 'lr.LocationID' : 'NULL as LocationID'},
                ${hasLocationColumn ? 'l.Name' : 'NULL'} as LocationName
            FROM [dbo].[LegalRegister] lr
            ${hasResponsiblePersonColumn ? 'LEFT JOIN [V7].[Employee] e ON lr.ResponsiblePersonId = e.EmployeeID' : ''}
            ${hasOrgGroupColumn ? 'LEFT JOIN [V7].[OrgGroup] og ON lr.OrgGroupID = og.OrgGroupID' : ''}
            ${hasLocationColumn ? 'LEFT JOIN [V7].[Location] l ON lr.LocationID = l.LocationID' : ''}
            WHERE 1=1
        `;
        
        const poolRequest = pool.request();
        
        // Add search parameters if they exist
        if (searchParams.search) {
            query += ` AND (Name LIKE @search OR LegislationType LIKE @search OR Notes LIKE @search)`;
            poolRequest.input('search', sql.VarChar, `%${searchParams.search}%`);
        }
        
        if (searchParams.industryName && searchParams.industryName !== 'All Industries') {
            query += ` AND (IndustryName = @industryName OR IndustryName = 'All Industries')`;
            poolRequest.input('industryName', sql.VarChar, searchParams.industryName);
        }
        
        if (searchParams.complianceStatus) {
            query += ` AND ComplianceStatus = @complianceStatus`;
            poolRequest.input('complianceStatus', sql.VarChar, searchParams.complianceStatus);
        }
        
        if (searchParams.riskLevel) {
            query += ` AND RiskLevel = @riskLevel`;
            poolRequest.input('riskLevel', sql.VarChar, searchParams.riskLevel);
        }
        
        query += ` ORDER BY LatestUpdate DESC`;
        
        console.log('📝 Final query:');
        console.log(query.substring(0, 200) + '...');
        
        const result = await poolRequest.query(query);
        console.log(`✅ Query executed successfully: ${result.recordset.length} records`);
        
        if (result.recordset.length > 0) {
            console.log('\n📊 Sample results:');
            result.recordset.slice(0, 3).forEach((record, i) => {
                console.log(`   ${i + 1}. ${record.Name} (${record.ComplianceStatus})`);
            });
        }
        
        // Simulate the API response
        const apiResponse = {
            success: true,
            data: result.recordset,
            total: result.recordset.length,
            database: 'connected'
        };
        
        console.log('\n✅ API simulation completed successfully!');
        console.log('📦 Response summary:');
        console.log(`   Success: ${apiResponse.success}`);
        console.log(`   Records: ${apiResponse.total}`);
        console.log(`   Database: ${apiResponse.database}`);
        
    } catch (error) {
        console.error('\n❌ Error in API simulation:', error.message);
        console.error('Full error:', error);
        
        // Check for specific errors
        if (error.message.includes('Invalid column name')) {
            console.log('\n💡 This suggests a column name issue in the query');
        } else if (error.message.includes('Invalid object name')) {
            console.log('\n💡 This suggests a table or join issue');
        } else if (error.message.includes('Login failed')) {
            console.log('\n💡 This suggests authentication issues');
        }
        
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

testAPIRouteLogic();