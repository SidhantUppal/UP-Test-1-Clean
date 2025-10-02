// Script to update legal register with real UK legislation URLs and details
import sql from 'mssql';

// Database configuration
const dbConfig = {
  server: 'YOUR_DATABASE_SERVER.database.windows.net',
  database: 'V7-Dev',
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true,
    connectTimeout: 30000,
    requestTimeout: 30000
  }
};

// Real UK legislation with valid URLs
const realLegislation = [
  // Health & Safety
  {
    name: "Health and Safety at Work etc. Act 1974",
    link: "https://www.legislation.gov.uk/ukpga/1974/37",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Primary health and safety legislation in the UK. Places duties on employers to ensure the health, safety and welfare of employees and others."
  },
  {
    name: "Management of Health and Safety at Work Regulations 1999",
    link: "https://www.legislation.gov.uk/uksi/1999/3242",
    industry: "All Industries", 
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Requires employers to carry out risk assessments, make arrangements for health and safety, and appoint competent persons."
  },
  {
    name: "Construction (Design and Management) Regulations 2015",
    link: "https://www.legislation.gov.uk/uksi/2015/51",
    industry: "Construction",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "CDM Regulations - managing health, safety and welfare when carrying out construction projects."
  },
  {
    name: "Control of Substances Hazardous to Health Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/2677",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "COSHH - requires employers to control substances hazardous to health."
  },
  {
    name: "Personal Protective Equipment at Work Regulations 1992",
    link: "https://www.legislation.gov.uk/uksi/1992/2966",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Duties concerning the provision and use of personal protective equipment at work."
  },
  {
    name: "Work at Height Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/735",
    industry: "Construction",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Places duties on employers and employees to prevent death and injury from falls from height."
  },
  {
    name: "Lifting Operations and Lifting Equipment Regulations 1998",
    link: "https://www.legislation.gov.uk/uksi/1998/2307",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "LOLER - covers lifting equipment used at work."
  },
  {
    name: "Regulatory Reform (Fire Safety) Order 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/1541",
    industry: "All Industries",
    riskLevel: "High",
    type: "Fire Safety",
    notes: "Fire safety duties for non-domestic premises. Requires fire risk assessments."
  },
  {
    name: "Electricity at Work Regulations 1989",
    link: "https://www.legislation.gov.uk/uksi/1989/635",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Requirements for electrical safety in the workplace."
  },
  {
    name: "Manual Handling Operations Regulations 1992",
    link: "https://www.legislation.gov.uk/uksi/1992/2793",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Duties to avoid manual handling injuries."
  },
  {
    name: "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013",
    link: "https://www.legislation.gov.uk/uksi/2013/1471",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "RIDDOR - legal duty to report workplace deaths, injuries, diseases and dangerous occurrences."
  },
  
  // Environmental
  {
    name: "Environmental Protection Act 1990",
    link: "https://www.legislation.gov.uk/ukpga/1990/43",
    industry: "All Industries",
    riskLevel: "High",
    type: "Environmental",
    notes: "Framework for waste management and control of emissions."
  },
  {
    name: "Environment Act 2021",
    link: "https://www.legislation.gov.uk/ukpga/2021/30",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Environmental", 
    notes: "Sets environmental targets and governance framework post-Brexit."
  },
  {
    name: "Climate Change Act 2008",
    link: "https://www.legislation.gov.uk/ukpga/2008/27",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Sets carbon reduction targets and carbon budgeting."
  },
  {
    name: "Waste (England and Wales) Regulations 2011",
    link: "https://www.legislation.gov.uk/uksi/2011/988",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Waste hierarchy and duty of care requirements."
  },
  
  // Employment
  {
    name: "Employment Rights Act 1996",
    link: "https://www.legislation.gov.uk/ukpga/1996/18",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Core employment rights including unfair dismissal, redundancy, and time off."
  },
  {
    name: "Equality Act 2010",
    link: "https://www.legislation.gov.uk/ukpga/2010/15",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Prohibits discrimination in the workplace on protected characteristics."
  },
  {
    name: "Working Time Regulations 1998",
    link: "https://www.legislation.gov.uk/uksi/1998/1833",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Maximum working hours, rest breaks, and annual leave entitlements."
  },
  {
    name: "National Minimum Wage Act 1998",
    link: "https://www.legislation.gov.uk/ukpga/1998/39",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Legal minimum wage rates."
  },
  
  // Data Protection
  {
    name: "Data Protection Act 2018",
    link: "https://www.legislation.gov.uk/ukpga/2018/12",
    industry: "All Industries",
    riskLevel: "High",
    type: "Data Protection",
    notes: "UK's implementation of GDPR, governs how personal data is processed."
  },
  {
    name: "UK General Data Protection Regulation",
    link: "https://www.legislation.gov.uk/eur/2016/679",
    industry: "All Industries",
    riskLevel: "High",
    type: "Data Protection",
    notes: "UK GDPR - comprehensive data protection requirements."
  },
  
  // Corporate Governance
  {
    name: "Companies Act 2006",
    link: "https://www.legislation.gov.uk/ukpga/2006/46",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Corporate",
    notes: "Primary source of UK company law, directors' duties and governance."
  },
  {
    name: "Bribery Act 2010",
    link: "https://www.legislation.gov.uk/ukpga/2010/23",
    industry: "All Industries",
    riskLevel: "High",
    type: "Corporate",
    notes: "Anti-bribery and corruption legislation with extraterritorial reach."
  },
  {
    name: "Modern Slavery Act 2015",
    link: "https://www.legislation.gov.uk/ukpga/2015/30",
    industry: "All Industries",
    riskLevel: "High",
    type: "Corporate",
    notes: "Requires transparency in supply chains and anti-slavery measures."
  },
  
  // Industry Specific
  {
    name: "Food Safety Act 1990",
    link: "https://www.legislation.gov.uk/ukpga/1990/16",
    industry: "Food & Beverage",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Framework for food safety and hygiene requirements."
  },
  {
    name: "Control of Asbestos Regulations 2012",
    link: "https://www.legislation.gov.uk/uksi/2012/632",
    industry: "Construction",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Specific requirements for managing asbestos in buildings."
  },
  {
    name: "Dangerous Substances and Explosive Atmospheres Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/2776",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "DSEAR - protection from fire and explosion risks."
  },
  {
    name: "Railways and Other Guided Transport Systems (Safety) Regulations 2006",
    link: "https://www.legislation.gov.uk/uksi/2006/599",
    industry: "Transport",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "ROGS - safety management systems for railways."
  },
  {
    name: "Gas Safety (Installation and Use) Regulations 1998",
    link: "https://www.legislation.gov.uk/uksi/1998/2451",
    industry: "Utilities",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Requirements for gas installations and appliances."
  }
];

async function updateLegislation() {
  let pool;
  
  try {
    console.log('🔄 Connecting to database...');
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('✅ Connected to database');
    
    // First, let's check what's currently in the database
    const checkResult = await pool.request()
      .query('SELECT COUNT(*) as count FROM LegalRegister');
    console.log(`📊 Current records in database: ${checkResult.recordset[0].count}`);
    
    // Clear existing data to start fresh with real URLs
    console.log('🗑️  Clearing existing fake data...');
    await pool.request().query('DELETE FROM LegalRegister');
    
    console.log(`📝 Inserting ${realLegislation.length} real legislation records...`);
    
    let successCount = 0;
    for (const legislation of realLegislation) {
      try {
        const request = pool.request();
        
        // Add parameters
        request.input('Name', sql.NVarChar(500), legislation.name);
        request.input('Link', sql.NVarChar(1000), legislation.link);
        request.input('IndustryName', sql.NVarChar(100), legislation.industry);
        request.input('RiskLevel', sql.NVarChar(50), legislation.riskLevel);
        request.input('ComplianceStatus', sql.NVarChar(50), 'Under Review');
        request.input('Notes', sql.NVarChar(sql.MAX), legislation.notes);
        request.input('LegislationType', sql.NVarChar(100), legislation.type);
        request.input('LatestUpdate', sql.DateTime, new Date());
        // Insert the record
        await request.query(`
          INSERT INTO LegalRegister (
            Name, Link, IndustryName, RiskLevel, ComplianceStatus, 
            Notes, LegislationType, LatestUpdate
          ) VALUES (
            @Name, @Link, @IndustryName, @RiskLevel, @ComplianceStatus,
            @Notes, @LegislationType, @LatestUpdate
          )
        `);
        
        console.log(`✅ Added: ${legislation.name}`);
        successCount++;
      } catch (err) {
        console.error(`❌ Failed to add ${legislation.name}:`, err.message);
      }
    }
    
    console.log(`\n🎉 Successfully added ${successCount} out of ${realLegislation.length} legislation records`);
    
    // Verify the update
    const finalResult = await pool.request()
      .query('SELECT TOP 5 Name, Link FROM LegalRegister ORDER BY LegalRegisterID DESC');
    
    console.log('\n📋 Sample of inserted records:');
    finalResult.recordset.forEach(record => {
      console.log(`- ${record.Name}`);
      console.log(`  URL: ${record.Link}`);
    });
    
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    if (pool) {
      await pool.close();
      console.log('\n👋 Database connection closed');
    }
  }
}

// Run the update
console.log('🚀 Starting Legal Register update with real UK legislation...\n');
updateLegislation()
  .then(() => {
    console.log('\n✅ Update complete!');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Update failed:', err);
    process.exit(1);
  });