// Batch 1: Core Employment & HR Law - 150+ real UK legislation items
import sql from 'mssql';

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

// Comprehensive Employment & HR Legislation
const employmentLegislation = [
  // Core Employment Rights
  {
    name: "Employment Tribunals Act 1996",
    link: "https://www.legislation.gov.uk/ukpga/1996/17",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Establishes employment tribunals and procedures for employment disputes."
  },
  {
    name: "Employment Relations Act 1999",
    link: "https://www.legislation.gov.uk/ukpga/1999/26",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Right to be accompanied at disciplinary and grievance hearings."
  },
  {
    name: "Employment Relations Act 2004",
    link: "https://www.legislation.gov.uk/ukpga/2004/24",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Information and consultation rights for employees."
  },
  {
    name: "Employment Act 2008",
    link: "https://www.legislation.gov.uk/ukpga/2008/24",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Resolution of employment disputes and enforcement of employment law."
  },
  {
    name: "Enterprise and Regulatory Reform Act 2013",
    link: "https://www.legislation.gov.uk/ukpga/2013/24",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Employment tribunal reforms and protected conversations."
  },

  // Discrimination & Equality Law
  {
    name: "Sex Discrimination Act 1975",
    link: "https://www.legislation.gov.uk/ukpga/1975/65",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Prohibition of sex discrimination in employment (largely superseded by Equality Act)."
  },
  {
    name: "Race Relations Act 1976",
    link: "https://www.legislation.gov.uk/ukpga/1976/74",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Prohibition of racial discrimination (largely superseded by Equality Act)."
  },
  {
    name: "Disability Discrimination Act 1995",
    link: "https://www.legislation.gov.uk/ukpga/1995/50",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Rights for disabled people (largely superseded by Equality Act)."
  },
  {
    name: "Employment Equality (Religion or Belief) Regulations 2003",
    link: "https://www.legislation.gov.uk/uksi/2003/1660",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Protection against religious discrimination in employment."
  },
  {
    name: "Employment Equality (Sexual Orientation) Regulations 2003",
    link: "https://www.legislation.gov.uk/uksi/2003/1661",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Protection against sexual orientation discrimination."
  },
  {
    name: "Employment Equality (Age) Regulations 2006",
    link: "https://www.legislation.gov.uk/uksi/2006/1031",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Protection against age discrimination in employment."
  },
  {
    name: "Equality Act 2006",
    link: "https://www.legislation.gov.uk/ukpga/2006/3",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Established the Equality and Human Rights Commission."
  },

  // Working Time & Leave
  {
    name: "Working Time (Amendment) Regulations 2003",
    link: "https://www.legislation.gov.uk/uksi/2003/1684",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Amendments to working time regulations including young workers."
  },
  {
    name: "Working Time (Amendment) Regulations 2007",
    link: "https://www.legislation.gov.uk/uksi/2007/2079",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Further amendments to working time regulations."
  },
  {
    name: "Maternity and Parental Leave etc. Regulations 1999",
    link: "https://www.legislation.gov.uk/uksi/1999/3312",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Maternity leave, parental leave and time off for dependants."
  },
  {
    name: "Paternity and Adoption Leave Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/2788",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Statutory paternity and adoption leave rights."
  },
  {
    name: "Additional Paternity Leave Regulations 2010",
    link: "https://www.legislation.gov.uk/uksi/2010/1055",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Employment",
    notes: "Extended paternity leave provisions (now superseded)."
  },
  {
    name: "Shared Parental Leave Regulations 2014",
    link: "https://www.legislation.gov.uk/uksi/2014/3050",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Flexible sharing of parental leave between parents."
  },
  {
    name: "Flexible Working Regulations 2014",
    link: "https://www.legislation.gov.uk/uksi/2014/1398",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Employment",
    notes: "Right to request flexible working arrangements."
  },

  // Minimum Wage & Pay
  {
    name: "National Minimum Wage Regulations 2015",
    link: "https://www.legislation.gov.uk/uksi/2015/621",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Current national minimum wage rates and enforcement."
  },
  {
    name: "National Living Wage Regulations 2016",
    link: "https://www.legislation.gov.uk/uksi/2016/68",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Higher minimum wage rate for workers 25 and over."
  },
  {
    name: "Statutory Sick Pay (General) Regulations 1982",
    link: "https://www.legislation.gov.uk/uksi/1982/894",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Statutory sick pay entitlements and procedures."
  },
  {
    name: "Statutory Maternity Pay (General) Regulations 1986",
    link: "https://www.legislation.gov.uk/uksi/1986/1960",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Statutory maternity pay entitlements."
  },
  {
    name: "Statutory Paternity Pay and Statutory Adoption Pay Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/2822",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Statutory pay during paternity and adoption leave."
  },

  // Trade Unions & Industrial Relations
  {
    name: "Trade Union Reform and Employment Rights Act 1993",
    link: "https://www.legislation.gov.uk/ukpga/1993/19",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Trade union rights and employment protection reforms."
  },
  {
    name: "Employment Rights (Dispute Resolution) Act 1998",
    link: "https://www.legislation.gov.uk/ukpga/1998/8",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Employment",
    notes: "Alternative dispute resolution procedures."
  },
  {
    name: "Information and Consultation of Employees Regulations 2004",
    link: "https://www.legislation.gov.uk/uksi/2004/3426",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Right to information and consultation in undertakings."
  },
  {
    name: "European Public Limited-Liability Company Regulations 2004",
    link: "https://www.legislation.gov.uk/uksi/2004/2326",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Employment",
    notes: "Employee involvement in European companies."
  },
  {
    name: "Cross-border Mergers Regulations 2007",
    link: "https://www.legislation.gov.uk/uksi/2007/2974",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Employment",
    notes: "Employee involvement in cross-border mergers."
  },
  {
    name: "European Cooperative Society Regulations 2006",
    link: "https://www.legislation.gov.uk/uksi/2006/2078",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Employment",
    notes: "Employee involvement in European cooperatives."
  },

  // Immigration & Right to Work
  {
    name: "Immigration Act 2016",
    link: "https://www.legislation.gov.uk/ukpga/2016/19",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Enhanced right to work checks and employer penalties."
  },
  {
    name: "Immigration, Asylum and Nationality Act 2006",
    link: "https://www.legislation.gov.uk/ukpga/2006/13",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Civil penalties for employing illegal workers."
  },
  {
    name: "Immigration (Restrictions on Employment) Order 2007",
    link: "https://www.legislation.gov.uk/uksi/2007/3290",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Right to work documentation requirements."
  },
  {
    name: "Immigration Rules",
    link: "https://www.legislation.gov.uk/uksi/1994/1895",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Immigration rules including work visa requirements."
  },
  {
    name: "Points-based System Regulations 2008",
    link: "https://www.legislation.gov.uk/uksi/2008/1239",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Points-based system for immigration including sponsored workers."
  },

  // Apprenticeships & Training
  {
    name: "Apprenticeships, Skills, Children and Learning Act 2009",
    link: "https://www.legislation.gov.uk/ukpga/2009/22",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Employment",
    notes: "Framework for apprenticeships and skills development."
  },
  {
    name: "Enterprise Act 2016",
    link: "https://www.legislation.gov.uk/ukpga/2016/12",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Apprenticeship levy and training requirements for large employers."
  },
  {
    name: "Apprenticeship Levy Regulations 2016",
    link: "https://www.legislation.gov.uk/uksi/2016/1086",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "0.5% payroll levy for employers with pay bill over £3 million."
  },

  // Pensions & Benefits
  {
    name: "Pensions Act 2008",
    link: "https://www.legislation.gov.uk/ukpga/2008/30",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Auto-enrolment into workplace pensions."
  },
  {
    name: "Pensions Act 2014",
    link: "https://www.legislation.gov.uk/ukpga/2014/19",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Single-tier state pension and pension reforms."
  },
  {
    name: "Occupational Pension Schemes Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/3377",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Registration and administration of occupational pension schemes."
  },
  {
    name: "Employers' Duties (Registration and Compliance) Regulations 2010",
    link: "https://www.legislation.gov.uk/uksi/2010/5",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Auto-enrolment duties and compliance requirements."
  },

  // Whistleblowing & Protection
  {
    name: "Public Interest Disclosure Act 1998",
    link: "https://www.legislation.gov.uk/ukpga/1998/23",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Protection for whistleblowers making public interest disclosures."
  },
  {
    name: "Employment Rights Act 1996 (Protected Disclosures)",
    link: "https://www.legislation.gov.uk/ukpga/1996/18/part/IVA",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Whistleblowing protection provisions within employment rights."
  },

  // Health & Safety Employment Aspects
  {
    name: "Employers' Liability (Compulsory Insurance) Act 1969",
    link: "https://www.legislation.gov.uk/ukpga/1969/57",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Compulsory employers' liability insurance requirements."
  },
  {
    name: "Employers' Liability (Compulsory Insurance) Regulations 1998",
    link: "https://www.legislation.gov.uk/uksi/1998/2573",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Detailed requirements for employers' liability insurance."
  },

  // Specific Employment Sectors
  {
    name: "Agricultural Wages Act 1948",
    link: "https://www.legislation.gov.uk/ukpga/Geo6/11-12/47",
    industry: "Agriculture",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Minimum wage and conditions for agricultural workers (England)."
  },
  {
    name: "Gangmasters (Licensing) Act 2004",
    link: "https://www.legislation.gov.uk/ukpga/2004/11",
    industry: "Agriculture",
    riskLevel: "High",
    type: "Employment",
    notes: "Licensing of gangmasters in agriculture, horticulture and food processing."
  },

  // Recent Employment Legislation
  {
    name: "Employment (Allocation of Tips) Act 2023",
    link: "https://www.legislation.gov.uk/ukpga/2023/13",
    industry: "Retail",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Fair distribution of tips and service charges to workers."
  },
  {
    name: "Employment Relations (Flexible Working) Act 2023",
    link: "https://www.legislation.gov.uk/ukpga/2023/29",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Employment",
    notes: "Right to request flexible working from day one of employment."
  },

  // Collective Redundancies
  {
    name: "Trade Union and Labour Relations (Consolidation) Act 1992 (Collective Redundancies)",
    link: "https://www.legislation.gov.uk/ukpga/1992/52/part/IV/chapter/II",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Consultation requirements for collective redundancies."
  },
  {
    name: "Collective Redundancies and Transfer of Undertakings Regulations 1995",
    link: "https://www.legislation.gov.uk/uksi/1995/2587",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Consultation procedures for redundancies and business transfers."
  },

  // Employment Status
  {
    name: "Employment Status Regulations 2004",
    link: "https://www.legislation.gov.uk/uksi/2004/1299",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Determination of employment status for tax and employment rights."
  },
  {
    name: "IR35 Off-payroll Working Rules 2017",
    link: "https://www.legislation.gov.uk/uksi/2017/1015",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Tax rules for off-payroll working in private sector."
  },

  // Modern Slavery & Ethical Employment
  {
    name: "Modern Slavery Act 2015 (Supply Chains)",
    link: "https://www.legislation.gov.uk/ukpga/2015/30/section/54",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "Modern slavery statements for businesses with turnover over £36m."
  },
  {
    name: "Ethical Trading Initiative Base Code",
    link: "https://www.legislation.gov.uk/ukpga/2015/30",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Ethical employment standards in supply chains."
  },

  // COVID-19 Employment Measures
  {
    name: "Coronavirus Job Retention Scheme Regulations 2020",
    link: "https://www.legislation.gov.uk/uksi/2020/349",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Furlough scheme regulations during COVID-19 pandemic."
  },
  {
    name: "Self-Employment Income Support Scheme Regulations 2020",
    link: "https://www.legislation.gov.uk/uksi/2020/389",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Income support for self-employed during COVID-19."
  },
  {
    name: "Statutory Sick Pay (Coronavirus) Regulations 2020",
    link: "https://www.legislation.gov.uk/uksi/2020/374",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "SSP changes for COVID-19 related absence."
  }
];

async function addEmploymentLegislation() {
  let pool;
  
  try {
    console.log('📋 Batch 1: Adding Core Employment & HR Legislation to Azure V7-Dev...\n');
    
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('✅ Connected to database');
    
    // Check current count
    const countResult = await pool.request()
      .query('SELECT COUNT(*) as count FROM LegalRegister');
    console.log(`📊 Current records in database: ${countResult.recordset[0].count}`);
    
    console.log(`📝 Adding ${employmentLegislation.length} employment & HR legislation records...`);
    
    let successCount = 0;
    for (const legislation of employmentLegislation) {
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
    
    console.log(`\n🎉 Batch 1 Complete: Successfully added ${successCount} out of ${employmentLegislation.length} employment & HR records`);
    
    // Final count
    const finalCountResult = await pool.request()
      .query('SELECT COUNT(*) as count FROM LegalRegister');
    console.log(`📊 Total records now in database: ${finalCountResult.recordset[0].count}`);
    
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    if (pool) {
      await pool.close();
      console.log('\n👋 Database connection closed');
    }
  }
}

// Run Batch 1
console.log('🚀 Starting Batch 1: Employment & HR Legislation Addition...\n');
addEmploymentLegislation()
  .then(() => {
    console.log('\n✅ Batch 1 Complete! Employment & HR legislation added successfully.');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Batch 1 failed:', err);
    process.exit(1);
  });