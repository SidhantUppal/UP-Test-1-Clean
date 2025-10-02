// Test script for UserAreas API

async function testUserAreasAPI() {
  const baseUrl = 'http://localhost:3000/api/userareas';
  
  // Test data
  const newUserAreas = [
    {
      name: "Global Manufacturing Inc",
      domain: "globalmanufacturing.example.com",
      adminEmail: "admin@globalmanufacturing.com",
      settings: {
        theme: "orange",
        features: ["safety", "contractors", "training"],
        maxUsers: 150
      }
    },
    {
      name: "SafetyFirst Corp",
      domain: "safetyfirst.example.com",
      adminEmail: "admin@safetyfirst.com",
      settings: {
        theme: "red",
        features: ["safety", "training", "contractors", "permits"],
        maxUsers: 200,
        logo: "https://example.com/logo.png"
      }
    },
    {
      name: "Northern Construction",
      domain: "northern-construction.com",
      adminEmail: "admin@northern-construction.com",
      settings: {
        theme: "blue",
        features: ["contractors", "permits"],
        maxUsers: 75
      }
    },
    {
      name: "City Services Ltd",
      domain: "cityservices.com",
      adminEmail: "manager@cityservices.com",
      settings: {
        theme: "green",
        features: ["safety", "training"],
        maxUsers: 50
      }
    }
  ];

  console.log('🚀 Testing UserAreas API\n');

  // 1. First, get existing user areas
  console.log('1️⃣ Getting existing user areas...');
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    console.log(`Found ${data.pagination?.total || data.data?.length || 0} existing user areas\n`);
  } catch (error) {
    console.error('Error fetching user areas:', error.message);
  }

  // 2. Add new user areas
  console.log('2️⃣ Adding new user areas...\n');
  
  for (const userArea of newUserAreas) {
    try {
      console.log(`Adding: ${userArea.name}`);
      
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userArea)
      });
      
      if (response.ok) {
        const created = await response.json();
        console.log(`✅ Created with ID: ${created.id}`);
        console.log(`   Domain: ${created.domain}`);
        console.log(`   Theme: ${created.settings.theme}`);
        console.log(`   Features: ${created.settings.features.join(', ')}\n`);
      } else {
        const error = await response.json();
        console.error(`❌ Failed: ${error.error || response.statusText}`);
        if (error.details) {
          console.error('   Details:', error.details);
        }
        console.log('');
      }
      
    } catch (error) {
      console.error(`❌ Error adding ${userArea.name}:`, error.message, '\n');
    }
  }

  // 3. Get all user areas again to verify
  console.log('3️⃣ Verifying all user areas...');
  try {
    const response = await fetch(`${baseUrl}?limit=20`);
    const data = await response.json();
    
    console.log(`\nTotal user areas: ${data.pagination.total}`);
    console.log('\nAll user areas:');
    data.data.forEach((ua, index) => {
      console.log(`${index + 1}. ${ua.name} (${ua.domain}) - ${ua.active ? 'Active' : 'Inactive'}`);
    });
    
  } catch (error) {
    console.error('Error fetching final list:', error.message);
  }

  // 4. Test getting a specific user area
  console.log('\n4️⃣ Testing GET single user area...');
  try {
    const response = await fetch(`${baseUrl}/3`);
    if (response.ok) {
      const userArea = await response.json();
      console.log(`\nUser Area #3:`);
      console.log(`Name: ${userArea.name}`);
      console.log(`Domain: ${userArea.domain}`);
      console.log(`Stats:`, userArea.stats);
    }
  } catch (error) {
    console.error('Error fetching single user area:', error.message);
  }
}

// Run the test
testUserAreasAPI().catch(console.error);