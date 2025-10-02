// Add comprehensive real UK legislation to Azure V7-Dev
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

// Comprehensive real UK legislation with valid URLs
const additionalLegislation = [
  // Construction & Building
  {
    name: "Building Regulations 2010",
    link: "https://www.legislation.gov.uk/uksi/2010/2214",
    industry: "Construction",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Technical standards for the design and construction of buildings to ensure safety, health, welfare, convenience and sustainability."
  },
  {
    name: "Construction (Health, Safety and Welfare) Regulations 1996",
    link: "https://www.legislation.gov.uk/uksi/1996/1592",
    industry: "Construction",
    riskLevel: "High", 
    type: "Health & Safety",
    notes: "Health, safety and welfare requirements for construction workers on site."
  },
  {
    name: "Provision and Use of Work Equipment Regulations 1998",
    link: "https://www.legislation.gov.uk/uksi/1998/2306",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "PUWER - safety requirements for work equipment used by employees."
  },
  {
    name: "Workplace (Health, Safety and Welfare) Regulations 1992",
    link: "https://www.legislation.gov.uk/uksi/1992/3004",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "General requirements for workplace conditions including temperature, lighting, ventilation."
  },
  {
    name: "Display Screen Equipment (DSE) Regulations 1992",
    link: "https://www.legislation.gov.uk/uksi/1992/2792",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Health & Safety",
    notes: "Requirements for computer workstations and employee health screening."
  },
  {
    name: "Noise at Work Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/1643",
    industry: "Manufacturing",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Controlling noise exposure in the workplace to prevent hearing damage."
  },
  {
    name: "Vibration at Work Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/1093",
    industry: "Manufacturing",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Controlling exposure to hand-arm and whole-body vibration."
  },

  // Chemical & Hazardous Substances
  {
    name: "Chemicals (Hazard Information and Packaging for Supply) Regulations 2009",
    link: "https://www.legislation.gov.uk/uksi/2009/716",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "CHIP regulations - classification, labelling and packaging of dangerous chemicals."
  },
  {
    name: "Registration, Evaluation, Authorisation and Restriction of Chemicals (REACH) Enforcement Regulations 2008",
    link: "https://www.legislation.gov.uk/uksi/2008/2852",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Environmental",
    notes: "UK enforcement of EU REACH regulation for chemical safety."
  },
  {
    name: "Classification, Labelling and Packaging of Substances and Mixtures Regulations 2009",
    link: "https://www.legislation.gov.uk/uksi/2009/1811",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "CLP regulations - harmonized classification and labelling of chemicals."
  },

  // Transport & Road Safety
  {
    name: "Road Traffic Act 1988",
    link: "https://www.legislation.gov.uk/ukpga/1988/52",
    industry: "Transport",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Principal Act covering road traffic offences, licensing, and vehicle standards."
  },
  {
    name: "Motor Vehicles (Driving Licences) Regulations 1999",
    link: "https://www.legislation.gov.uk/uksi/1999/2864",
    industry: "Transport",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Requirements for driving licenses including commercial vehicle categories."
  },
  {
    name: "Carriage of Dangerous Goods and Use of Transportable Pressure Equipment Regulations 2009",
    link: "https://www.legislation.gov.uk/uksi/2009/1348",
    industry: "Transport",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "ADR regulations for transporting dangerous goods by road."
  },

  // Food Safety & Hygiene
  {
    name: "Food Safety and Hygiene (England) Regulations 2013",
    link: "https://www.legislation.gov.uk/uksi/2013/2996",
    industry: "Food & Beverage",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Food hygiene requirements including HACCP principles."
  },
  {
    name: "Food Information Regulations 2014",
    link: "https://www.legislation.gov.uk/uksi/2014/1855",
    industry: "Food & Beverage",
    riskLevel: "Medium",
    type: "Consumer Protection",
    notes: "Food labelling requirements including allergen information."
  },
  {
    name: "Food Additives, Flavourings, Processing Aids and Materials in Contact with Food Regulations 2013",
    link: "https://www.legislation.gov.uk/uksi/2013/2597",
    industry: "Food & Beverage",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Controls on food additives and materials in contact with food."
  },

  // Healthcare & Medical
  {
    name: "Medicines Act 1968",
    link: "https://www.legislation.gov.uk/ukpga/1968/67",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Primary legislation governing medicines regulation and licensing."
  },
  {
    name: "Medical Devices Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/618",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety and performance requirements for medical devices."
  },
  {
    name: "Ionising Radiations Regulations 2017",
    link: "https://www.legislation.gov.uk/uksi/2017/1075",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Protection of workers and public from ionising radiation."
  },
  {
    name: "Care Quality Commission (Registration) Regulations 2009",
    link: "https://www.legislation.gov.uk/uksi/2009/3112",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Corporate",
    notes: "Registration requirements for health and social care providers."
  },

  // Environmental Protection
  {
    name: "Environmental Permitting (England and Wales) Regulations 2016",
    link: "https://www.legislation.gov.uk/uksi/2016/1154",
    industry: "All Industries",
    riskLevel: "High",
    type: "Environmental",
    notes: "Consolidated environmental permitting regime for emissions and waste."
  },
  {
    name: "Water Resources Act 1991",
    link: "https://www.legislation.gov.uk/ukpga/1991/57",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Protection of water resources including abstraction licensing."
  },
  {
    name: "Clean Air Act 1993",
    link: "https://www.legislation.gov.uk/ukpga/1993/11",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Controls on air pollution including smoke control areas."
  },
  {
    name: "Pollution Prevention and Control Act 1999",
    link: "https://www.legislation.gov.uk/ukpga/1999/24",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Environmental",
    notes: "Integrated pollution prevention and control for industrial installations."
  },
  {
    name: "Hazardous Waste (England and Wales) Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/894",
    industry: "All Industries",
    riskLevel: "High",
    type: "Environmental",
    notes: "Controls on the management of hazardous waste."
  },
  {
    name: "Landfill (England and Wales) Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/1559",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Requirements for landfill operations and waste acceptance."
  },

  // Employment & Workers' Rights  
  {
    name: "Trade Union and Labour Relations (Consolidation) Act 1992",
    link: "https://www.legislation.gov.uk/ukpga/1992/52",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Trade union rights, collective bargaining and industrial action."
  },
  {
    name: "Employment Act 2002",
    link: "https://www.legislation.gov.uk/ukpga/2002/22",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Parental leave, flexible working and employment tribunal procedures."
  },
  {
    name: "Part-time Workers (Prevention of Less Favourable Treatment) Regulations 2000",
    link: "https://www.legislation.gov.uk/uksi/2000/1551",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Employment",
    notes: "Equal treatment rights for part-time workers."
  },
  {
    name: "Fixed-term Employees (Prevention of Less Favourable Treatment) Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/2034",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Employment",
    notes: "Rights of fixed-term employees compared to permanent employees."
  },
  {
    name: "Transfer of Undertakings (Protection of Employment) Regulations 2006",
    link: "https://www.legislation.gov.uk/uksi/2006/246",
    industry: "All Industries",
    riskLevel: "High",
    type: "Employment",
    notes: "TUPE - protection of employees when business transfers."
  },
  {
    name: "Agency Workers Regulations 2010",
    link: "https://www.legislation.gov.uk/uksi/2010/93",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Employment",
    notes: "Equal treatment rights for agency workers after 12 weeks."
  },

  // Data Protection & Privacy
  {
    name: "Privacy and Electronic Communications (EC Directive) Regulations 2003",
    link: "https://www.legislation.gov.uk/uksi/2003/2426",
    industry: "All Industries",
    riskLevel: "High",
    type: "Data Protection",
    notes: "PECR - privacy rules for electronic communications including cookies."
  },
  {
    name: "Freedom of Information Act 2000",
    link: "https://www.legislation.gov.uk/ukpga/2000/36",
    industry: "Public Sector",
    riskLevel: "Medium",
    type: "Data Protection",
    notes: "Public right of access to information held by public authorities."
  },

  // Financial Services
  {
    name: "Financial Services and Markets Act 2000",
    link: "https://www.legislation.gov.uk/ukpga/2000/8",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Corporate",
    notes: "Framework for financial services regulation in the UK."
  },
  {
    name: "Money Laundering, Terrorist Financing and Transfer of Funds Regulations 2017",
    link: "https://www.legislation.gov.uk/uksi/2017/692",
    industry: "Financial Services",
    riskLevel: "High",
    type: "Corporate",
    notes: "Anti-money laundering requirements for regulated businesses."
  },

  // Consumer Protection
  {
    name: "Consumer Protection Act 1987",
    link: "https://www.legislation.gov.uk/ukpga/1987/43",
    industry: "All Industries",
    riskLevel: "High",
    type: "Consumer Protection",
    notes: "Product liability and consumer safety requirements."
  },
  {
    name: "Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013",
    link: "https://www.legislation.gov.uk/uksi/2013/3134",
    industry: "Retail",
    riskLevel: "Medium",
    type: "Consumer Protection",
    notes: "Information requirements and cancellation rights for consumers."
  },
  {
    name: "Unfair Trading Regulations 2008",
    link: "https://www.legislation.gov.uk/uksi/2008/1277",
    industry: "Retail",
    riskLevel: "Medium",
    type: "Consumer Protection",
    notes: "Prohibiting unfair commercial practices towards consumers."
  },
  {
    name: "General Product Safety Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/1803",
    industry: "All Industries",
    riskLevel: "High",
    type: "Consumer Protection",
    notes: "General safety requirements for consumer products."
  },

  // Utilities & Energy
  {
    name: "Gas Act 1986",
    link: "https://www.legislation.gov.uk/ukpga/1986/44",
    industry: "Utilities",
    riskLevel: "High",
    type: "Corporate",
    notes: "Regulation of gas industry including supply and transportation."
  },
  {
    name: "Electricity Act 1989",
    link: "https://www.legislation.gov.uk/ukpga/1989/29",
    industry: "Utilities",
    riskLevel: "High",
    type: "Corporate",
    notes: "Regulation of electricity industry including generation and supply."
  },
  {
    name: "Energy Act 2008",
    link: "https://www.legislation.gov.uk/ukpga/2008/32",
    industry: "Utilities",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Carbon capture and storage, renewable energy obligations."
  },

  // Telecommunications & Broadcasting
  {
    name: "Communications Act 2003",
    link: "https://www.legislation.gov.uk/ukpga/2003/21",
    industry: "Technology",
    riskLevel: "Medium",
    type: "Corporate",
    notes: "Regulation of electronic communications and broadcasting."
  },
  {
    name: "Wireless Telegraphy Act 2006",
    link: "https://www.legislation.gov.uk/ukpga/2006/36",
    industry: "Technology",
    riskLevel: "Medium",
    type: "Corporate",
    notes: "Licensing and regulation of radio spectrum use."
  },

  // Aviation & Maritime
  {
    name: "Civil Aviation Act 1982",
    link: "https://www.legislation.gov.uk/ukpga/1982/16",
    industry: "Transport",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Regulation of civil aviation including safety requirements."
  },
  {
    name: "Merchant Shipping Act 1995",
    link: "https://www.legislation.gov.uk/ukpga/1995/21",
    industry: "Transport",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety and regulation of merchant shipping operations."
  },
  {
    name: "Air Navigation Order 2016",
    link: "https://www.legislation.gov.uk/uksi/2016/765",
    industry: "Transport",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Rules for aircraft operation, airworthiness and personnel licensing."
  },

  // Agriculture & Rural
  {
    name: "Agriculture Act 2020",
    link: "https://www.legislation.gov.uk/ukpga/2020/21",
    industry: "Agriculture",
    riskLevel: "Medium",
    type: "Corporate",
    notes: "Post-Brexit agricultural policy including environmental land management."
  },
  {
    name: "Animal Welfare Act 2006",
    link: "https://www.legislation.gov.uk/ukpga/2006/45",
    industry: "Agriculture",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Duty of care towards animals and prevention of cruelty."
  },
  {
    name: "Food and Environment Protection Act 1985",
    link: "https://www.legislation.gov.uk/ukpga/1985/48",
    industry: "Agriculture",
    riskLevel: "High",
    type: "Environmental",
    notes: "Control of pesticides and protection of food and environment."
  },

  // Nuclear & Radioactive Materials
  {
    name: "Nuclear Installations Act 1965",
    link: "https://www.legislation.gov.uk/ukpga/1965/57",
    industry: "Utilities",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Licensing and safety of nuclear installations."
  },
  {
    name: "Radioactive Substances Act 1993",
    link: "https://www.legislation.gov.uk/ukpga/1993/12",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Controls on radioactive substances and disposal of radioactive waste."
  },

  // Mining & Quarrying
  {
    name: "Mines and Quarries Act 1954",
    link: "https://www.legislation.gov.uk/ukpga/Eliz2/2-3/70",
    industry: "Mining",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety requirements for mines and quarries operations."
  },
  {
    name: "Quarries Regulations 1999",
    link: "https://www.legislation.gov.uk/uksi/1999/2024",
    industry: "Mining",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Health and safety requirements specific to quarry operations."
  },

  // Intellectual Property
  {
    name: "Patents Act 1977",
    link: "https://www.legislation.gov.uk/ukpga/1977/37",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Corporate",
    notes: "Patent protection for inventions and innovations."
  },
  {
    name: "Copyright, Designs and Patents Act 1988",
    link: "https://www.legislation.gov.uk/ukpga/1988/48",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Corporate",
    notes: "Copyright protection for creative works and designs."
  },
  {
    name: "Trade Marks Act 1994",
    link: "https://www.legislation.gov.uk/ukpga/1994/26",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Corporate",
    notes: "Registration and protection of trade marks."
  },

  // Recent Key Legislation
  {
    name: "Corporate Insolvency and Governance Act 2020",
    link: "https://www.legislation.gov.uk/ukpga/2020/12",
    industry: "All Industries",
    riskLevel: "High",
    type: "Corporate",
    notes: "Emergency measures for company insolvency during COVID-19 and beyond."
  },
  {
    name: "Coronavirus Act 2020",
    link: "https://www.legislation.gov.uk/ukpga/2020/7",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Emergency powers to respond to coronavirus pandemic."
  },
  {
    name: "Finance Act 2021",
    link: "https://www.legislation.gov.uk/ukpga/2021/26",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Corporate",
    notes: "Annual tax legislation including corporation tax and VAT changes."
  },
  {
    name: "Professional Qualifications Act 2022",
    link: "https://www.legislation.gov.uk/ukpga/2022/20",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Employment",
    notes: "Recognition of professional qualifications post-Brexit."
  }
];

async function addComprehensiveLegislation() {
  let pool;
  
  try {
    console.log('🚀 Adding comprehensive real UK legislation to Azure V7-Dev...\n');
    
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('✅ Connected to database');
    
    // Check current count
    const countResult = await pool.request()
      .query('SELECT COUNT(*) as count FROM LegalRegister');
    console.log(`📊 Current records in database: ${countResult.recordset[0].count}`);
    
    console.log(`📝 Adding ${additionalLegislation.length} additional real legislation records...`);
    
    let successCount = 0;
    for (const legislation of additionalLegislation) {
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
    
    console.log(`\n🎉 Successfully added ${successCount} out of ${additionalLegislation.length} additional legislation records`);
    
    // Final count
    const finalCountResult = await pool.request()
      .query('SELECT COUNT(*) as count FROM LegalRegister');
    console.log(`📊 Total records now in database: ${finalCountResult.recordset[0].count}`);
    
    // Show industry breakdown
    const industryBreakdown = await pool.request().query(`
      SELECT IndustryName, COUNT(*) as Count
      FROM LegalRegister 
      GROUP BY IndustryName
      ORDER BY Count DESC
    `);
    
    console.log('\n📋 Industry breakdown:');
    industryBreakdown.recordset.forEach(item => {
      console.log(`- ${item.IndustryName}: ${item.Count} items`);
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

// Run the addition
console.log('🚀 Starting comprehensive legislation addition...\n');
addComprehensiveLegislation()
  .then(() => {
    console.log('\n✅ Addition complete! Your Legal Register now has comprehensive real UK legislation.');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Addition failed:', err);
    process.exit(1);
  });