const fetch = require('node-fetch');

async function testAPI() {
    try {
        console.log('Testing Legal Register API endpoints...\n');
        
        // Test 1: Database route
        console.log('1. Testing /api/legal-register/database...');
        const dbResponse = await fetch('http://localhost:3000/api/legal-register/database?limit=5', {
            headers: {
                'x-user-area-id': '1'
            }
        });
        
        if (dbResponse.ok) {
            const data = await dbResponse.json();
            console.log(`✅ Database route: ${data.success ? 'SUCCESS' : 'FAILED'}`);
            console.log(`   Records returned: ${data.data?.length || 0}`);
            if (data.data?.length > 0) {
                console.log(`   Sample record: ${data.data[0].Name}`);
            }
        } else {
            console.log(`❌ Database route failed: ${dbResponse.status}`);
        }
        
        // Test 2: Stats route
        console.log('\n2. Testing /api/legal-register/stats...');
        const statsResponse = await fetch('http://localhost:3000/api/legal-register/stats', {
            headers: {
                'x-user-area-id': '1'
            }
        });
        
        if (statsResponse.ok) {
            const stats = await statsResponse.json();
            console.log(`✅ Stats route: ${stats.success ? 'SUCCESS' : 'FAILED'}`);
            if (stats.data) {
                console.log(`   Total legislation: ${stats.data.TotalLegislation}`);
                console.log(`   Approved: ${stats.data.ApprovedCount}`);
                console.log(`   Under Review: ${stats.data.UnderReviewCount}`);
            }
        } else {
            console.log(`❌ Stats route failed: ${statsResponse.status}`);
        }
        
        // Test 3: Industries route
        console.log('\n3. Testing /api/legal-register/industries...');
        const industriesResponse = await fetch('http://localhost:3000/api/legal-register/industries', {
            headers: {
                'x-user-area-id': '1'
            }
        });
        
        if (industriesResponse.ok) {
            const industries = await industriesResponse.json();
            console.log(`✅ Industries route: ${industries.success ? 'SUCCESS' : 'FAILED'}`);
            console.log(`   Industries found: ${industries.data?.length || 0}`);
        } else {
            console.log(`❌ Industries route failed: ${industriesResponse.status}`);
        }
        
        console.log('\n🎉 API testing complete!');
        console.log('If all tests passed, the legal-register page should now work with Azure data.');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\nMake sure your Next.js development server is running:');
        console.log('npm run dev');
    }
}

testAPI();