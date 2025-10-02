// Script to import comprehensive HSE legislation from legislation.gov.uk
// This script fetches all relevant Health, Safety & Environment legislation
// Enhanced version with better error handling and logging

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced logging functionality
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
  console.log(logMessage);
  
  // Append to log file
  const logFile = path.join(__dirname, 'legislation-import.log');
  fs.appendFileSync(logFile, logMessage + '\n');
}

function logError(message, error = null) {
  log(`${message}${error ? ': ' + error.message : ''}`, 'error');
  if (error && error.stack) {
    log(`Stack trace: ${error.stack}`, 'error');
  }
}

function logSuccess(message) {
  log(message, 'success');
}

function logWarning(message) {
  log(message, 'warning');
}

// Comprehensive list of HSE-related legislation to import
const hseLegislation = [
  // Core Health & Safety Acts
  { name: "Health and Safety at Work etc. Act 1974", year: 1974, type: "Health & Safety", link: "https://www.legislation.gov.uk/ukpga/1974/37/contents", industry: "All Industries", risk: "High" },
  { name: "Health and Safety (Offences) Act 2008", year: 2008, type: "Health & Safety", link: "https://www.legislation.gov.uk/ukpga/2008/20/contents", industry: "All Industries", risk: "High" },
  { name: "Factories Act 1961", year: 1961, type: "Health & Safety", link: "https://www.legislation.gov.uk/ukpga/1961/34/contents", industry: "Manufacturing", risk: "High" },
  { name: "Offices, Shops and Railway Premises Act 1963", year: 1963, type: "Health & Safety", link: "https://www.legislation.gov.uk/ukpga/1963/41/contents", industry: "Retail", risk: "Medium" },
  { name: "Fire Precautions Act 1971", year: 1971, type: "Fire Safety", link: "https://www.legislation.gov.uk/ukpga/1971/40/contents", industry: "All Industries", risk: "High" },
  { name: "Regulatory Reform (Fire Safety) Order 2005", year: 2005, type: "Fire Safety", link: "https://www.legislation.gov.uk/uksi/2005/1541/contents", industry: "All Industries", risk: "High" },
  
  // Environmental Protection Acts
  { name: "Environmental Protection Act 1990", year: 1990, type: "Environmental", link: "https://www.legislation.gov.uk/ukpga/1990/43/contents", industry: "All Industries", risk: "High" },
  { name: "Environment Act 1995", year: 1995, type: "Environmental", link: "https://www.legislation.gov.uk/ukpga/1995/25/contents", industry: "All Industries", risk: "High" },
  { name: "Environment Act 2021", year: 2021, type: "Environmental", link: "https://www.legislation.gov.uk/ukpga/2021/30/contents", industry: "All Industries", risk: "High" },
  { name: "Clean Air Act 1993", year: 1993, type: "Environmental", link: "https://www.legislation.gov.uk/ukpga/1993/11/contents", industry: "Manufacturing", risk: "High" },
  { name: "Water Resources Act 1991", year: 1991, type: "Environmental", link: "https://www.legislation.gov.uk/ukpga/1991/57/contents", industry: "Manufacturing", risk: "High" },
  { name: "Water Industry Act 1991", year: 1991, type: "Environmental", link: "https://www.legislation.gov.uk/ukpga/1991/56/contents", industry: "Utilities", risk: "High" },
  { name: "Water Act 2003", year: 2003, type: "Environmental", link: "https://www.legislation.gov.uk/ukpga/2003/37/contents", industry: "Utilities", risk: "Medium" },
  { name: "Water Act 2014", year: 2014, type: "Environmental", link: "https://www.legislation.gov.uk/ukpga/2014/21/contents", industry: "Utilities", risk: "Medium" },
  { name: "Climate Change Act 2008", year: 2008, type: "Environmental", link: "https://www.legislation.gov.uk/ukpga/2008/27/contents", industry: "All Industries", risk: "High" },
  { name: "Pollution Prevention and Control Act 1999", year: 1999, type: "Environmental", link: "https://www.legislation.gov.uk/ukpga/1999/24/contents", industry: "Manufacturing", risk: "High" },
  
  // Hazardous Substances & Chemicals
  { name: "Control of Substances Hazardous to Health Regulations 2002 (COSHH)", year: 2002, type: "Hazardous Materials", link: "https://www.legislation.gov.uk/uksi/2002/2677/contents", industry: "All Industries", risk: "High" },
  { name: "REACH Enforcement Regulations 2008", year: 2008, type: "Chemical Safety", link: "https://www.legislation.gov.uk/uksi/2008/2852/contents", industry: "Manufacturing", risk: "High" },
  { name: "Control of Major Accident Hazards Regulations 2015 (COMAH)", year: 2015, type: "Hazardous Materials", link: "https://www.legislation.gov.uk/uksi/2015/483/contents", industry: "Chemical", risk: "High" },
  { name: "Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR)", year: 2002, type: "Hazardous Materials", link: "https://www.legislation.gov.uk/uksi/2002/2776/contents", industry: "Manufacturing", risk: "High" },
  { name: "Explosives Act 1875", year: 1875, type: "Hazardous Materials", link: "https://www.legislation.gov.uk/ukpga/1875/17/contents", industry: "Mining", risk: "High" },
  { name: "Radioactive Substances Act 1993", year: 1993, type: "Radiation Safety", link: "https://www.legislation.gov.uk/ukpga/1993/12/contents", industry: "Healthcare", risk: "High" },
  
  // Workplace Regulations
  { name: "Workplace (Health, Safety and Welfare) Regulations 1992", year: 1992, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/1992/3004/contents", industry: "All Industries", risk: "High" },
  { name: "Management of Health and Safety at Work Regulations 1999", year: 1999, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/1999/3242/contents", industry: "All Industries", risk: "High" },
  { name: "Personal Protective Equipment at Work Regulations 1992", year: 1992, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/1992/2966/contents", industry: "All Industries", risk: "High" },
  { name: "Manual Handling Operations Regulations 1992", year: 1992, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/1992/2793/contents", industry: "All Industries", risk: "Medium" },
  { name: "Display Screen Equipment Regulations 1992", year: 1992, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/1992/2792/contents", industry: "Technology", risk: "Medium" },
  { name: "Noise at Work Regulations 2005", year: 2005, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/2005/1643/contents", industry: "Manufacturing", risk: "High" },
  { name: "Vibration at Work Regulations 2005", year: 2005, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/2005/1093/contents", industry: "Construction", risk: "High" },
  
  // Construction & Working at Height
  { name: "Construction (Design and Management) Regulations 2015 (CDM)", year: 2015, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/2015/51/contents", industry: "Construction", risk: "High" },
  { name: "Work at Height Regulations 2005", year: 2005, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/2005/735/contents", industry: "Construction", risk: "High" },
  { name: "Construction (Health, Safety and Welfare) Regulations 1996", year: 1996, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/1996/1592/contents", industry: "Construction", risk: "High" },
  { name: "Lifting Operations and Lifting Equipment Regulations 1998 (LOLER)", year: 1998, type: "Equipment Safety", link: "https://www.legislation.gov.uk/uksi/1998/2307/contents", industry: "Construction", risk: "High" },
  { name: "Provision and Use of Work Equipment Regulations 1998 (PUWER)", year: 1998, type: "Equipment Safety", link: "https://www.legislation.gov.uk/uksi/1998/2306/contents", industry: "All Industries", risk: "High" },
  
  // Electrical & Gas Safety
  { name: "Electricity at Work Regulations 1989", year: 1989, type: "Electrical Safety", link: "https://www.legislation.gov.uk/uksi/1989/635/contents", industry: "All Industries", risk: "High" },
  { name: "Electrical Equipment (Safety) Regulations 2016", year: 2016, type: "Electrical Safety", link: "https://www.legislation.gov.uk/uksi/2016/1101/contents", industry: "Manufacturing", risk: "High" },
  { name: "Gas Safety (Installation and Use) Regulations 1998", year: 1998, type: "Gas Safety", link: "https://www.legislation.gov.uk/uksi/1998/2451/contents", industry: "Construction", risk: "High" },
  { name: "Pressure Systems Safety Regulations 2000", year: 2000, type: "Equipment Safety", link: "https://www.legislation.gov.uk/uksi/2000/128/contents", industry: "Manufacturing", risk: "High" },
  { name: "Pressure Equipment (Safety) Regulations 2016", year: 2016, type: "Equipment Safety", link: "https://www.legislation.gov.uk/uksi/2016/1105/contents", industry: "Manufacturing", risk: "High" },
  
  // Reporting & First Aid
  { name: "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR)", year: 2013, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/2013/1471/contents", industry: "All Industries", risk: "High" },
  { name: "Health and Safety (First-Aid) Regulations 1981", year: 1981, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/1981/917/contents", industry: "All Industries", risk: "Medium" },
  { name: "Safety Representatives and Safety Committees Regulations 1977", year: 1977, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/1977/500/contents", industry: "All Industries", risk: "Medium" },
  { name: "Health and Safety (Consultation with Employees) Regulations 1996", year: 1996, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/1996/1513/contents", industry: "All Industries", risk: "Medium" },
  
  // Industry Specific
  { name: "Mines Regulations 2014", year: 2014, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/2014/3248/contents", industry: "Mining", risk: "High" },
  { name: "Quarries Regulations 1999", year: 1999, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/1999/2024/contents", industry: "Mining", risk: "High" },
  { name: "Diving at Work Regulations 1997", year: 1997, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/1997/2776/contents", industry: "Maritime", risk: "High" },
  { name: "Merchant Shipping Act 1995", year: 1995, type: "Health & Safety", link: "https://www.legislation.gov.uk/ukpga/1995/21/contents", industry: "Maritime", risk: "High" },
  { name: "Railways and Other Guided Transport Systems (Safety) Regulations 2006 (ROGS)", year: 2006, type: "Rail Safety", link: "https://www.legislation.gov.uk/uksi/2006/599/contents", industry: "Transport", risk: "High" },
  { name: "Air Navigation Order 2016", year: 2016, type: "Aviation", link: "https://www.legislation.gov.uk/uksi/2016/765/contents", industry: "Aviation", risk: "High" },
  
  // Asbestos & Lead
  { name: "Control of Asbestos Regulations 2012", year: 2012, type: "Hazardous Materials", link: "https://www.legislation.gov.uk/uksi/2012/632/contents", industry: "Construction", risk: "High" },
  { name: "Control of Lead at Work Regulations 2002", year: 2002, type: "Hazardous Materials", link: "https://www.legislation.gov.uk/uksi/2002/2676/contents", industry: "Construction", risk: "High" },
  
  // Biological Agents & Radiation
  { name: "Control of Biological Agents at Work Regulations 1994", year: 1994, type: "Health & Safety", link: "https://www.legislation.gov.uk/uksi/1994/3246/contents", industry: "Healthcare", risk: "High" },
  { name: "Ionising Radiations Regulations 2017", year: 2017, type: "Radiation Safety", link: "https://www.legislation.gov.uk/uksi/2017/1075/contents", industry: "Healthcare", risk: "High" },
  { name: "Genetically Modified Organisms (Contained Use) Regulations 2014", year: 2014, type: "Biotechnology", link: "https://www.legislation.gov.uk/uksi/2014/1663/contents", industry: "Healthcare", risk: "High" },
  
  // Waste Management
  { name: "Waste Management Licensing Regulations 1994", year: 1994, type: "Environmental", link: "https://www.legislation.gov.uk/uksi/1994/1056/contents", industry: "Waste Management", risk: "High" },
  { name: "Hazardous Waste (England and Wales) Regulations 2005", year: 2005, type: "Environmental", link: "https://www.legislation.gov.uk/uksi/2005/894/contents", industry: "Waste Management", risk: "High" },
  { name: "Waste Electrical and Electronic Equipment Regulations 2013 (WEEE)", year: 2013, type: "Environmental", link: "https://www.legislation.gov.uk/uksi/2013/3113/contents", industry: "Technology", risk: "Medium" },
  { name: "Producer Responsibility Obligations (Packaging Waste) Regulations 2007", year: 2007, type: "Environmental", link: "https://www.legislation.gov.uk/uksi/2007/871/contents", industry: "Manufacturing", risk: "Medium" },
  
  // Wildlife & Conservation
  { name: "Wildlife and Countryside Act 1981", year: 1981, type: "Environmental", link: "https://www.legislation.gov.uk/ukpga/1981/69/contents", industry: "Construction", risk: "Medium" },
  { name: "Natural Environment and Rural Communities Act 2006", year: 2006, type: "Environmental", link: "https://www.legislation.gov.uk/ukpga/2006/16/contents", industry: "Agriculture", risk: "Medium" },
  { name: "Conservation of Habitats and Species Regulations 2017", year: 2017, type: "Environmental", link: "https://www.legislation.gov.uk/uksi/2017/1012/contents", industry: "Construction", risk: "Medium" },
  
  // Modern Acts (2020s)
  { name: "Building Safety Act 2022", year: 2022, type: "Building Safety", link: "https://www.legislation.gov.uk/ukpga/2022/30/contents", industry: "Construction", risk: "High" },
  { name: "Fire Safety Act 2021", year: 2021, type: "Fire Safety", link: "https://www.legislation.gov.uk/ukpga/2021/24/contents", industry: "Real Estate", risk: "High" },
  { name: "Levelling-up and Regeneration Act 2023", year: 2023, type: "Planning", link: "https://www.legislation.gov.uk/ukpga/2023/55/contents", industry: "Construction", risk: "Medium" }
];

// Enhanced data validation function
function validateLegislationItem(item, index) {
  const errors = [];
  
  if (!item.name || typeof item.name !== 'string' || item.name.trim().length === 0) {
    errors.push(`Item ${index}: Missing or invalid name`);
  }
  
  if (!item.link || typeof item.link !== 'string' || !item.link.startsWith('http')) {
    errors.push(`Item ${index}: Missing or invalid link`);
  }
  
  if (!item.industry || typeof item.industry !== 'string') {
    errors.push(`Item ${index}: Missing or invalid industry`);
  }
  
  if (!item.risk || !['High', 'Medium', 'Low'].includes(item.risk)) {
    errors.push(`Item ${index}: Invalid risk level (must be High, Medium, or Low)`);
  }
  
  if (!item.year || !Number.isInteger(item.year) || item.year < 1800 || item.year > new Date().getFullYear()) {
    errors.push(`Item ${index}: Invalid year`);
  }
  
  if (!item.type || typeof item.type !== 'string') {
    errors.push(`Item ${index}: Missing or invalid type`);
  }
  
  return errors;
}

// Function to prepare data for database insertion with validation
function prepareLegislationData() {
  log('Starting data preparation and validation...');
  
  const currentDate = new Date().toISOString();
  const errors = [];
  const warnings = [];
  
  // Validate all items first
  hseLegislation.forEach((item, index) => {
    const itemErrors = validateLegislationItem(item, index);
    errors.push(...itemErrors);
  });
  
  if (errors.length > 0) {
    logError('Data validation failed:');
    errors.forEach(error => logError(`  ${error}`));
    throw new Error(`Data validation failed with ${errors.length} errors`);
  }
  
  // Check for duplicates by name
  const nameSet = new Set();
  const duplicates = [];
  
  hseLegislation.forEach((item, index) => {
    const normalizedName = item.name.toLowerCase().trim();
    if (nameSet.has(normalizedName)) {
      duplicates.push(`Duplicate found at index ${index}: "${item.name}"`);
    } else {
      nameSet.add(normalizedName);
    }
  });
  
  if (duplicates.length > 0) {
    duplicates.forEach(duplicate => logWarning(duplicate));
  }
  
  // Prepare the data
  const preparedData = hseLegislation.map((item, index) => {
    try {
      return {
        Name: item.name.trim(),
        Link: item.link.trim(),
        IndustryName: item.industry.trim(),
        RiskLevel: item.risk,
        ComplianceStatus: "Under Review",
        Notes: `${item.type} legislation from ${item.year}. Requires compliance review.`,
        LegislationType: item.type.trim(),
        LatestUpdate: currentDate
      };
    } catch (error) {
      logError(`Error preparing item at index ${index}`, error);
      throw error;
    }
  });
  
  logSuccess(`Successfully prepared ${preparedData.length} HSE legislation items`);
  if (duplicates.length > 0) {
    logWarning(`Found ${duplicates.length} potential duplicates - review recommended`);
  }
  
  return preparedData;
}

// Enhanced main execution with error handling
async function main() {
  try {
    log('=== HSE Legislation Data Preparation Started ===');
    
    // Prepare and validate data
    const legislationData = prepareLegislationData();
    const outputPath = path.join(__dirname, 'hse-legislation-import.json');
    
    // Create backup if file exists
    if (fs.existsSync(outputPath)) {
      const backupPath = outputPath.replace('.json', `-backup-${Date.now()}.json`);
      fs.copyFileSync(outputPath, backupPath);
      logWarning(`Existing file backed up to: ${backupPath}`);
    }
    
    // Write the new file
    fs.writeFileSync(outputPath, JSON.stringify(legislationData, null, 2));
    logSuccess(`Data saved to: ${outputPath}`);
    
    // Generate summary report
    const report = {
      timestamp: new Date().toISOString(),
      totalItems: legislationData.length,
      industries: [...new Set(legislationData.map(item => item.IndustryName))].sort(),
      riskLevels: [...new Set(legislationData.map(item => item.RiskLevel))].sort(),
      legislationTypes: [...new Set(legislationData.map(item => item.LegislationType))].sort(),
      yearRange: {
        oldest: Math.min(...hseLegislation.map(item => item.year)),
        newest: Math.max(...hseLegislation.map(item => item.year))
      }
    };
    
    const reportPath = outputPath.replace('.json', '-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    logSuccess(`Summary report saved to: ${reportPath}`);
    
    // Display summary
    log('=== PREPARATION SUMMARY ===');
    log(`Total legislation items: ${report.totalItems}`);
    log(`Industries covered: ${report.industries.length} (${report.industries.join(', ')})`);
    log(`Risk levels: ${report.riskLevels.join(', ')}`);
    log(`Year range: ${report.yearRange.oldest} - ${report.yearRange.newest}`);
    log(`Legislation types: ${report.legislationTypes.length} different types`);
    
    log('\nNext steps:');
    log('1. Review the generated JSON file and report');
    log('2. Run: npm run import-legislation');
    log('3. Check the import log for any issues');
    log('=== Preparation Complete ===');
    
  } catch (error) {
    logError('Fatal error during preparation', error);
    process.exit(1);
  }
}

// Run the main function
main();