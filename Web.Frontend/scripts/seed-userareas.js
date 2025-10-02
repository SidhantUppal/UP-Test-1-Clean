#!/usr/bin/env node

// Script to populate UserAreas via API
// Run with: node scripts/seed-userareas.js

const seedUserAreas = [
  {
    name: "Acme Corporation",
    domain: "acme.example.com",
    adminEmail: "admin@acme.com",
    settings: {
      theme: "blue",
      features: ["safety", "training", "contractors", "permits"],
      maxUsers: 500,
      logo: "/logos/acme-corp.png"
    }
  },
  {
    name: "Global Manufacturing Inc",
    domain: "globalmanufacturing.com",
    adminEmail: "operations@globalmanufacturing.com",
    settings: {
      theme: "orange",
      features: ["safety", "contractors", "training", "incidents"],
      maxUsers: 250,
      logo: "/logos/global-mfg.png"
    }
  },
  {
    name: "TechCo Solutions",
    domain: "techco-solutions.com",
    adminEmail: "it@techco-solutions.com",
    settings: {
      theme: "purple",
      features: ["safety", "training", "documents"],
      maxUsers: 100,
      logo: "/logos/techco.png"
    }
  },
  {
    name: "Northern Construction Ltd",
    domain: "northern-construction.com",
    adminEmail: "safety@northern-construction.com",
    settings: {
      theme: "blue",
      features: ["contractors", "permits", "safety", "training"],
      maxUsers: 300,
      logo: "/logos/northern.png"
    }
  },
  {
    name: "City Services Municipal",
    domain: "cityservices.gov",
    adminEmail: "admin@cityservices.gov",
    settings: {
      theme: "green",
      features: ["safety", "training", "incidents", "documents"],
      maxUsers: 150,
      logo: "/logos/city-services.png"
    }
  },
  {
    name: "SafetyFirst Industries",
    domain: "safetyfirst.com",
    adminEmail: "compliance@safetyfirst.com",
    settings: {
      theme: "red",
      features: ["safety", "training", "contractors", "permits", "incidents"],
      maxUsers: 400,
      logo: "/logos/safety-first.png"
    }
  },
  {
    name: "Coastal Energy Partners",
    domain: "coastalenergy.com",
    adminEmail: "hse@coastalenergy.com",
    settings: {
      theme: "blue",
      features: ["safety", "permits", "contractors", "training", "incidents"],
      maxUsers: 350,
      logo: "/logos/coastal.png"
    }
  },
  {
    name: "Metro Transit Authority",
    domain: "metro-transit.org",
    adminEmail: "safety-admin@metro-transit.org",
    settings: {
      theme: "purple",
      features: ["safety", "training", "incidents"],
      maxUsers: 200,
      logo: "/logos/metro.png"
    }
  },
  {
    name: "Regional Healthcare Network",
    domain: "regional-health.org",
    adminEmail: "compliance@regional-health.org",
    settings: {
      theme: "teal",
      features: ["safety", "training", "documents", "incidents"],
      maxUsers: 600,
      logo: "/logos/healthcare.png"
    }
  },
  {
    name: "Industrial Solutions Corp",
    domain: "industrial-solutions.com",
    adminEmail: "operations@industrial-solutions.com",
    settings: {
      theme: "gray",
      features: ["contractors", "permits", "safety", "training"],
      maxUsers: 175,
      logo: "/logos/industrial.png"
    }
  }
];

async function populateDatabase() {
  const baseUrl = process.env.API_URL || 'http://localhost:3000/api/userareas';
  
  console.log('🚀 Starting UserAreas Database Population\n');
  console.log(`API URL: ${baseUrl}`);
  console.log(`Total records to create: ${seedUserAreas.length}\n`);
  
  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  // First, check if API is available
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

  // Create each user area
  console.log('📝 Creating UserAreas...\n');
  
  for (const [index, userArea] of seedUserAreas.entries()) {
    const progress = `[${index + 1}/${seedUserAreas.length}]`;
    
    try {
      console.log(`${progress} Creating: ${userArea.name}`);
      
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userArea)
      });
      
      if (response.ok) {
        const created = await response.json();
        console.log(`   ✅ Success - ID: ${created.id}, Domain: ${created.domain}`);
        successCount++;
      } else {
        const error = await response.json();
        if (error.error?.includes('already exists')) {
          console.log(`   ⚠️  Skipped - Domain already exists`);
        } else {
          console.error(`   ❌ Failed - ${error.error}`);
          errorCount++;
          errors.push({ userArea: userArea.name, error: error.error });
        }
      }
      
    } catch (error) {
      console.error(`   ❌ Error - ${error.message}`);
      errorCount++;
      errors.push({ userArea: userArea.name, error: error.message });
    }
    
    // Small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Population Summary\n');
  console.log(`✅ Successfully created: ${successCount}`);
  console.log(`❌ Errors encountered: ${errorCount}`);
  
  if (errors.length > 0) {
    console.log('\n❌ Error Details:');
    errors.forEach(err => {
      console.log(`   - ${err.userArea}: ${err.error}`);
    });
  }

  // Final verification
  try {
    console.log('\n🔍 Final verification...');
    const finalResponse = await fetch(`${baseUrl}?limit=50`);
    const finalData = await finalResponse.json();
    
    console.log(`\n✅ Total UserAreas in database: ${finalData.pagination.total}`);
    console.log('\nActive UserAreas:');
    
    finalData.data
      .filter(ua => ua.active)
      .forEach((ua, index) => {
        console.log(`${index + 1}. ${ua.name}`);
        console.log(`   Domain: ${ua.domain}`);
        console.log(`   Theme: ${ua.settings.theme}`);
        console.log(`   Features: ${ua.settings.features.join(', ')}`);
        console.log('');
      });
      
  } catch (error) {
    console.error('\n❌ Could not verify final state:', error.message);
  }

  console.log('='.repeat(60));
  console.log('\n✨ Database population complete!\n');
  
  if (successCount === seedUserAreas.length) {
    console.log('🎉 All user areas were created successfully!');
  } else if (successCount > 0) {
    console.log(`⚠️  Partial success: ${successCount}/${seedUserAreas.length} created`);
  } else {
    console.log('❌ No user areas were created. Please check the errors above.');
  }
}

// Run the population
populateDatabase().catch(error => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});