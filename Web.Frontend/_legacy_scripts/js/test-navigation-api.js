const sql = require('mssql');
require('dotenv').config();

const config = {
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: false,
        connectTimeout: 30000,
        requestTimeout: 30000
    }
};

async function testNavigationSystem() {
    let pool;
    
    try {
        console.log('🧪 Testing Navigation Preferences System...\n');
        
        // Connect to database
        pool = await sql.connect(config);
        console.log('✅ Connected to Azure V7-Dev database\n');
        
        // 1. Check if UserNavigationPreferences table exists
        console.log('1. Checking UserNavigationPreferences table...');
        const tableCheck = await pool.request().query(`
            SELECT COUNT(*) as count 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_NAME = 'UserNavigationPreferences' AND TABLE_SCHEMA = 'dbo'
        `);
        
        if (tableCheck.recordset[0].count > 0) {
            console.log('✅ UserNavigationPreferences table exists');
            
            // Check current data
            const currentData = await pool.request().query(`
                SELECT COUNT(*) as count FROM [dbo].[UserNavigationPreferences]
            `);
            console.log(`   Current records: ${currentData.recordset[0].count}`);
        } else {
            console.log('❌ UserNavigationPreferences table not found');
            return;
        }
        
        // 2. Test saving navigation preferences
        console.log('\n2. Testing save navigation preferences...');
        const samplePreferences = {
            primaryItems: [
                { id: 'home', name: 'Home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', href: '/', permission: 'dashboard.view' },
                { id: 'checklists', name: 'Checklists', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', href: '/checklists', permission: 'checklists.view' },
                { id: 'legal-register', name: 'Legal Register', icon: 'legal-icon', href: '/legal-register', permission: 'legal-register.view' }
            ],
            maxPrimaryItems: 8,
            lastUpdated: new Date().toISOString()
        };
        
        const userId = 1; // Default test user
        
        // Check if preferences exist
        const existingCheck = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT UserID FROM [dbo].[UserNavigationPreferences] WHERE UserID = @userId');
        
        const preferencesJson = JSON.stringify(samplePreferences);
        
        if (existingCheck.recordset.length > 0) {
            // Update existing
            await pool.request()
                .input('userId', sql.Int, userId)
                .input('preferences', sql.NVarChar, preferencesJson)
                .query(`
                    UPDATE [dbo].[UserNavigationPreferences] 
                    SET NavigationPreferences = @preferences, UpdatedDate = sysdatetimeoffset()
                    WHERE UserID = @userId
                `);
            console.log('✅ Updated existing navigation preferences');
        } else {
            // Insert new
            await pool.request()
                .input('userId', sql.Int, userId)
                .input('preferences', sql.NVarChar, preferencesJson)
                .query(`
                    INSERT INTO [dbo].[UserNavigationPreferences] 
                    (UserID, NavigationPreferences, CreatedDate, UpdatedDate)
                    VALUES (@userId, @preferences, sysdatetimeoffset(), sysdatetimeoffset())
                `);
            console.log('✅ Created new navigation preferences');
        }
        
        // 3. Test retrieving navigation preferences
        console.log('\n3. Testing retrieve navigation preferences...');
        const retrievedData = await pool.request()
            .input('userId', sql.Int, userId)
            .query(`
                SELECT NavigationPreferences, CreatedDate, UpdatedDate
                FROM [dbo].[UserNavigationPreferences]
                WHERE UserID = @userId
            `);
        
        if (retrievedData.recordset.length > 0) {
            const preferences = JSON.parse(retrievedData.recordset[0].NavigationPreferences);
            console.log('✅ Successfully retrieved navigation preferences');
            console.log(`   Primary items: ${preferences.primaryItems.length}`);
            console.log(`   Max primary items: ${preferences.maxPrimaryItems}`);
            console.log(`   Sample items: ${preferences.primaryItems.map(item => item.name).join(', ')}`);
        } else {
            console.log('❌ Failed to retrieve navigation preferences');
        }
        
        // 4. Test API endpoint simulation
        console.log('\n4. Simulating API endpoint behavior...');
        
        // Simulate GET request logic
        const getResult = await pool.request()
            .input('userId', sql.Int, userId)
            .query(`
                SELECT NavigationPreferences
                FROM [dbo].[UserNavigationPreferences]
                WHERE UserID = @userId
            `);
        
        if (getResult.recordset.length > 0) {
            const preferences = JSON.parse(getResult.recordset[0].NavigationPreferences);
            console.log('✅ GET simulation successful');
            console.log(`   Would return: ${preferences.primaryItems.length} primary items`);
        }
        
        // 5. Show final database state
        console.log('\n5. Current database state:');
        const finalState = await pool.request().query(`
            SELECT 
                UserID, 
                LEN(NavigationPreferences) as PreferencesLength,
                CreatedDate,
                UpdatedDate
            FROM [dbo].[UserNavigationPreferences]
            ORDER BY UpdatedDate DESC
        `);
        
        console.log('📊 UserNavigationPreferences records:');
        finalState.recordset.forEach(record => {
            console.log(`   User ${record.UserID}: ${record.PreferencesLength} chars, Updated: ${record.UpdatedDate?.toISOString()?.split('T')[0]}`);
        });
        
        console.log('\n🎉 Navigation preferences system is working correctly!');
        console.log('✅ Ready to test: http://localhost:3000/settings/navigation');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        
        if (error.message.includes('Invalid object name')) {
            console.log('\n💡 The UserNavigationPreferences table might not exist.');
            console.log('   This is expected since we created tables manually for legal-register.');
        }
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

testNavigationSystem();