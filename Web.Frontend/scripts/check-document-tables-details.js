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

async function checkDocumentTablesDetails() {
  let pool;
  
  try {
    console.log('🔍 Connecting to Azure V7-Dev Database...');
    pool = await sql.connect(azureConfig);
    console.log('✅ Connected to Azure SQL Database\n');
    
    // Focus on V7 document-related tables
    const v7DocumentTables = [
      'Document',
      'DocumentTemplate', 
      'DocumentTemplateTag',
      'DocumentTemplateUsage',
      'DocumentAssignment',
      'DocumentBundle',
      'DocumentBundleItem',
      'DocumentBundleAssignment',
      'DocumentFolder',
      'DocumentRequirement',
      'DocumentRequirementSet',
      'DocumentRequirementFulfillment',
      'DocumentSignature',
      'DocumentViewLog',
      'Attachment',
      'AttachmentUserArea'
    ];
    
    console.log('=== V7 DOCUMENT TABLES - DETAILED ANALYSIS ===\n');
    
    for (const tableName of v7DocumentTables) {
      console.log(`\n📊 [V7].[${tableName}]:`);
      console.log('─'.repeat(50));
      
      try {
        // Get row count
        const countQuery = `SELECT COUNT(*) as RecordCount FROM [V7].[${tableName}]`;
        const countResult = await pool.request().query(countQuery);
        const rowCount = countResult.recordset[0].RecordCount;
        
        console.log(`  ✓ Row Count: ${rowCount}`);
        
        // Check if table has UserAreaID column
        const userAreaCheckQuery = `
          SELECT COUNT(*) as HasUserAreaID
          FROM INFORMATION_SCHEMA.COLUMNS
          WHERE TABLE_SCHEMA = 'V7'
            AND TABLE_NAME = @tableName
            AND COLUMN_NAME = 'UserAreaID'
        `;
        
        const userAreaRequest = pool.request();
        userAreaRequest.input('tableName', sql.NVarChar, tableName);
        const userAreaResult = await userAreaRequest.query(userAreaCheckQuery);
        const hasUserAreaID = userAreaResult.recordset[0].HasUserAreaID > 0;
        
        console.log(`  ✓ Multi-tenant (UserAreaID): ${hasUserAreaID ? 'Yes ✅' : 'No ❌'}`);
        
        // Check for audit fields
        const auditFieldsQuery = `
          SELECT 
            CASE WHEN EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = @tableName AND COLUMN_NAME = 'CreatedByUserID') THEN 1 ELSE 0 END as HasCreatedBy,
            CASE WHEN EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = @tableName AND COLUMN_NAME = 'CreatedDate') THEN 1 ELSE 0 END as HasCreatedDate,
            CASE WHEN EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = @tableName AND COLUMN_NAME = 'ArchivedDate') THEN 1 ELSE 0 END as HasArchivedDate
        `;
        
        const auditRequest = pool.request();
        auditRequest.input('tableName', sql.NVarChar, tableName);
        const auditResult = await auditRequest.query(auditFieldsQuery);
        const audit = auditResult.recordset[0];
        
        console.log(`  ✓ Audit Fields: Created: ${audit.HasCreatedBy ? '✅' : '❌'} | Archived: ${audit.HasArchivedDate ? '✅' : '❌'}`);
        
        // If table has data, show sample
        if (rowCount > 0 && rowCount <= 5) {
          console.log(`  ✓ Sample Data (All ${rowCount} rows):`);
          const sampleQuery = `SELECT TOP 5 * FROM [V7].[${tableName}]`;
          const sampleResult = await pool.request().query(sampleQuery);
          
          // Show key fields only
          sampleResult.recordset.forEach((row, index) => {
            const keyFields = [];
            
            // Show ID field
            const idField = Object.keys(row).find(key => key.endsWith('ID') && key === tableName + 'ID');
            if (idField) keyFields.push(`${idField}: ${row[idField]}`);
            
            // Show name/title fields
            if (row.Title) keyFields.push(`Title: "${row.Title}"`);
            if (row.Name) keyFields.push(`Name: "${row.Name}"`);
            if (row.DisplayName) keyFields.push(`DisplayName: "${row.DisplayName}"`);
            if (row.FileName) keyFields.push(`FileName: "${row.FileName}"`);
            if (row.DocumentType) keyFields.push(`Type: "${row.DocumentType}"`);
            if (row.UserAreaID) keyFields.push(`UserAreaID: ${row.UserAreaID}`);
            
            if (keyFields.length > 0) {
              console.log(`    Row ${index + 1}: ${keyFields.join(' | ')}`);
            }
          });
        } else if (rowCount > 5) {
          console.log(`  ✓ Table has ${rowCount} rows (showing distribution):`);
          
          // For tables with UserAreaID, show distribution
          if (hasUserAreaID) {
            const distributionQuery = `
              SELECT TOP 5
                UserAreaID,
                COUNT(*) as RecordCount
              FROM [V7].[${tableName}]
              GROUP BY UserAreaID
              ORDER BY COUNT(*) DESC
            `;
            
            try {
              const distResult = await pool.request().query(distributionQuery);
              if (distResult.recordset.length > 0) {
                console.log('    UserArea Distribution:');
                distResult.recordset.forEach(dist => {
                  console.log(`      UserAreaID ${dist.UserAreaID}: ${dist.RecordCount} records`);
                });
              }
            } catch (err) {
              // Ignore distribution errors
            }
          }
        }
        
      } catch (err) {
        console.log(`  ❌ Error querying table: ${err.message}`);
      }
    }
    
    console.log('\n\n=== DOCUMENT TEMPLATE SYSTEM STATUS ===\n');
    
    // Check DocumentTemplate system specifically
    const templateSystemCheck = `
      SELECT 
        (SELECT COUNT(*) FROM [V7].[DocumentTemplate]) as TemplateCount,
        (SELECT COUNT(*) FROM [V7].[DocumentTemplateTag]) as TagCount,
        (SELECT COUNT(*) FROM [V7].[DocumentTemplateUsage]) as UsageCount,
        (SELECT COUNT(*) FROM [V7].[Document]) as DocumentCount,
        (SELECT COUNT(*) FROM [V7].[DocumentAssignment]) as AssignmentCount,
        (SELECT COUNT(*) FROM [V7].[Attachment]) as AttachmentCount
    `;
    
    const systemResult = await pool.request().query(templateSystemCheck);
    const stats = systemResult.recordset[0];
    
    console.log('📈 Document System Statistics:');
    console.log(`  • Document Templates: ${stats.TemplateCount}`);
    console.log(`  • Template Tags: ${stats.TagCount}`);
    console.log(`  • Template Usage Records: ${stats.UsageCount}`);
    console.log(`  • Documents: ${stats.DocumentCount}`);
    console.log(`  • Document Assignments: ${stats.AssignmentCount}`);
    console.log(`  • Attachments: ${stats.AttachmentCount}`);
    
    // Check if tables are empty or populated
    console.log('\n📋 Table Population Status:');
    if (stats.TemplateCount === 0) {
      console.log('  ⚠️  DocumentTemplate table is EMPTY - needs seeding');
    } else {
      console.log(`  ✅ DocumentTemplate table has ${stats.TemplateCount} templates`);
    }
    
    if (stats.TagCount === 0) {
      console.log('  ⚠️  DocumentTemplateTag table is EMPTY - needs seeding');
    } else {
      console.log(`  ✅ DocumentTemplateTag table has ${stats.TagCount} tags`);
    }
    
    if (stats.DocumentCount === 0) {
      console.log('  ⚠️  Document table is EMPTY');
    } else {
      console.log(`  ✅ Document table has ${stats.DocumentCount} documents`);
    }
    
    // Check for any sample templates
    if (stats.TemplateCount > 0) {
      console.log('\n📄 Sample Document Templates:');
      const templateQuery = `
        SELECT TOP 3
          DocumentTemplateID,
          UserAreaID,
          Title,
          DocumentType,
          Category,
          IsActive,
          Version
        FROM [V7].[DocumentTemplate]
        ORDER BY CreatedDate DESC
      `;
      
      const templates = await pool.request().query(templateQuery);
      templates.recordset.forEach(template => {
        console.log(`  - ID: ${template.DocumentTemplateID} | "${template.Title}" (${template.DocumentType}) | UserArea: ${template.UserAreaID} | Active: ${template.IsActive}`);
      });
    }
    
    // Check for any sample tags
    if (stats.TagCount > 0) {
      console.log('\n🏷️  Sample Template Tags:');
      const tagQuery = `
        SELECT TOP 5
          TagName,
          DisplayName,
          DataType,
          IsSystemTag
        FROM [V7].[DocumentTemplateTag]
        ORDER BY IsSystemTag DESC, TagName
      `;
      
      const tags = await pool.request().query(tagQuery);
      tags.recordset.forEach(tag => {
        const systemFlag = tag.IsSystemTag ? '[SYSTEM]' : '[CUSTOM]';
        console.log(`  - ${systemFlag} {${tag.TagName}} = "${tag.DisplayName}" (${tag.DataType})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.originalError) {
      console.error('Original error:', error.originalError.message);
    }
  } finally {
    if (pool) {
      await pool.close();
      console.log('\n✅ Database connection closed');
    }
  }
}

// Run the check
checkDocumentTablesDetails().catch(console.error);