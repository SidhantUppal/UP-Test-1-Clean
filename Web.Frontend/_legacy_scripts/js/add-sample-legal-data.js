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

const sampleLegislation = [
    {
        name: 'Health and Safety at Work etc. Act 1974',
        link: 'https://www.legislation.gov.uk/ukpga/1974/37',
        industryName: 'All Industries',
        riskLevel: 'High',
        complianceStatus: 'Under Review',
        legislationType: 'Primary Legislation',
        notes: 'The primary piece of health and safety legislation. Applies to all workplaces.'
    },
    {
        name: 'Management of Health and Safety at Work Regulations 1999',
        link: 'https://www.legislation.gov.uk/uksi/1999/3242',
        industryName: 'All Industries',
        riskLevel: 'High',
        complianceStatus: 'Approved',
        legislationType: 'Statutory Regulations',
        notes: 'Risk assessment and management requirements for all employers.'
    },
    {
        name: 'COSHH Regulations 2002',
        link: 'https://www.legislation.gov.uk/uksi/2002/2677',
        industryName: 'Manufacturing',
        riskLevel: 'High',
        complianceStatus: 'Under Review',
        legislationType: 'Statutory Regulations',
        notes: 'Control of Substances Hazardous to Health. Critical for manufacturing environments.'
    },
    {
        name: 'Working Time Regulations 1998',
        link: 'https://www.legislation.gov.uk/uksi/1998/1833',
        industryName: 'All Industries',
        riskLevel: 'Medium',
        complianceStatus: 'Approved',
        legislationType: 'Statutory Regulations',
        notes: 'Regulates working hours, rest breaks, and annual leave entitlements.'
    },
    {
        name: 'Display Screen Equipment Regulations 1992',
        link: 'https://www.legislation.gov.uk/uksi/1992/2792',
        industryName: 'Technology',
        riskLevel: 'Medium',
        complianceStatus: 'Approved',
        legislationType: 'Statutory Regulations',
        notes: 'DSE assessments and requirements for office-based workers.'
    },
    {
        name: 'Manual Handling Operations Regulations 1992',
        link: 'https://www.legislation.gov.uk/uksi/1992/2793',
        industryName: 'Manufacturing',
        riskLevel: 'High',
        complianceStatus: 'Under Review',
        legislationType: 'Statutory Regulations',
        notes: 'Requirements for safe manual handling practices.'
    },
    {
        name: 'Personal Protective Equipment at Work Regulations 1992',
        link: 'https://www.legislation.gov.uk/uksi/1992/2966',
        industryName: 'Construction',
        riskLevel: 'High',
        complianceStatus: 'Approved',
        legislationType: 'Statutory Regulations',
        notes: 'PPE selection, provision, and maintenance requirements.'
    },
    {
        name: 'Food Safety Act 1990',
        link: 'https://www.legislation.gov.uk/ukpga/1990/16',
        industryName: 'Hospitality',
        riskLevel: 'Medium',
        complianceStatus: 'Not Applicable',
        legislationType: 'Primary Legislation',
        notes: 'Not applicable to our current operations.'
    },
    {
        name: 'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR)',
        link: 'https://www.legislation.gov.uk/uksi/2013/1471',
        industryName: 'All Industries',
        riskLevel: 'High',
        complianceStatus: 'Under Review',
        legislationType: 'Statutory Regulations',
        notes: 'Incident reporting requirements. Need to review reporting procedures.'
    },
    {
        name: 'Workplace (Health, Safety and Welfare) Regulations 1992',
        link: 'https://www.legislation.gov.uk/uksi/1992/3004',
        industryName: 'All Industries',
        riskLevel: 'Medium',
        complianceStatus: 'Approved',
        legislationType: 'Statutory Regulations',
        notes: 'Basic workplace standards including lighting, temperature, and facilities.'
    }
];

async function addSampleData() {
    let pool;
    
    try {
        console.log('Connecting to Azure V7-Dev database...');
        pool = await sql.connect(config);
        console.log('✅ Connected successfully\n');
        
        // Check if data already exists
        const existingData = await pool.request()
            .query('SELECT COUNT(*) as count FROM [dbo].[LegalRegister]');
        
        if (existingData.recordset[0].count > 0) {
            console.log(`Database already contains ${existingData.recordset[0].count} records.`);
            console.log('Do you want to add more sample data anyway? (This will create duplicates)');
            console.log('Press Ctrl+C to cancel or wait 5 seconds to continue...\n');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
        
        console.log('Adding sample legal register data...');
        
        for (let i = 0; i < sampleLegislation.length; i++) {
            const item = sampleLegislation[i];
            
            try {
                const result = await pool.request()
                    .input('name', sql.VarChar, item.name)
                    .input('link', sql.VarChar, item.link)
                    .input('industryName', sql.VarChar, item.industryName)
                    .input('riskLevel', sql.VarChar, item.riskLevel)
                    .input('complianceStatus', sql.VarChar, item.complianceStatus)
                    .input('legislationType', sql.VarChar, item.legislationType)
                    .input('notes', sql.VarChar, item.notes)
                    .query(`
                        INSERT INTO [dbo].[LegalRegister] 
                        (Name, Link, IndustryName, RiskLevel, ComplianceStatus, LegislationType, Notes, LatestUpdate, CreatedDate, ModifiedDate)
                        VALUES 
                        (@name, @link, @industryName, @riskLevel, @complianceStatus, @legislationType, @notes, sysdatetimeoffset(), sysdatetimeoffset(), sysdatetimeoffset());
                        
                        SELECT SCOPE_IDENTITY() as NewID;
                    `);
                
                const newId = result.recordset[0].NewID;
                console.log(`✅ Added: ${item.name} (ID: ${newId})`);
                
            } catch (itemError) {
                console.error(`❌ Failed to add: ${item.name} - ${itemError.message}`);
            }
        }
        
        // Show final count
        const finalCount = await pool.request()
            .query('SELECT COUNT(*) as count FROM [dbo].[LegalRegister]');
        
        console.log(`\n✅ Sample data added successfully!`);
        console.log(`📊 Total records in database: ${finalCount.recordset[0].count}`);
        
        // Show breakdown by status
        const statusBreakdown = await pool.request().query(`
            SELECT 
                ComplianceStatus, 
                COUNT(*) as Count 
            FROM [dbo].[LegalRegister] 
            GROUP BY ComplianceStatus
        `);
        
        console.log('\n📈 Compliance Status Breakdown:');
        statusBreakdown.recordset.forEach(row => {
            console.log(`   ${row.ComplianceStatus}: ${row.Count}`);
        });
        
        console.log('\n🎉 Ready to test! Visit: http://localhost:3000/legal-register');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Run the script
addSampleData();