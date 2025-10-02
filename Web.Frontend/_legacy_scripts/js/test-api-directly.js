const fetch = require('node-fetch');

async function testAPIDirectly() {
    try {
        console.log('🔍 Testing API endpoints directly...\n');
        
        // Test the legal-register database API
        console.log('1. Testing /api/legal-register/database...');
        
        const response = await fetch('http://localhost:3000/api/legal-register/database?search=&industryName=&complianceStatus=&riskLevel=&limit=5000', {
            method: 'GET',
            headers: {
                'x-user-area-id': '1',
                'Content-Type': 'application/json'
            }
        });
        
        console.log(`Status: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log('❌ Error response:');
            console.log(errorText);
        } else {
            const data = await response.json();
            console.log('✅ Success response:');
            console.log(`Records: ${data.data?.length || 0}`);
            console.log(`Database: ${data.database}`);
            if (data.data && data.data.length > 0) {
                console.log(`Sample: ${data.data[0].Name}`);
            }
        }
        
    } catch (error) {
        console.error('❌ Network error:', error.message);
        
        if (error.message.includes('ECONNREFUSED')) {
            console.log('\n💡 Next.js development server is not running.');
            console.log('   Start it with: npm run dev');
        }
    }
}

testAPIDirectly();