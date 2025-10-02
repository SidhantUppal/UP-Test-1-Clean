import sql from 'mssql';

// Azure SQL configuration for V7-Dev
const azureConfig = {
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  server: 'YOUR_DATABASE_SERVER.database.windows.net',
  database: 'V7-Dev',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectTimeout: 30000,
    requestTimeout: 30000
  }
};

async function checkTemplateTags() {
  let pool;
  
  try {
    console.log('🔍 Checking DocumentTemplateTag table in detail...\n');
    pool = await sql.connect(azureConfig);
    
    // Get unique tags
    const uniqueTagsQuery = `
      SELECT DISTINCT
        TagName,
        DisplayName,
        DataType,
        Category,
        IsSystemTag,
        SampleValue
      FROM [V7].[DocumentTemplateTag]
      ORDER BY IsSystemTag DESC, Category, TagName
    `;
    
    const tagsResult = await pool.request().query(uniqueTagsQuery);
    
    console.log('=== UNIQUE DOCUMENT TEMPLATE TAGS ===\n');
    console.log(`Total unique tags: ${tagsResult.recordset.length}\n`);
    
    // Group by category
    const tagsByCategory = {};
    tagsResult.recordset.forEach(tag => {
      const category = tag.Category || 'Uncategorized';
      if (!tagsByCategory[category]) {
        tagsByCategory[category] = [];
      }
      tagsByCategory[category].push(tag);
    });
    
    // Display by category
    Object.keys(tagsByCategory).sort().forEach(category => {
      console.log(`\n📁 Category: ${category}`);
      console.log('─'.repeat(50));
      
      tagsByCategory[category].forEach(tag => {
        const systemFlag = tag.IsSystemTag ? '🔒 [SYSTEM]' : '📝 [CUSTOM]';
        const sampleValue = tag.SampleValue ? ` (e.g., "${tag.SampleValue}")` : '';
        console.log(`  ${systemFlag} {${tag.TagName}}`);
        console.log(`      Display: "${tag.DisplayName}"`);
        console.log(`      Type: ${tag.DataType}${sampleValue}`);
      });
    });
    
    // Check distribution by UserArea
    console.log('\n\n=== TAG DISTRIBUTION BY USER AREA ===\n');
    const distributionQuery = `
      SELECT 
        UserAreaID,
        COUNT(*) as TagCount,
        COUNT(DISTINCT TagName) as UniqueTagCount
      FROM [V7].[DocumentTemplateTag]
      GROUP BY UserAreaID
      ORDER BY UserAreaID
    `;
    
    const distResult = await pool.request().query(distributionQuery);
    distResult.recordset.forEach(dist => {
      console.log(`  UserArea ${dist.UserAreaID}: ${dist.TagCount} tags (${dist.UniqueTagCount} unique)`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (pool) {
      await pool.close();
      console.log('\n✅ Database connection closed');
    }
  }
}

// Run the check
checkTemplateTags().catch(console.error);