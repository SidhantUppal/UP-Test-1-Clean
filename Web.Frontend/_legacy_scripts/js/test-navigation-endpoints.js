const fetch = require('node-fetch');

async function testNavigationEndpoints() {
    try {
        console.log('🧪 Testing Navigation API Endpoints...\n');
        
        // Test 1: GET navigation preferences
        console.log('1. Testing GET /api/user/navigation-preferences...');
        const getResponse = await fetch('http://localhost:3000/api/user/navigation-preferences');
        
        if (getResponse.ok) {
            const data = await getResponse.json();
            console.log(`✅ GET route: ${data.success ? 'SUCCESS' : 'FAILED'}`);
            
            if (data.data) {
                console.log(`   Primary items: ${data.data.primaryItems?.length || 0}`);
                console.log(`   Max primary items: ${data.data.maxPrimaryItems}`);
                if (data.source) {
                    console.log(`   Data source: ${data.source}`);
                }
                if (data.data.primaryItems && data.data.primaryItems.length > 0) {
                    console.log(`   Sample items: ${data.data.primaryItems.map(item => item.name).join(', ')}`);
                }
            }
        } else {
            console.log(`❌ GET route failed: ${getResponse.status}`);
            const errorText = await getResponse.text();
            console.log(`   Error: ${errorText}`);
        }
        
        // Test 2: POST navigation preferences (save new preferences)
        console.log('\n2. Testing POST /api/user/navigation-preferences...');
        
        const testPreferences = {
            primaryItems: [
                {
                    id: 'home',
                    name: 'Home',
                    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
                    href: '/',
                    permission: 'dashboard.view'
                },
                {
                    id: 'legal-register',
                    name: 'Legal Register',
                    icon: 'legal-icon',
                    href: '/legal-register',
                    permission: 'legal-register.view'
                },
                {
                    id: 'checklists',
                    name: 'Checklists',
                    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                    href: '/checklists',
                    permission: 'checklists.view',
                    hasDropdown: true
                },
                {
                    id: 'documents',
                    name: 'Documents',
                    icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z',
                    href: '/documents',
                    permission: 'documents.view',
                    hasDropdown: true
                }
            ],
            maxPrimaryItems: 8
        };
        
        const postResponse = await fetch('http://localhost:3000/api/user/navigation-preferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testPreferences)
        });
        
        if (postResponse.ok) {
            const postData = await postResponse.json();
            console.log(`✅ POST route: ${postData.success ? 'SUCCESS' : 'FAILED'}`);
            console.log(`   Message: ${postData.message}`);
        } else {
            console.log(`❌ POST route failed: ${postResponse.status}`);
            const errorText = await postResponse.text();
            console.log(`   Error: ${errorText}`);
        }
        
        // Test 3: GET again to verify the save worked
        console.log('\n3. Testing GET again to verify save...');
        const getResponse2 = await fetch('http://localhost:3000/api/user/navigation-preferences');
        
        if (getResponse2.ok) {
            const data2 = await getResponse2.json();
            console.log(`✅ Verification GET: ${data2.success ? 'SUCCESS' : 'FAILED'}`);
            
            if (data2.data && data2.data.primaryItems) {
                console.log(`   Updated primary items: ${data2.data.primaryItems.length}`);
                console.log(`   Items: ${data2.data.primaryItems.map(item => item.name).join(', ')}`);
                
                // Check if our test data was saved
                const hasLegalRegister = data2.data.primaryItems.some(item => item.id === 'legal-register');
                const hasDocuments = data2.data.primaryItems.some(item => item.id === 'documents');
                
                if (hasLegalRegister && hasDocuments) {
                    console.log('✅ Test preferences were saved correctly');
                } else {
                    console.log('⚠️  Test preferences may not have been saved correctly');
                }
            }
        }
        
        console.log('\n🎉 API endpoint testing complete!');
        console.log('Navigation settings page should now work with Azure data.');
        console.log('Visit: http://localhost:3000/settings/navigation');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\nMake sure your Next.js development server is running:');
        console.log('npm run dev');
    }
}

testNavigationEndpoints();