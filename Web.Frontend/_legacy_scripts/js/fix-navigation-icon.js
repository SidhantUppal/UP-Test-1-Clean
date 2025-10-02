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

async function fixNavigationIcon() {
    let pool;
    
    try {
        console.log('🔧 Fixing Navigation Icon Issue...\n');
        
        pool = await sql.connect(config);
        console.log('✅ Connected to Azure database');
        
        // Get current navigation preferences
        const current = await pool.request()
            .input('userId', sql.Int, 1)
            .query('SELECT NavigationPreferences FROM [dbo].[UserNavigationPreferences] WHERE UserID = @userId');
        
        if (current.recordset.length > 0) {
            const preferences = JSON.parse(current.recordset[0].NavigationPreferences);
            console.log('📄 Current preferences found');
            
            // Fix the legal-register icon
            const updatedItems = preferences.primaryItems.map(item => {
                if (item.id === 'legal-register' && item.icon === 'legal-icon') {
                    return {
                        ...item,
                        icon: 'M97.48,26.61L97.48,26.61c3.09,3.09,3.15,8.08,0.14,11.1l-1.63,1.63l13.1,12.88L75.96,84.14L63.2,70.92 l-49.74,49.74c-3.01,3.01-8.01,2.95-11.1-0.14l0,0c-3.09-3.09-3.15-8.08-0.14-11.1l49.92-49.92l-9.99-10.39l31.32-31.93l11.21,11 l1.72-1.72C89.4,23.46,94.39,23.52,97.48,26.61L97.48,26.61z M72.11,1.88L72.11,1.88c2.46,2.46,2.51,6.43,0.11,8.83L35.69,47.24 c-2.4,2.4-6.37,2.35-8.83-0.11l0,0c-2.46-2.46-2.51-6.43-0.11-8.83L63.28,1.77C65.68-0.63,69.65-0.58,72.11,1.88L72.11,1.88z M124.04,53.81L124.04,53.81c2.46,2.46,2.51,6.43,0.11,8.83L87.62,99.18c-2.4,2.4-6.37,2.35-8.83-0.11l0,0 c-2.46-2.46-2.51-6.43-0.11-8.83l36.53-36.53C117.61,51.3,121.58,51.35,124.04,53.81L124.04,53.81z'
                    };
                }
                return item;
            });
            
            const updatedPreferences = {
                ...preferences,
                primaryItems: updatedItems
            };
            
            // Update the database
            await pool.request()
                .input('userId', sql.Int, 1)
                .input('preferences', sql.NVarChar, JSON.stringify(updatedPreferences))
                .query(`
                    UPDATE [dbo].[UserNavigationPreferences] 
                    SET NavigationPreferences = @preferences, UpdatedDate = sysdatetimeoffset()
                    WHERE UserID = @userId
                `);
            
            console.log('✅ Updated navigation preferences with proper legal-register icon');
            console.log('   Icon changed from "legal-icon" to proper SVG path');
            
        } else {
            console.log('⚠️  No navigation preferences found for user 1');
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

fixNavigationIcon();