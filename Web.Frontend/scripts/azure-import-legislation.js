// Simple script to import legislation data to Azure database
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the legislation data
const legislationFile = path.join(__dirname, 'hse-legislation-import.json');
const allLegislationData = JSON.parse(fs.readFileSync(legislationFile, 'utf8'));

// Test with just one item first
const legislationData = allLegislationData.slice(0, 1);

console.log(`Found ${legislationData.length} legislation items to import`);

// API endpoint for your Azure database
const API_ENDPOINT = 'http://localhost:3000/api/legal-register/database';

// Function to import a single item with retry logic
async function importItem(item, index) {
  const maxRetries = 3;
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      console.log(`[${index + 1}/${legislationData.length}] Importing: ${item.Name}`);
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Success: ${item.Name}`);
        return { success: true, item: item.Name };
      } else {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
      }
      
    } catch (error) {
      attempt++;
      console.log(`❌ Attempt ${attempt} failed for ${item.Name}: ${error.message}`);
      
      if (attempt < maxRetries) {
        console.log(`⏳ Retrying in 2 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        console.log(`💥 Failed permanently: ${item.Name}`);
        return { success: false, item: item.Name, error: error.message };
      }
    }
  }
}

// Function to import all items with batch processing
async function importAllLegislation() {
  console.log('🚀 Starting legislation import to Azure database...');
  console.log(`📊 Total items: ${legislationData.length}`);
  
  const results = {
    success: 0,
    failed: 0,
    errors: []
  };
  
  const batchSize = 5; // Process 5 items at a time
  
  for (let i = 0; i < legislationData.length; i += batchSize) {
    const batch = legislationData.slice(i, i + batchSize);
    console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1} (items ${i + 1}-${Math.min(i + batchSize, legislationData.length)})`);
    
    const batchPromises = batch.map((item, batchIndex) => 
      importItem(item, i + batchIndex)
    );
    
    const batchResults = await Promise.all(batchPromises);
    
    batchResults.forEach(result => {
      if (result.success) {
        results.success++;
      } else {
        results.failed++;
        results.errors.push(result);
      }
    });
    
    console.log(`✅ Batch completed. Success: ${results.success}, Failed: ${results.failed}`);
    
    // Small delay between batches to avoid overwhelming the API
    if (i + batchSize < legislationData.length) {
      console.log('⏳ Waiting 3 seconds before next batch...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log('\n🎉 Import completed!');
  console.log(`📈 Final Results:`);
  console.log(`   ✅ Successful: ${results.success}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   📊 Total: ${legislationData.length}`);
  
  if (results.errors.length > 0) {
    console.log('\n💥 Failed items:');
    results.errors.forEach(error => {
      console.log(`   - ${error.item}: ${error.error}`);
    });
  }
}

// Start the import
importAllLegislation().catch(error => {
  console.error('💥 Import failed:', error);
  process.exit(1);
});