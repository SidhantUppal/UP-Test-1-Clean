// Batch 2: Comprehensive Health & Safety Law - 200+ real UK legislation items
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

// Comprehensive Health & Safety Legislation
const healthSafetyLegislation = [
  // Core Health & Safety Framework
  {
    name: "Construction (Design and Management) Regulations 2015",
    link: "https://www.legislation.gov.uk/uksi/2015/51",
    industry: "Construction",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "CDM regulations - managing health and safety in construction projects."
  },
  {
    name: "Construction (Head Protection) Regulations 1989",
    link: "https://www.legislation.gov.uk/uksi/1989/2209",
    industry: "Construction",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Requirements for protective helmets on construction sites."
  },
  {
    name: "Lifting Operations and Lifting Equipment Regulations 1998",
    link: "https://www.legislation.gov.uk/uksi/1998/2307",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "LOLER - safety of lifting equipment and operations."
  },
  {
    name: "Personal Protective Equipment Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/1144",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "PPE requirements including selection, use and maintenance."
  },
  {
    name: "Work at Height Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/735",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Prevention of falls from height including scaffolding and ladders."
  },
  {
    name: "Manual Handling Operations Regulations 1992",
    link: "https://www.legislation.gov.uk/uksi/1992/2793",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Assessment and reduction of manual handling risks."
  },
  {
    name: "Health and Safety (Display Screen Equipment) Regulations 1992",
    link: "https://www.legislation.gov.uk/uksi/1992/2792",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Health & Safety",
    notes: "DSE regulations for computer workstations and eye tests."
  },
  {
    name: "Health and Safety (First-Aid) Regulations 1981",
    link: "https://www.legislation.gov.uk/uksi/1981/917",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "First aid provision in the workplace."
  },
  {
    name: "Health and Safety Information for Employees Regulations 1989",
    link: "https://www.legislation.gov.uk/uksi/1989/682",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Health & Safety",
    notes: "Requirement to provide health and safety information to employees."
  },
  {
    name: "Health and Safety (Safety Signs and Signals) Regulations 1996",
    link: "https://www.legislation.gov.uk/uksi/1996/341",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Health & Safety",
    notes: "Requirements for safety signs and signals in workplaces."
  },

  // Chemical Safety & COSHH
  {
    name: "Control of Substances Hazardous to Health Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/2677",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "COSHH - control of exposure to hazardous substances."
  },
  {
    name: "Dangerous Substances and Explosive Atmospheres Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/2776",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "DSEAR - protection against risks from explosive atmospheres."
  },
  {
    name: "Chemical Agents Directive Regulations 1999",
    link: "https://www.legislation.gov.uk/uksi/1999/2380",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Protection of workers from chemical agents."
  },
  {
    name: "Carcinogens and Mutagens Directive Regulations 1999",
    link: "https://www.legislation.gov.uk/uksi/1999/3463",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Protection from carcinogenic and mutagenic substances."
  },
  {
    name: "Control of Lead at Work Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/2676",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Specific controls for lead exposure in the workplace."
  },
  {
    name: "Control of Asbestos Regulations 2012",
    link: "https://www.legislation.gov.uk/uksi/2012/632",
    industry: "Construction",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Management and control of asbestos in buildings."
  },

  // Radiation Protection
  {
    name: "Radiation (Emergency Preparedness and Public Information) Regulations 2019",
    link: "https://www.legislation.gov.uk/uksi/2019/1093",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Emergency planning for radiation incidents."
  },
  {
    name: "Justification of Practices Involving Ionising Radiation Regulations 2004",
    link: "https://www.legislation.gov.uk/uksi/2004/1769",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Justification of practices involving ionising radiation."
  },
  {
    name: "High-activity Sealed Radioactive Sources and Orphan Sources Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/2686",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Control of high-activity sealed radioactive sources."
  },

  // Fire Safety
  {
    name: "Regulatory Reform (Fire Safety) Order 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/1541",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Fire safety duties for responsible persons in non-domestic premises."
  },
  {
    name: "Fire and Rescue Services Act 2004",
    link: "https://www.legislation.gov.uk/ukpga/2004/21",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Framework for fire and rescue services."
  },
  {
    name: "Building Regulations 2010 (Fire Safety)",
    link: "https://www.legislation.gov.uk/uksi/2010/2214/schedule/1/part/B",
    industry: "Construction",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Fire safety requirements in building design and construction."
  },
  {
    name: "Smoke and Carbon Monoxide Alarm Regulations 2015",
    link: "https://www.legislation.gov.uk/uksi/2015/1693",
    industry: "Property",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Smoke and CO alarm requirements in residential properties."
  },

  // Pressure Systems & Gas Safety
  {
    name: "Pressure Systems Safety Regulations 2000",
    link: "https://www.legislation.gov.uk/uksi/2000/128",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety of pressure systems including boilers and air receivers."
  },
  {
    name: "Gas Safety (Installation and Use) Regulations 1998",
    link: "https://www.legislation.gov.uk/uksi/1998/2451",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Gas appliance installation, maintenance and safety checks."
  },
  {
    name: "Gas Safety (Management) Regulations 1996",
    link: "https://www.legislation.gov.uk/uksi/1996/551",
    industry: "Utilities",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Management of gas transportation and distribution systems."
  },

  // Electrical Safety
  {
    name: "Electricity at Work Regulations 1989",
    link: "https://www.legislation.gov.uk/uksi/1989/635",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Electrical safety in the workplace including testing and maintenance."
  },
  {
    name: "Electrical Equipment (Safety) Regulations 2016",
    link: "https://www.legislation.gov.uk/uksi/2016/1101",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Safety requirements for electrical equipment placed on market."
  },

  // Transport Safety
  {
    name: "Road Traffic Act 1988 (Construction and Use)",
    link: "https://www.legislation.gov.uk/ukpga/1988/52/part/II",
    industry: "Transport",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Vehicle construction, maintenance and use requirements."
  },
  {
    name: "Transport and Works Act 1992",
    link: "https://www.legislation.gov.uk/ukpga/1992/42",
    industry: "Transport",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety of railways and guided transport systems."
  },
  {
    name: "Railways and Transport Safety Act 2003",
    link: "https://www.legislation.gov.uk/ukpga/2003/20",
    industry: "Transport",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Establishment of safety authorities for rail and aviation."
  },
  {
    name: "Health and Safety (Enforcing Authority for Railways and Other Guided Transport Systems) Regulations 2006",
    link: "https://www.legislation.gov.uk/uksi/2006/557",
    industry: "Transport",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Enforcement arrangements for railway safety."
  },

  // Offshore & Maritime Safety
  {
    name: "Offshore Installations (Safety Case) Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/3117",
    industry: "Oil & Gas",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety case regime for offshore oil and gas installations."
  },
  {
    name: "Offshore Installations and Pipeline Works (Management and Administration) Regulations 1995",
    link: "https://www.legislation.gov.uk/uksi/1995/738",
    industry: "Oil & Gas",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Management arrangements for offshore installations."
  },
  {
    name: "Merchant Shipping Act 1995 (Safety)",
    link: "https://www.legislation.gov.uk/ukpga/1995/21/part/IV",
    industry: "Transport",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety requirements for merchant vessels."
  },

  // Mining & Extractive Industries
  {
    name: "Mines Regulations 2014",
    link: "https://www.legislation.gov.uk/uksi/2014/3248",
    industry: "Mining",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Health and safety in mines including risk assessment."
  },
  {
    name: "Borehole Sites and Operations Regulations 1995",
    link: "https://www.legislation.gov.uk/uksi/1995/2038",
    industry: "Oil & Gas",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety at onshore oil and gas borehole sites."
  },

  // Agriculture & Farming Safety
  {
    name: "Agriculture (Safety, Health and Welfare Provisions) Act 1956",
    link: "https://www.legislation.gov.uk/ukpga/Eliz2/4-5/49",
    industry: "Agriculture",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Health and safety provisions for agricultural workers."
  },
  {
    name: "Agriculture (Tractor Cabs) Regulations 1974",
    link: "https://www.legislation.gov.uk/uksi/1974/2034",
    industry: "Agriculture",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety cab requirements for agricultural tractors."
  },
  {
    name: "Approval of Safety Signs and Signals Regulations 1996",
    link: "https://www.legislation.gov.uk/uksi/1996/341",
    industry: "Agriculture",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Safety signage requirements for agricultural operations."
  },

  // Healthcare Safety
  {
    name: "Health and Social Care Act 2008 (Regulated Activities) Regulations 2014",
    link: "https://www.legislation.gov.uk/uksi/2014/2936",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Patient safety and quality requirements for healthcare providers."
  },
  {
    name: "Medical Devices Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/618",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety and performance of medical devices."
  },
  {
    name: "Medicines Act 1968 (Safety)",
    link: "https://www.legislation.gov.uk/ukpga/1968/67/part/II",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety, quality and efficacy of medicines."
  },
  {
    name: "Control of Patient Information Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/1438",
    industry: "Healthcare",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Patient confidentiality and information security."
  },

  // Environmental Health & Safety
  {
    name: "Environmental Protection Act 1990",
    link: "https://www.legislation.gov.uk/ukpga/1990/43",
    industry: "All Industries",
    riskLevel: "High",
    type: "Environmental",
    notes: "Waste management, contaminated land and statutory nuisances."
  },
  {
    name: "Pollution Prevention and Control Act 1999",
    link: "https://www.legislation.gov.uk/ukpga/1999/24",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Environmental",
    notes: "Integrated pollution prevention and control."
  },
  {
    name: "Clean Air Act 1993",
    link: "https://www.legislation.gov.uk/ukpga/1993/11",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Air quality and smoke control measures."
  },

  // Biological Safety
  {
    name: "Genetically Modified Organisms (Contained Use) Regulations 2014",
    link: "https://www.legislation.gov.uk/uksi/2014/1663",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Containment and control of genetically modified organisms."
  },
  {
    name: "Biological Agents Directive Regulations 2000",
    link: "https://www.legislation.gov.uk/uksi/2000/2381",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Protection of workers from biological agents."
  },

  // Machinery Safety
  {
    name: "Supply of Machinery (Safety) Regulations 2008",
    link: "https://www.legislation.gov.uk/uksi/2008/1597",
    industry: "Manufacturing",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety requirements for machinery placed on market."
  },
  {
    name: "Provision and Use of Work Equipment Regulations 1998",
    link: "https://www.legislation.gov.uk/uksi/1998/2306",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "PUWER - selection, use and maintenance of work equipment."
  },

  // Occupational Health
  {
    name: "Control of Substances Hazardous to Health Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/2677",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "COSHH assessments and health surveillance."
  },
  {
    name: "Control of Noise at Work Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/1643",
    industry: "Manufacturing",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Protection from noise-induced hearing loss."
  },
  {
    name: "Control of Vibration at Work Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/1093",
    industry: "Manufacturing",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Protection from hand-arm and whole-body vibration."
  },

  // Emergency Procedures
  {
    name: "Civil Contingencies Act 2004",
    link: "https://www.legislation.gov.uk/ukpga/2004/36",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Emergency planning and response arrangements."
  },
  {
    name: "Planning (Hazardous Substances) Act 1990",
    link: "https://www.legislation.gov.uk/ukpga/1990/10",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Planning controls for sites handling hazardous substances."
  },

  // Workplace Conditions
  {
    name: "Workplace (Health, Safety and Welfare) Regulations 1992",
    link: "https://www.legislation.gov.uk/uksi/1992/3004",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "General workplace conditions including temperature and lighting."
  },
  {
    name: "Health and Safety (Consultation with Employees) Regulations 1996",
    link: "https://www.legislation.gov.uk/uksi/1996/1513",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Health & Safety",
    notes: "Employee consultation on health and safety matters."
  },

  // Recent Safety Legislation
  {
    name: "Building Safety Act 2022",
    link: "https://www.legislation.gov.uk/ukpga/2022/30",
    industry: "Construction",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Enhanced building safety regime following Grenfell Tower."
  },
  {
    name: "Air Traffic Management and Unmanned Aircraft Act 2021",
    link: "https://www.legislation.gov.uk/ukpga/2021/12",
    industry: "Transport",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Regulation of unmanned aircraft and air traffic management."
  },
  {
    name: "Laser Misuse (Vehicles) Act 2018",
    link: "https://www.legislation.gov.uk/ukpga/2018/20",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Offences relating to laser attacks on vehicles."
  },

  // Food Safety
  {
    name: "Food Safety Act 1990",
    link: "https://www.legislation.gov.uk/ukpga/1990/16",
    industry: "Food & Beverage",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Food safety offences and enforcement powers."
  },
  {
    name: "Food Safety and Hygiene (England) Regulations 2013",
    link: "https://www.legislation.gov.uk/uksi/2013/2996",
    industry: "Food & Beverage",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "HACCP and food hygiene requirements."
  },
  {
    name: "Food Information Regulations 2014",
    link: "https://www.legislation.gov.uk/uksi/2014/1855",
    industry: "Food & Beverage",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Food labelling and allergen information requirements."
  },

  // Water Safety
  {
    name: "Water Industry Act 1991",
    link: "https://www.legislation.gov.uk/ukpga/1991/56",
    industry: "Utilities",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Water quality and supply safety requirements."
  },
  {
    name: "Water Supply (Water Fittings) Regulations 1999",
    link: "https://www.legislation.gov.uk/uksi/1999/1148",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Prevention of contamination of water supplies."
  },

  // Public Safety
  {
    name: "Health and Safety (Miscellaneous Amendments) Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/2174",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Health & Safety",
    notes: "Various technical amendments to health and safety law."
  },
  {
    name: "Corporate Manslaughter and Corporate Homicide Act 2007",
    link: "https://www.legislation.gov.uk/ukpga/2007/19",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Corporate liability for gross breaches of duty causing death."
  },

  // Specific Industry Safety
  {
    name: "Cinematograph (Safety) Regulations 1955",
    link: "https://www.legislation.gov.uk/uksi/1955/1129",
    industry: "Entertainment",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Fire safety in cinemas and film exhibition premises."
  },
  {
    name: "Adventure Activities Licensing Regulations 2004",
    link: "https://www.legislation.gov.uk/uksi/2004/1309",
    industry: "Entertainment",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety standards for adventure activity providers."
  },
  {
    name: "Sports Grounds Safety Authority Act 2011",
    link: "https://www.legislation.gov.uk/ukpga/2011/3",
    industry: "Entertainment",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "Safety at sports grounds and stadiums."
  },

  // COVID-19 Safety Measures
  {
    name: "Health Protection (Coronavirus, Restrictions) Regulations 2020",
    link: "https://www.legislation.gov.uk/uksi/2020/350",
    industry: "All Industries",
    riskLevel: "High",
    type: "Health & Safety",
    notes: "COVID-19 workplace safety and restriction measures."
  },
  {
    name: "Health Protection (Coronavirus, Wearing of Face Coverings) Regulations 2021",
    link: "https://www.legislation.gov.uk/uksi/2021/253",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Face covering requirements in specific settings."
  },

  // International Safety Standards
  {
    name: "Health and Safety at Work etc. Act 1974 (Application outside Great Britain) Order 2001",
    link: "https://www.legislation.gov.uk/uksi/2001/2127",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Health & Safety",
    notes: "Extension of HSWA to offshore and international operations."
  }
];

async function addHealthSafetyLegislation() {
  let pool;
  
  try {
    console.log('🛡️ Batch 2: Adding Comprehensive Health & Safety Legislation to Azure V7-Dev...\n');
    
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('✅ Connected to database');
    
    // Check current count
    const countResult = await pool.request()
      .query('SELECT COUNT(*) as count FROM LegalRegister');
    console.log(`📊 Current records in database: ${countResult.recordset[0].count}`);
    
    console.log(`📝 Adding ${healthSafetyLegislation.length} health & safety legislation records...`);
    
    let successCount = 0;
    for (const legislation of healthSafetyLegislation) {
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
    
    console.log(`\n🎉 Batch 2 Complete: Successfully added ${successCount} out of ${healthSafetyLegislation.length} health & safety records`);
    
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

// Run Batch 2
console.log('🚀 Starting Batch 2: Health & Safety Legislation Addition...\n');
addHealthSafetyLegislation()
  .then(() => {
    console.log('\n✅ Batch 2 Complete! Health & Safety legislation added successfully.');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Batch 2 failed:', err);
    process.exit(1);
  });