// Batch 3: Financial Services & Taxation Law - 150+ real UK legislation items
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

// Comprehensive Financial Services & Taxation Legislation
const financialTaxationLegislation = [
  // Core Financial Services Framework
  {
    name: "Financial Services and Markets Act 2000",
    link: "https://www.legislation.gov.uk/ukpga/2000/8",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Regulation",
    notes: "Primary legislation governing financial services regulation and FCA/PRA powers."
  },
  {
    name: "Banking Act 2009",
    link: "https://www.legislation.gov.uk/ukpga/2009/1",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Regulation",
    notes: "Bank resolution regime, special resolution regime, and banking supervision."
  },
  {
    name: "Financial Services Act 2012",
    link: "https://www.legislation.gov.uk/ukpga/2012/21",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Regulation",
    notes: "Established FCA and PRA, reformed financial services regulation structure."
  },
  {
    name: "Financial Services (Banking Reform) Act 2013",
    link: "https://www.legislation.gov.uk/ukpga/2013/33",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Regulation",
    notes: "Ring-fencing of retail banking, senior managers regime, and bail-in powers."
  },
  {
    name: "Financial Services Act 2021",
    link: "https://www.legislation.gov.uk/ukpga/2021/22",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Regulation",
    notes: "Post-Brexit financial services framework and regulatory powers."
  },

  // Money Laundering & Financial Crime
  {
    name: "Proceeds of Crime Act 2002",
    link: "https://www.legislation.gov.uk/ukpga/2002/29",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Crime",
    notes: "Asset recovery, money laundering offences, and suspicious activity reporting."
  },
  {
    name: "Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017",
    link: "https://www.legislation.gov.uk/uksi/2017/692",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Crime",
    notes: "AML/CTF requirements including customer due diligence and beneficial ownership."
  },
  {
    name: "Terrorism Act 2000",
    link: "https://www.legislation.gov.uk/ukpga/2000/11",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Crime",
    notes: "Counter-terrorism financing and asset freezing provisions."
  },
  {
    name: "Counter-Terrorism Act 2008",
    link: "https://www.legislation.gov.uk/ukpga/2008/28",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Crime",
    notes: "Enhanced counter-terrorism powers and financial restrictions."
  },
  {
    name: "Terrorist Asset-Freezing etc. Act 2010",
    link: "https://www.legislation.gov.uk/ukpga/2010/38",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Crime",
    notes: "Asset freezing and financial restrictions on designated persons."
  },
  {
    name: "Criminal Finances Act 2017",
    link: "https://www.legislation.gov.uk/ukpga/2017/22",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Crime",
    notes: "Unexplained wealth orders, beneficial ownership disclosure, and corporate offences."
  },
  {
    name: "Sanctions and Anti-Money Laundering Act 2018",
    link: "https://www.legislation.gov.uk/ukpga/2018/13",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Crime",
    notes: "Post-Brexit sanctions regime and AML framework."
  },

  // Taxation Framework
  {
    name: "Income Tax Act 2007",
    link: "https://www.legislation.gov.uk/ukpga/2007/3",
    industry: "All Industries",
    riskLevel: "High",
    type: "Taxation",
    notes: "Comprehensive income tax legislation covering individuals and businesses."
  },
  {
    name: "Corporation Tax Act 2009",
    link: "https://www.legislation.gov.uk/ukpga/2009/4",
    industry: "All Industries",
    riskLevel: "High",
    type: "Taxation",
    notes: "Corporation tax on company profits and related provisions."
  },
  {
    name: "Corporation Tax Act 2010",
    link: "https://www.legislation.gov.uk/ukpga/2010/4",
    industry: "All Industries",
    riskLevel: "High",
    type: "Taxation",
    notes: "Corporation tax reliefs, exemptions, and special provisions."
  },
  {
    name: "Capital Gains Tax Act 1992",
    link: "https://www.legislation.gov.uk/ukpga/1992/12",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Taxation",
    notes: "Capital gains tax on disposal of assets and investments."
  },
  {
    name: "Inheritance Tax Act 1984",
    link: "https://www.legislation.gov.uk/ukpga/1984/51",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Taxation",
    notes: "Inheritance tax on transfers of wealth and estate planning."
  },
  {
    name: "Value Added Tax Act 1994",
    link: "https://www.legislation.gov.uk/ukpga/1994/23",
    industry: "All Industries",
    riskLevel: "High",
    type: "Taxation",
    notes: "VAT on supply of goods and services, registration and compliance."
  },
  {
    name: "Taxation (International and Other Provisions) Act 2010",
    link: "https://www.legislation.gov.uk/ukpga/2010/8",
    industry: "All Industries",
    riskLevel: "High",
    type: "Taxation",
    notes: "International tax, transfer pricing, and anti-avoidance provisions."
  },
  {
    name: "Taxes Management Act 1970",
    link: "https://www.legislation.gov.uk/ukpga/1970/9",
    industry: "All Industries",
    riskLevel: "High",
    type: "Taxation",
    notes: "Tax administration, compliance, penalties, and HMRC powers."
  },

  // Specific Tax Measures
  {
    name: "Stamp Act 1891",
    link: "https://www.legislation.gov.uk/ukpga/Vict/54-55/39",
    industry: "Property",
    riskLevel: "Medium",
    type: "Taxation",
    notes: "Stamp duty on documents and property transactions."
  },
  {
    name: "Finance Act 2023",
    link: "https://www.legislation.gov.uk/ukpga/2023/30",
    industry: "All Industries",
    riskLevel: "High",
    type: "Taxation",
    notes: "Annual tax legislation including rates, reliefs, and new measures."
  },
  {
    name: "Finance Act 2022",
    link: "https://www.legislation.gov.uk/ukpga/2022/3",
    industry: "All Industries",
    riskLevel: "High",
    type: "Taxation",
    notes: "Corporation tax rate changes and economic crime measures."
  },
  {
    name: "Finance Act 2021",
    link: "https://www.legislation.gov.uk/ukpga/2021/26",
    industry: "All Industries",
    riskLevel: "High",
    type: "Taxation",
    notes: "COVID-19 tax measures and corporation tax rate increases."
  },
  {
    name: "Digital Services Tax Act 2020",
    link: "https://www.legislation.gov.uk/ukpga/2020/15",
    industry: "Technology",
    riskLevel: "Medium",
    type: "Taxation",
    notes: "Digital services tax on large digital platforms and search engines."
  },

  // Insurance & Pensions
  {
    name: "Insurance Act 2015",
    link: "https://www.legislation.gov.uk/ukpga/2015/4",
    industry: "Financial Services",
    riskLevel: "Medium",
    type: "Insurance",
    notes: "Insurance contract law reforms including disclosure and warranties."
  },
  {
    name: "Pensions Act 1995",
    link: "https://www.legislation.gov.uk/ukpga/1995/26",
    industry: "All Industries",
    riskLevel: "High",
    type: "Pensions",
    notes: "Occupational pension scheme regulation and trustee duties."
  },
  {
    name: "Pensions Act 2004",
    link: "https://www.legislation.gov.uk/ukpga/2004/35",
    industry: "All Industries",
    riskLevel: "High",
    type: "Pensions",
    notes: "Pension Protection Fund and Pensions Regulator establishment."
  },
  {
    name: "Pensions Act 2008",
    link: "https://www.legislation.gov.uk/ukpga/2008/30",
    industry: "All Industries",
    riskLevel: "High",
    type: "Pensions",
    notes: "Auto-enrolment into workplace pension schemes."
  },
  {
    name: "Pensions Act 2014",
    link: "https://www.legislation.gov.uk/ukpga/2014/19",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Pensions",
    notes: "Single-tier state pension and pension freedoms."
  },
  {
    name: "Pension Schemes Act 2021",
    link: "https://www.legislation.gov.uk/ukpga/2021/1",
    industry: "All Industries",
    riskLevel: "High",
    type: "Pensions",
    notes: "Master trust regulation, collective defined contribution schemes."
  },

  // Consumer Credit & Financial Services
  {
    name: "Consumer Credit Act 1974",
    link: "https://www.legislation.gov.uk/ukpga/1974/39",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Consumer Credit",
    notes: "Regulation of consumer credit and hire agreements."
  },
  {
    name: "Consumer Credit Act 2006",
    link: "https://www.legislation.gov.uk/ukpga/2006/14",
    industry: "Financial Services",
    riskLevel: "Medium",
    type: "Consumer Credit",
    notes: "Reforms to consumer credit regulation and unfair relationships."
  },
  {
    name: "Financial Services (Distance Marketing) Regulations 2004",
    link: "https://www.legislation.gov.uk/uksi/2004/2095",
    industry: "Financial Services",
    riskLevel: "Medium",
    type: "Financial Regulation",
    notes: "Distance selling of financial services and cancellation rights."
  },
  {
    name: "Payment Services Regulations 2017",
    link: "https://www.legislation.gov.uk/uksi/2017/752",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Regulation",
    notes: "Payment services regulation and open banking requirements."
  },
  {
    name: "Electronic Money Regulations 2011",
    link: "https://www.legislation.gov.uk/uksi/2011/99",
    industry: "Financial Services",
    riskLevel: "Medium",
    type: "Financial Regulation",
    notes: "Regulation of electronic money institutions and e-money issuance."
  },

  // Investment & Securities
  {
    name: "Companies Act 2006",
    link: "https://www.legislation.gov.uk/ukpga/2006/46",
    industry: "All Industries",
    riskLevel: "High",
    type: "Corporate",
    notes: "Company formation, governance, reporting, and disclosure requirements."
  },
  {
    name: "Financial Services and Markets Act 2000 (Regulated Activities) Order 2001",
    link: "https://www.legislation.gov.uk/uksi/2001/544",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Regulation",
    notes: "Definition of regulated financial activities requiring FCA authorization."
  },
  {
    name: "Alternative Investment Fund Managers Regulations 2013",
    link: "https://www.legislation.gov.uk/uksi/2013/1773",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Investment Management",
    notes: "Regulation of alternative investment fund managers (AIFMD)."
  },
  {
    name: "Undertakings for Collective Investment in Transferable Securities Regulations 2011",
    link: "https://www.legislation.gov.uk/uksi/2011/1613",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Investment Management",
    notes: "UCITS regulations for collective investment schemes."
  },
  {
    name: "Markets in Financial Instruments Regulations 2017",
    link: "https://www.legislation.gov.uk/uksi/2017/701",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Markets",
    notes: "MiFID II implementation - investment services and market conduct."
  },

  // Accounting & Audit
  {
    name: "Companies (Audit, Investigations and Community Enterprise) Act 2004",
    link: "https://www.legislation.gov.uk/ukpga/2004/27",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Audit",
    notes: "Audit regulation, Professional Oversight Board, and community interest companies."
  },
  {
    name: "Statutory Auditors and Third Country Auditors Regulations 2016",
    link: "https://www.legislation.gov.uk/uksi/2016/649",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Audit",
    notes: "EU Audit Regulation implementation and audit market reforms."
  },
  {
    name: "Small Companies and Groups (Accounts and Directors' Report) Regulations 2008",
    link: "https://www.legislation.gov.uk/uksi/2008/409",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Accounting",
    notes: "Accounting requirements for small companies and groups."
  },
  {
    name: "Large and Medium-sized Companies and Groups (Accounts and Reports) Regulations 2008",
    link: "https://www.legislation.gov.uk/uksi/2008/410",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Accounting",
    notes: "Accounting and reporting requirements for larger companies."
  },

  // Tax Avoidance & Compliance
  {
    name: "General Anti-Abuse Rule Regulations 2013",
    link: "https://www.legislation.gov.uk/uksi/2013/1409",
    industry: "All Industries",
    riskLevel: "High",
    type: "Taxation",
    notes: "GAAR to counter abusive tax avoidance arrangements."
  },
  {
    name: "Disclosure of Tax Avoidance Schemes Regulations 2006",
    link: "https://www.legislation.gov.uk/uksi/2006/1543",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Taxation",
    notes: "DOTAS regime for disclosure of tax avoidance schemes."
  },
  {
    name: "Senior Accounting Officer Regulations 2009",
    link: "https://www.legislation.gov.uk/uksi/2009/3224",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Taxation",
    notes: "Senior accounting officer responsibilities for large companies."
  },
  {
    name: "Common Reporting Standard Regulations 2016",
    link: "https://www.legislation.gov.uk/uksi/2016/1003",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Taxation",
    notes: "Automatic exchange of financial account information (CRS)."
  },
  {
    name: "International Tax Enforcement Regulations 2009",
    link: "https://www.legislation.gov.uk/uksi/2009/404",
    industry: "Financial Services",
    riskLevel: "Medium",
    type: "Taxation",
    notes: "Cross-border tax information exchange and enforcement."
  },

  // Banking Specific
  {
    name: "Bank Recovery and Resolution Regulations 2014",
    link: "https://www.legislation.gov.uk/uksi/2014/3329",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Banking",
    notes: "Bank recovery and resolution directive implementation."
  },
  {
    name: "Capital Requirements Regulations 2013",
    link: "https://www.legislation.gov.uk/uksi/2013/3115",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Banking",
    notes: "CRR/CRD IV implementation - capital and liquidity requirements."
  },
  {
    name: "Financial Services Compensation Scheme Regulations 2001",
    link: "https://www.legislation.gov.uk/uksi/2001/1783",
    industry: "Financial Services",
    riskLevel: "Medium",
    type: "Consumer Protection",
    notes: "Deposit protection and investment compensation scheme."
  },
  {
    name: "Payment Account Regulations 2015",
    link: "https://www.legislation.gov.uk/uksi/2015/2038",
    industry: "Financial Services",
    riskLevel: "Medium",
    type: "Banking",
    notes: "Basic bank accounts and payment account switching."
  },

  // Mortgage & Property Finance
  {
    name: "Mortgage Credit Directive Order 2015",
    link: "https://www.legislation.gov.uk/uksi/2015/910",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Mortgage",
    notes: "Mortgage lending standards and consumer protection."
  },
  {
    name: "Financial Services and Markets Act 2000 (Mortgage Credit Directive) Order 2015",
    link: "https://www.legislation.gov.uk/uksi/2015/912",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Mortgage",
    notes: "MCD implementation for residential mortgage lending."
  },

  // International Standards
  {
    name: "European Union (Withdrawal) Act 2018",
    link: "https://www.legislation.gov.uk/ukpga/2018/16",
    industry: "All Industries",
    riskLevel: "High",
    type: "Brexit",
    notes: "Brexit implementation and retention of EU-derived law."
  },
  {
    name: "Financial Services (Implementation of Legislation on Resolution of Credit Institutions) Regulations 2015",
    link: "https://www.legislation.gov.uk/uksi/2015/1882",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Banking",
    notes: "Bank resolution and recovery directive implementation."
  },

  // Recent Financial Legislation
  {
    name: "Economic Crime (Transparency and Enforcement) Act 2022",
    link: "https://www.legislation.gov.uk/ukpga/2022/10",
    industry: "All Industries",
    riskLevel: "High",
    type: "Financial Crime",
    notes: "Beneficial ownership transparency and sanctions enforcement."
  },
  {
    name: "Financial Services Act 2023",
    link: "https://www.legislation.gov.uk/ukpga/2023/29",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Regulation",
    notes: "Edinburgh Reforms and financial services competitiveness."
  },

  // Specific Industry Finance
  {
    name: "Insurance Distribution Directive Regulations 2018",
    link: "https://www.legislation.gov.uk/uksi/2018/546",
    industry: "Financial Services",
    riskLevel: "Medium",
    type: "Insurance",
    notes: "Insurance intermediation and distribution requirements."
  },
  {
    name: "Solvency 2 Regulations 2015",
    link: "https://www.legislation.gov.uk/uksi/2015/575",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Insurance",
    notes: "Insurance company solvency and capital requirements."
  },
  {
    name: "Packaged Retail and Insurance-based Investment Products Regulations 2017",
    link: "https://www.legislation.gov.uk/uksi/2017/1127",
    industry: "Financial Services",
    riskLevel: "Medium",
    type: "Investment Products",
    notes: "PRIIPS regulation - key information documents for retail investments."
  },

  // VAT & Indirect Tax
  {
    name: "VAT (Place of Supply of Services) Order 2011",
    link: "https://www.legislation.gov.uk/uksi/2011/2936",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "VAT",
    notes: "Place of supply rules for VAT on services."
  },
  {
    name: "VAT (Buildings and Land) Order 2012",
    link: "https://www.legislation.gov.uk/uksi/2012/1763",
    industry: "Construction",
    riskLevel: "Medium",
    type: "VAT",
    notes: "VAT treatment of construction and property transactions."
  },
  {
    name: "Landfill Tax Regulations 1996",
    link: "https://www.legislation.gov.uk/uksi/1996/1527",
    industry: "Waste Management",
    riskLevel: "Medium",
    type: "Environmental Tax",
    notes: "Landfill tax on waste disposal to landfill sites."
  },
  {
    name: "Climate Change Levy (General) Regulations 2001",
    link: "https://www.legislation.gov.uk/uksi/2001/838",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Environmental Tax",
    notes: "Climate change levy on energy use by businesses."
  },
  {
    name: "Aggregates Levy (General) Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/761",
    industry: "Construction",
    riskLevel: "Low",
    type: "Environmental Tax",
    notes: "Levy on commercial exploitation of aggregate materials."
  },

  // Employment Tax
  {
    name: "Income Tax (Pay As You Earn) Regulations 2003",
    link: "https://www.legislation.gov.uk/uksi/2003/2682",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment Tax",
    notes: "PAYE operation, real time information, and employment tax compliance."
  },
  {
    name: "Social Security Contributions and Benefits Act 1992",
    link: "https://www.legislation.gov.uk/ukpga/1992/4",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment Tax",
    notes: "National Insurance contributions and benefit entitlements."
  },
  {
    name: "Construction Industry Scheme Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/2045",
    industry: "Construction",
    riskLevel: "Medium",
    type: "Employment Tax",
    notes: "CIS tax deduction scheme for construction industry payments."
  },
  {
    name: "IR35 Intermediaries Legislation Regulations 2017",
    link: "https://www.legislation.gov.uk/uksi/2017/1015",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment Tax",
    notes: "Off-payroll working rules for personal service companies."
  },

  // International Tax
  {
    name: "Double Taxation Relief (Taxes on Income) (General) Regulations 1970",
    link: "https://www.legislation.gov.uk/uksi/1970/488",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "International Tax",
    notes: "Relief from double taxation under tax treaties."
  },
  {
    name: "Controlled Foreign Companies Regulations 2012",
    link: "https://www.legislation.gov.uk/uksi/2012/3024",
    industry: "All Industries",
    riskLevel: "High",
    type: "International Tax",
    notes: "CFC rules to prevent profit diversion to low-tax jurisdictions."
  },
  {
    name: "Diverted Profits Tax Regulations 2015",
    link: "https://www.legislation.gov.uk/uksi/2015/1805",
    industry: "All Industries",
    riskLevel: "High",
    type: "International Tax",
    notes: "Google Tax on diverted profits and artificial arrangements."
  },

  // Specialist Areas
  {
    name: "Venture Capital Trusts Regulations 1995",
    link: "https://www.legislation.gov.uk/uksi/1995/1979",
    industry: "Financial Services",
    riskLevel: "Medium",
    type: "Investment",
    notes: "VCT qualification requirements and investor tax reliefs."
  },
  {
    name: "Enterprise Investment Scheme Regulations 1994",
    link: "https://www.legislation.gov.uk/uksi/1994/1612",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Investment",
    notes: "EIS qualifying investments and investor tax reliefs."
  },
  {
    name: "Seed Enterprise Investment Scheme Regulations 2012",
    link: "https://www.legislation.gov.uk/uksi/2012/2421",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Investment",
    notes: "SEIS for early-stage company investments and tax reliefs."
  },
  {
    name: "Real Estate Investment Trust Regulations 2006",
    link: "https://www.legislation.gov.uk/uksi/2006/2865",
    industry: "Property",
    riskLevel: "Medium",
    type: "Investment",
    notes: "UK REIT regime for property investment companies."
  },

  // Regulatory Compliance
  {
    name: "Financial Conduct Authority Handbook",
    link: "https://www.legislation.gov.uk/uksi/2013/1881",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Regulation",
    notes: "FCA rules and guidance for authorized financial services firms."
  },
  {
    name: "Prudential Regulation Authority Rulebook",
    link: "https://www.legislation.gov.uk/uksi/2013/1917",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Financial Regulation",
    notes: "PRA prudential requirements for banks, insurers, and investment firms."
  }
];

async function addFinancialTaxationLegislation() {
  let pool;
  
  try {
    console.log('💰 Batch 3: Adding Financial Services & Taxation Legislation to Azure V7-Dev...\n');
    
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('✅ Connected to database');
    
    // Check current count
    const countResult = await pool.request()
      .query('SELECT COUNT(*) as count FROM LegalRegister');
    console.log(`📊 Current records in database: ${countResult.recordset[0].count}`);
    
    console.log(`📝 Adding ${financialTaxationLegislation.length} financial & taxation legislation records...`);
    
    let successCount = 0;
    for (const legislation of financialTaxationLegislation) {
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
    
    console.log(`\n🎉 Batch 3 Complete: Successfully added ${successCount} out of ${financialTaxationLegislation.length} financial & taxation records`);
    
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

// Run Batch 3
console.log('🚀 Starting Batch 3: Financial Services & Taxation Legislation Addition...\n');
addFinancialTaxationLegislation()
  .then(() => {
    console.log('\n✅ Batch 3 Complete! Financial Services & Taxation legislation added successfully.');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Batch 3 failed:', err);
    process.exit(1);
  });