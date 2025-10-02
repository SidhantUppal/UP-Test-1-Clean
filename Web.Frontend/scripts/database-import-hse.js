// Script to import HSE legislation into the database
// This script reads the JSON file and adds new legislation to the database
// Enhanced version with better error handling, retry logic, and progress tracking

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  batchSize: 10, // Process items in batches
  requestTimeout: 30000, // 30 seconds
  userAreaId: process.env.USER_AREA_ID || '1'
};

// Enhanced logging functionality
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
  console.log(logMessage);
  
  // Append to log file
  const logFile = path.join(__dirname, 'legislation-import.log');
  fs.appendFileSync(logFile, logMessage + '\n');
}

function logError(message, error = null) {
  log(`${message}${error ? ': ' + error.message : ''}`, 'error');
  if (error && error.stack) {
    log(`Stack trace: ${error.stack}`, 'error');
  }
}

function logSuccess(message) {
  log(message, 'success');
}

function logWarning(message) {
  log(message, 'warning');
}

// Sleep utility function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Enhanced fetch with timeout and retry logic
async function fetchWithRetry(url, options = {}, retryCount = 0) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.requestTimeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok && retryCount < CONFIG.retryAttempts) {
      logWarning(`Request failed (${response.status}), retrying in ${CONFIG.retryDelay}ms... (attempt ${retryCount + 1}/${CONFIG.retryAttempts})`);
      await sleep(CONFIG.retryDelay);
      return fetchWithRetry(url, options, retryCount + 1);
    }
    
    return response;
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${CONFIG.requestTimeout}ms`);
    }
    
    if (retryCount < CONFIG.retryAttempts && (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND')) {
      logWarning(`Network error, retrying in ${CONFIG.retryDelay}ms... (attempt ${retryCount + 1}/${CONFIG.retryAttempts})`);
      await sleep(CONFIG.retryDelay);
      return fetchWithRetry(url, options, retryCount + 1);
    }
    
    throw error;
  }
}

// Progress tracking utility
class ProgressTracker {
  constructor(total) {
    this.total = total;
    this.current = 0;
    this.successful = 0;
    this.failed = 0;
    this.skipped = 0;
    this.startTime = Date.now();
  }
  
  update(status) {
    this.current++;
    
    switch(status) {
      case 'success':
        this.successful++;
        break;
      case 'failed':
        this.failed++;
        break;
      case 'skipped':
        this.skipped++;
        break;
    }
    
    const progress = Math.round((this.current / this.total) * 100);
    const elapsed = Date.now() - this.startTime;
    const rate = this.current / (elapsed / 1000);
    const eta = this.current > 0 ? Math.round((this.total - this.current) / rate) : 0;
    
    log(`Progress: ${this.current}/${this.total} (${progress}%) - Success: ${this.successful}, Failed: ${this.failed}, ETA: ${eta}s`);
  }
  
  getSummary() {
    const elapsed = Math.round((Date.now() - this.startTime) / 1000);
    return {
      total: this.total,
      processed: this.current,
      successful: this.successful,
      failed: this.failed,
      skipped: this.skipped,
      elapsedSeconds: elapsed,
      successRate: Math.round((this.successful / this.current) * 100)
    };
  }
}

// Enhanced import function with better error handling
async function importLegislation() {
  let progress = null;
  
  try {
    log('=== HSE Legislation Database Import Started ===');
    
    // Validate input file exists
    const jsonPath = path.join(__dirname, 'hse-legislation-import.json');
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Input file not found: ${jsonPath}. Please run the data preparation script first.`);
    }
    
    // Read and validate JSON file
    log('Reading legislation data from JSON file...');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    let legislationItems;
    
    try {
      legislationItems = JSON.parse(jsonData);
    } catch (error) {
      throw new Error(`Invalid JSON file: ${error.message}`);
    }
    
    if (!Array.isArray(legislationItems) || legislationItems.length === 0) {
      throw new Error('Invalid data: Expected non-empty array of legislation items');
    }
    
    log(`Found ${legislationItems.length} HSE legislation items to process`);
    
    // Test API connectivity
    log('Testing API connectivity...');
    try {
      const testResponse = await fetchWithRetry(`${CONFIG.apiBaseUrl}/api/legal-register/database?limit=1&offset=0`, {
        headers: { 'x-user-area-id': CONFIG.userAreaId }
      });
      
      if (!testResponse.ok) {
        throw new Error(`API test failed: ${testResponse.status} ${testResponse.statusText}`);
      }
      
      logSuccess('API connectivity verified');
    } catch (error) {
      throw new Error(`Cannot connect to API at ${CONFIG.apiBaseUrl}: ${error.message}`);
    }
    
    // Fetch existing legislation to check for duplicates
    log('Fetching existing legislation from database...');
    const existingResponse = await fetchWithRetry(`${CONFIG.apiBaseUrl}/api/legal-register/database?limit=2000&offset=0`, {
      headers: { 'x-user-area-id': CONFIG.userAreaId }
    });
    
    const existingData = await existingResponse.json();
    
    if (!existingData.success) {
      throw new Error(`Failed to fetch existing data: ${existingData.error || 'Unknown error'}`);
    }
    
    const existingNames = new Set(
      (existingData.data || []).map(item => item.Name.toLowerCase().trim())
    );
    
    log(`Found ${existingNames.size} existing legislation items in database`);
    
    // Filter out duplicates
    const newItems = legislationItems.filter(item => 
      !existingNames.has(item.Name.toLowerCase().trim())
    );
    
    const duplicatesCount = legislationItems.length - newItems.length;
    
    log(`${newItems.length} new items to add (${duplicatesCount} duplicates skipped)`);
    
    if (newItems.length === 0) {
      logWarning('No new legislation to add - all items already exist in database');
      return {
        success: true,
        summary: {
          total: legislationItems.length,
          processed: legislationItems.length,
          successful: 0,
          failed: 0,
          skipped: duplicatesCount
        }
      };
    }
    
    // Initialize progress tracking
    progress = new ProgressTracker(newItems.length);
    
    // Process items in batches
    const results = {
      successful: [],
      failed: [],
      errors: []
    };
    
    for (let i = 0; i < newItems.length; i += CONFIG.batchSize) {
      const batch = newItems.slice(i, i + CONFIG.batchSize);
      log(`Processing batch ${Math.floor(i / CONFIG.batchSize) + 1}/${Math.ceil(newItems.length / CONFIG.batchSize)} (${batch.length} items)`);
      
      // Process batch items
      for (const item of batch) {
        try {
          const response = await fetchWithRetry(`${CONFIG.apiBaseUrl}/api/legal-register/database`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-user-area-id': CONFIG.userAreaId
            },
            body: JSON.stringify({
              name: item.Name,
              link: item.Link,
              industryName: item.IndustryName,
              riskLevel: item.RiskLevel,
              complianceStatus: item.ComplianceStatus,
              notes: item.Notes,
              legislationType: item.LegislationType
            })
          });
          
          const result = await response.json();
          
          if (result.success) {
            results.successful.push(item.Name);
            progress.update('success');
            logSuccess(`Added: ${item.Name}`);
          } else {
            results.failed.push(item.Name);
            results.errors.push(`${item.Name}: ${result.error || 'Unknown error'}`);
            progress.update('failed');
            logError(`Failed to add: ${item.Name} - ${result.error}`);
          }
          
        } catch (error) {
          results.failed.push(item.Name);
          results.errors.push(`${item.Name}: ${error.message}`);
          progress.update('failed');
          logError(`Error adding ${item.Name}`, error);
        }
        
        // Small delay between requests
        await sleep(100);
      }
      
      // Delay between batches
      if (i + CONFIG.batchSize < newItems.length) {
        await sleep(500);
      }
    }
    
    // Generate final summary
    const summary = progress.getSummary();
    summary.duplicatesSkipped = duplicatesCount;
    summary.totalInDatabase = existingNames.size + summary.successful;
    
    log('\n=== IMPORT COMPLETE ===');
    log(`Total processed: ${summary.processed}/${summary.total}`);
    log(`Successfully added: ${summary.successful} items`);
    log(`Failed: ${summary.failed} items`);
    log(`Duplicates skipped: ${summary.duplicatesSkipped} items`);
    log(`Success rate: ${summary.successRate}%`);
    log(`Time elapsed: ${summary.elapsedSeconds} seconds`);
    log(`Total in database now: ${summary.totalInDatabase} items`);
    
    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      summary,
      successful: results.successful,
      failed: results.failed,
      errors: results.errors,
      config: CONFIG
    };
    
    const reportPath = path.join(__dirname, `import-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    logSuccess(`Detailed report saved to: ${reportPath}`);
    
    if (results.errors.length > 0) {
      logWarning('Some items failed to import. Check the detailed report for error information.');
    }
    
    return {
      success: true,
      summary,
      report
    };
    
  } catch (error) {
    logError('Fatal error during import', error);
    
    if (progress) {
      const summary = progress.getSummary();
      log(`Partial results - Processed: ${summary.processed}, Success: ${summary.successful}, Failed: ${summary.failed}`);
    }
    
    throw error;
  }
}

// Enhanced main execution
async function main() {
  try {
    const result = await importLegislation();
    
    if (result.success && result.summary.failed === 0) {
      logSuccess('Import completed successfully with no errors');
      process.exit(0);
    } else if (result.success) {
      logWarning('Import completed with some errors - check logs for details');
      process.exit(0);
    }
    
  } catch (error) {
    logError('Import process failed', error);
    process.exit(1);
  }
}

// Run the import
main();