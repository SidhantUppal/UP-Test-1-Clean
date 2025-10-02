#!/usr/bin/env node

// Script to populate UK companies with random admin users
// Run with: node scripts/seed-uk-companies.js

const ukCompanies = [
  {
    name: "British Petroleum UK",
    domain: "bp-uk.co.uk",
    adminName: "Oliver Thompson",
    adminEmail: "oliver.thompson@bp-uk.co.uk",
    settings: {
      theme: "green",
      features: ["safety", "contractors", "permits", "training", "incidents"],
      maxUsers: 500,
      logo: "/logos/bp-uk.png"
    }
  },
  {
    name: "Network Rail Infrastructure",
    domain: "networkrail.co.uk",
    adminName: "Emma Richardson",
    adminEmail: "emma.richardson@networkrail.co.uk",
    settings: {
      theme: "red",
      features: ["safety", "permits", "contractors", "training"],
      maxUsers: 1000,
      logo: "/logos/network-rail.png"
    }
  },
  {
    name: "Thames Water Utilities",
    domain: "thameswater-ops.co.uk",
    adminName: "James Wilson",
    adminEmail: "james.wilson@thameswater-ops.co.uk",
    settings: {
      theme: "blue",
      features: ["safety", "contractors", "permits", "incidents"],
      maxUsers: 750,
      logo: "/logos/thames-water.png"
    }
  },
  {
    name: "Tesco Distribution Ltd",
    domain: "tesco-distribution.co.uk",
    adminName: "Sophie Davies",
    adminEmail: "sophie.davies@tesco-distribution.co.uk",
    settings: {
      theme: "blue",
      features: ["safety", "training", "contractors", "documents"],
      maxUsers: 800,
      logo: "/logos/tesco.png"
    }
  },
  {
    name: "National Grid ESO",
    domain: "nationalgrid-eso.co.uk",
    adminName: "William Johnson",
    adminEmail: "william.johnson@nationalgrid-eso.co.uk",
    settings: {
      theme: "purple",
      features: ["safety", "permits", "contractors", "training", "incidents"],
      maxUsers: 400,
      logo: "/logos/national-grid.png"
    }
  },
  {
    name: "BAE Systems Defence",
    domain: "baesystems-defence.co.uk",
    adminName: "Charlotte Brown",
    adminEmail: "charlotte.brown@baesystems-defence.co.uk",
    settings: {
      theme: "gray",
      features: ["safety", "contractors", "permits", "training", "documents"],
      maxUsers: 600,
      logo: "/logos/bae-systems.png"
    }
  },
  {
    name: "Rolls-Royce Engineering",
    domain: "rolls-royce-eng.co.uk",
    adminName: "Thomas Evans",
    adminEmail: "thomas.evans@rolls-royce-eng.co.uk",
    settings: {
      theme: "navy",
      features: ["safety", "training", "contractors", "permits", "incidents"],
      maxUsers: 550,
      logo: "/logos/rolls-royce.png"
    }
  },
  {
    name: "London Underground Ltd",
    domain: "tfl-underground.co.uk",
    adminName: "Isabella Taylor",
    adminEmail: "isabella.taylor@tfl-underground.co.uk",
    settings: {
      theme: "red",
      features: ["safety", "permits", "contractors", "training"],
      maxUsers: 900,
      logo: "/logos/tfl.png"
    }
  },
  {
    name: "British Airways Engineering",
    domain: "ba-engineering.co.uk",
    adminName: "Alexander Clark",
    adminEmail: "alexander.clark@ba-engineering.co.uk",
    settings: {
      theme: "blue",
      features: ["safety", "training", "contractors", "permits", "documents"],
      maxUsers: 450,
      logo: "/logos/british-airways.png"
    }
  },
  {
    name: "NHS Estates Scotland",
    domain: "nhs-estates-scotland.co.uk",
    adminName: "Emily Roberts",
    adminEmail: "emily.roberts@nhs-estates-scotland.co.uk",
    settings: {
      theme: "blue",
      features: ["safety", "contractors", "training", "documents", "incidents"],
      maxUsers: 650,
      logo: "/logos/nhs-scotland.png"
    }
  }
];

// Additional admin users for each company
const additionalAdmins = [
  ["Michael Harris", "Sarah Mitchell", "David Turner", "Lucy Walker", "Robert Green", "Hannah Phillips", "Daniel White", "Grace Lewis", "Joseph Martin"],
  ["Rachel Anderson", "Benjamin Hall", "Victoria King", "Matthew Wright", "Sophia Scott", "Ryan Hill", "Amelia Cooper", "Jack Clarke", "Olivia Parker"],
  ["George Baker", "Ella Morgan", "Harry Wood", "Lily James", "Charlie Hughes", "Mia Robinson", "Oscar Edwards", "Ava Price", "Noah Bennett"],
  ["Poppy Harrison", "Ethan Morris", "Jessica Cook", "Samuel Ward", "Chloe Bailey", "Adam Murphy", "Zoe Watson", "Leo Gray", "Alice Shaw"],
  ["Henry Mills", "Ruby Chapman", "Jacob Foster", "Freya Palmer", "Dylan Hunt", "Evie Simpson", "Archie Reid", "Daisy Powell", "Freddie Ross"],
  ["Rosie Grant", "Alfie Butler", "Matilda Webb", "Theodore Cole", "Florence Murray", "Arthur Stevens", "Ivy Fisher", "Felix Chapman", "Scarlett Kelly"],
  ["Max Rogers", "Elsie Barnes", "Louis Wood", "Sofia Fletcher", "Blake Graham", "Isabelle Chapman", "Toby Holmes", "Willow Russell", "Finley Stewart"],
  ["Harriet Spencer", "Callum Perry", "Phoebe Marshall", "Connor Walsh", "Eliza Pearce", "Jamie Lloyd", "Violet Howard", "Reuben Gibson", "Maya Knight"],
  ["Sebastian Fox", "Amelie Bradley", "Jude Hamilton", "Bella Simmons", "Zachary Mason", "Molly Richardson", "Elijah Hayes", "Sienna Crawford", "Gabriel Duncan"],
  ["Layla Griffiths", "Mason Harvey", "Eva Coleman", "Liam Walsh", "Aria Woodward", "Aaron Chambers", "Millie Byrne", "Kai Lawson", "Esme Reynolds"]
];

async function populateUKCompanies() {
  const baseUrl = process.env.API_URL || 'http://localhost:3000/api/userareas';
  
  console.log('🇬🇧 Starting UK Companies Database Population\n');
  console.log(`API URL: ${baseUrl}`);
  console.log(`Total companies to create: ${ukCompanies.length}`);
  console.log(`Admin users per company: 10\n`);
  
  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  // Check API availability
  console.log('🔍 Checking API availability...');
  try {
    const checkResponse = await fetch(baseUrl);
    if (!checkResponse.ok) {
      throw new Error(`API returned ${checkResponse.status}`);
    }
    const data = await checkResponse.json();
    console.log(`✅ API is available. Current records: ${data.pagination?.total || 0}\n`);
  } catch (error) {
    console.error('❌ API is not available:', error.message);
    console.error('\nPlease ensure the Next.js development server is running:');
    console.error('  npm run dev\n');
    process.exit(1);
  }

  // Create each UK company
  console.log('🏢 Creating UK Companies...\n');
  
  for (const [index, company] of ukCompanies.entries()) {
    const progress = `[${index + 1}/${ukCompanies.length}]`;
    
    try {
      console.log(`${progress} Creating: ${company.name}`);
      console.log(`   Domain: ${company.domain}`);
      console.log(`   Admin: ${company.adminName} (${company.adminEmail})`);
      
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: company.name,
          domain: company.domain,
          adminEmail: company.adminEmail,
          settings: company.settings
        })
      });
      
      if (response.ok) {
        const created = await response.json();
        console.log(`   ✅ Success - Company ID: ${created.id}`);
        
        // Log the additional admin users that would be created
        console.log(`   👥 Additional admins to be created:`);
        additionalAdmins[index].forEach((adminName, i) => {
          const firstName = adminName.split(' ')[0].toLowerCase();
          const lastName = adminName.split(' ')[1].toLowerCase();
          const email = `${firstName}.${lastName}@${company.domain}`;
          console.log(`      ${i + 1}. ${adminName} (${email})`);
        });
        
        successCount++;
        console.log('');
      } else {
        const error = await response.json();
        if (error.error?.includes('already exists')) {
          console.log(`   ⚠️  Skipped - Domain already exists`);
        } else {
          console.error(`   ❌ Failed - ${error.error}`);
          errorCount++;
          errors.push({ company: company.name, error: error.error });
        }
        console.log('');
      }
      
    } catch (error) {
      console.error(`   ❌ Error - ${error.message}\n`);
      errorCount++;
      errors.push({ company: company.name, error: error.message });
    }
    
    // Small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 UK Companies Population Summary\n');
  console.log(`✅ Successfully created: ${successCount} companies`);
  console.log(`👥 Total admin users: ${successCount * 10} (10 per company)`);
  console.log(`❌ Errors encountered: ${errorCount}`);
  
  if (errors.length > 0) {
    console.log('\n❌ Error Details:');
    errors.forEach(err => {
      console.log(`   - ${err.company}: ${err.error}`);
    });
  }

  // Final verification
  try {
    console.log('\n🔍 Final verification...');
    const finalResponse = await fetch(`${baseUrl}?limit=50`);
    const finalData = await finalResponse.json();
    
    console.log(`\n✅ Total UserAreas in database: ${finalData.pagination.total}`);
    console.log('\nUK Companies added:');
    
    finalData.data
      .filter(ua => ua.domain.endsWith('.co.uk'))
      .forEach((ua, index) => {
        console.log(`\n${index + 1}. ${ua.name}`);
        console.log(`   Domain: ${ua.domain}`);
        console.log(`   Theme: ${ua.settings.theme}`);
        console.log(`   Max Users: ${ua.settings.maxUsers}`);
        console.log(`   Features: ${ua.settings.features.join(', ')}`);
      });
      
  } catch (error) {
    console.error('\n❌ Could not verify final state:', error.message);
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n✨ UK Companies population complete!\n');
  
  if (successCount === ukCompanies.length) {
    console.log('🎉 All UK companies were created successfully!');
  } else if (successCount > 0) {
    console.log(`⚠️  Partial success: ${successCount}/${ukCompanies.length} created`);
  } else {
    console.log('❌ No companies were created. Please check the errors above.');
  }
  
  console.log('\n💡 Note: To create the additional admin users in the Users table,');
  console.log('   you would need to run a separate script that creates user accounts');
  console.log('   for each company with the appropriate UserAreaID.');
}

// Run the population
populateUKCompanies().catch(error => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});