const sql = require('mssql');
require('dotenv').config();

const config = {
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: false,
        connectTimeout: 30000,
        requestTimeout: 30000
    }
};

async function diagnoseIssues() {
    let pool;
    
    try {
        console.log('🔍 Diagnosing Issues...\n');
        
        // Test 1: Check database connection
        console.log('1. Testing Azure database connection...');
        pool = await sql.connect(config);
        console.log('✅ Azure database connection: SUCCESS');
        
        // Test 2: Check LegalRegister table
        console.log('\n2. Checking LegalRegister table...');
        const tableCheck = await pool.request().query(`
            SELECT COUNT(*) as count 
            FROM [dbo].[LegalRegister]
        `);
        console.log(`✅ LegalRegister table: ${tableCheck.recordset[0].count} records found`);
        
        // Test 3: Test the exact query from the API
        console.log('\n3. Testing API query...');
        const apiQuery = `
            SELECT TOP 5000
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
                NULL as ResponsiblePersonId,
                NULL as ResponsiblePersonName,
                NULL as OrgGroupID,
                NULL as OrgGroupName,
                NULL as LocationID,
                NULL as LocationName
            FROM [dbo].[LegalRegister] lr
            WHERE 1=1
            ORDER BY LatestUpdate DESC
        `;
        
        const result = await pool.request().query(apiQuery);
        console.log(`✅ API query: ${result.recordset.length} records returned`);
        
        if (result.recordset.length > 0) {
            const sample = result.recordset[0];
            console.log('   Sample record:');
            console.log(`     ID: ${sample.LegalRegisterID}`);
            console.log(`     Name: ${sample.Name}`);
            console.log(`     Status: ${sample.ComplianceStatus}`);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Full error:', error);
        
        if (error.message.includes('Login failed')) {
            console.log('\n💡 Database credentials issue. Checking .env file...');
        } else if (error.message.includes('Invalid object name')) {
            console.log('\n💡 Table not found issue. LegalRegister table may not exist.');
        } else if (error.message.includes('Cannot resolve the collation conflict')) {
            console.log('\n💡 Collation conflict. May need to specify collation in queries.');
        }
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

diagnoseIssues();