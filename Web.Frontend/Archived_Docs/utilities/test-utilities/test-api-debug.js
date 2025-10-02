// Quick test to debug the API issue
const fetch = require('node-fetch');

async function testAPIs() {
  console.log('=== Testing Documents API ===\n');
  
  // Test 1: Direct service health check
  console.log('1. Testing direct service (port 3006):');
  try {
    const res1 = await fetch('http://localhost:3006/health');
    console.log(`   Status: ${res1.status}`);
    if (res1.ok) {
      const data = await res1.json();
      console.log('   Response:', data);
    } else {
      console.log('   Service not responding on port 3006');
    }
  } catch (error) {
    console.log('   Error: Documents service is not running on port 3006');
    console.log('   ', error.message);
  }
  
  console.log('\n2. Testing proxy through Next.js (port 3000):');
  
  // Test 2: Tags API
  console.log('   a. Testing /api/documents/tags:');
  try {
    const res2 = await fetch('http://localhost:3000/api/documents/tags', {
      headers: {
        'x-user-id': '1',
        'x-user-area-id': '1'
      }
    });
    console.log(`      Status: ${res2.status}`);
    const text = await res2.text();
    try {
      const data = JSON.parse(text);
      console.log('      Response type: JSON');
      console.log('      Success:', data.success);
      console.log('      Tags count:', data.tags?.length || 0);
    } catch {
      console.log('      Response type: HTML/Text');
      console.log('      First 100 chars:', text.substring(0, 100));
    }
  } catch (error) {
    console.log('      Error:', error.message);
  }
  
  // Test 3: Documents API
  console.log('\n   b. Testing /api/documents:');
  try {
    const res3 = await fetch('http://localhost:3000/api/documents?pageSize=1', {
      headers: {
        'x-user-id': '1',
        'x-user-area-id': '1'
      }
    });
    console.log(`      Status: ${res3.status}`);
    const text = await res3.text();
    try {
      const data = JSON.parse(text);
      console.log('      Response type: JSON');
      console.log('      Success:', data.success);
    } catch {
      console.log('      Response type: HTML/Text');
      console.log('      First 100 chars:', text.substring(0, 100));
    }
  } catch (error) {
    console.log('      Error:', error.message);
  }
  
  console.log('\n=== Test Complete ===');
  console.log('\nDiagnosis:');
  console.log('- If service is not running on port 3006, start it with:');
  console.log('  cd apps/services/documents-service && npm run dev');
  console.log('- If proxy returns HTML, check Next.js console for errors');
  console.log('- If proxy returns 500, check service logs');
}

// Check if fetch is available
if (typeof fetch === 'undefined') {
  console.log('Installing node-fetch...');
  const { exec } = require('child_process');
  exec('npm install node-fetch@2', (error) => {
    if (error) {
      console.error('Failed to install node-fetch:', error);
      process.exit(1);
    }
    console.log('node-fetch installed, please run this script again');
  });
} else {
  testAPIs();
}