#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs/promises';
import { ServiceScanner } from './scanner/index.js';
import { DevEngineSync } from './sync/index.js';
import { ServiceGenerator } from './generator/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ASCII Art Banner
const banner = `
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║     █████╗ ██████╗ ██╗    ██████╗ ███████╗███╗   ██╗ ║
║    ██╔══██╗██╔══██╗██║   ██╔════╝ ██╔════╝████╗  ██║ ║
║    ███████║██████╔╝██║   ██║  ███╗█████╗  ██╔██╗ ██║ ║
║    ██╔══██║██╔═══╝ ██║   ██║   ██║██╔══╝  ██║╚██╗██║ ║
║    ██║  ██║██║     ██║   ╚██████╔╝███████╗██║ ╚████║ ║
║    ╚═╝  ╚═╝╚═╝     ╚═╝    ╚═════╝ ╚══════╝╚═╝  ╚═══╝ ║
║                                                       ║
║            Portal-V7 API Generator Tool               ║
╚═══════════════════════════════════════════════════════╝
`;

console.log(chalk.cyan(banner));

program
  .name('api-generator')
  .description('API Generator and Discovery Tool for Portal-V7')
  .version('1.0.0');

// Scan command
program
  .command('scan')
  .description('Scan existing services and discover APIs')
  .option('-p, --path <path>', 'Services directory path', '../../apps/services')
  .option('-o, --output <path>', 'Output directory', './output')
  .action(async (options) => {
    console.log(chalk.blue('\n📡 Starting API Discovery...\n'));
    
    try {
      const scanner = new ServiceScanner({ servicesPath: options.path });
      const report = await scanner.scanAllServices();
      
      // Save report
      await scanner.saveReport(options.output);
      
      // Display summary
      console.log(chalk.green('\n✅ Discovery Complete!\n'));
      console.log(chalk.white('Summary:'));
      console.log(`  • Services: ${report.summary.totalServices}`);
      console.log(`  • Endpoints: ${report.summary.totalEndpoints}`);
      console.log(`  • Models: ${report.summary.totalModels}`);
      
      // Show services
      console.log(chalk.white('\nDiscovered Services:'));
      for (const service of report.services) {
        console.log(`  • ${chalk.cyan(service.name)} - ${service.endpointCount} endpoints`);
      }
    } catch (error) {
      console.error(chalk.red(`\n❌ Scan failed: ${error.message}`));
      process.exit(1);
    }
  });

// Sync command
program
  .command('sync')
  .description('Sync discovered APIs with Dev_Engine')
  .option('-r, --report <path>', 'Discovery report path', './output/discovery-report.json')
  .action(async (options) => {
    console.log(chalk.blue('\n🔄 Starting Dev_Engine Sync...\n'));
    
    try {
      // Load discovery report
      const reportContent = await fs.readFile(options.report, 'utf8');
      const report = JSON.parse(reportContent);
      
      const sync = new DevEngineSync();
      const result = await sync.syncDiscoveredEndpoints(report);
      
      console.log(chalk.green('\n✅ Sync Complete!\n'));
      console.log(`  • Created: ${result.created}`);
      console.log(`  • Updated: ${result.updated}`);
      console.log(`  • Skipped: ${result.skipped}`);
      
      await sync.disconnect();
    } catch (error) {
      console.error(chalk.red(`\n❌ Sync failed: ${error.message}`));
      process.exit(1);
    }
  });

// Generate command
program
  .command('generate <resource>')
  .description('Generate a new CRUD API service')
  .option('-m, --model <path>', 'Model config file path')
  .option('-o, --output <path>', 'Output directory', './output')
  .option('-p, --port <port>', 'Service port', '3030')
  .action(async (resource, options) => {
    console.log(chalk.blue(`\n🚀 Generating ${resource} Service...\n`));
    
    try {
      const generator = new ServiceGenerator();
      
      let model;
      if (options.model) {
        // Load model from file
        const modelContent = await fs.readFile(options.model, 'utf8');
        model = JSON.parse(modelContent);
      } else {
        // Create default model
        model = {
          name: resource,
          table: `V7.${resource}`,
          port: parseInt(options.port),
          fields: [
            { name: 'Name', type: 'string', required: true },
            { name: 'Description', type: 'text', required: false },
            { name: 'IsActive', type: 'boolean', required: true }
          ]
        };
      }
      
      const servicePath = await generator.generateService(model);
      
      console.log(chalk.green('\n✅ Service Generated Successfully!\n'));
      console.log(chalk.white('Next steps:'));
      console.log(`  1. Review generated code at: ${chalk.cyan(servicePath)}`);
      console.log(`  2. Copy to your services directory`);
      console.log(`  3. Run migrations to create database table`);
      console.log(`  4. Start the service with: ${chalk.cyan('npm start')}`);
    } catch (error) {
      console.error(chalk.red(`\n❌ Generation failed: ${error.message}`));
      process.exit(1);
    }
  });

// Watch command
program
  .command('watch')
  .description('Watch for changes in services and auto-sync')
  .option('-p, --path <path>', 'Services directory path', '../../apps/services')
  .action(async (options) => {
    console.log(chalk.blue('\n👁️  Watching for changes...\n'));
    console.log(chalk.gray('Press Ctrl+C to stop\n'));
    
    const chokidar = await import('chokidar');
    
    const watcher = chokidar.watch(path.join(options.path, '**/*.js'), {
      ignored: /(^|[\/\\])\../,
      persistent: true
    });
    
    watcher.on('change', async (filePath) => {
      console.log(chalk.yellow(`\n📝 File changed: ${filePath}`));
      
      // Re-scan just this service
      const serviceName = path.basename(path.dirname(path.dirname(filePath)));
      console.log(chalk.blue(`   Re-scanning ${serviceName}...`));
      
      // TODO: Implement incremental scan
    });
    
    watcher.on('add', (filePath) => {
      console.log(chalk.green(`\n➕ File added: ${filePath}`));
    });
    
    watcher.on('unlink', (filePath) => {
      console.log(chalk.red(`\n➖ File removed: ${filePath}`));
    });
  });

// Test command
program
  .command('test')
  .description('Test the generator with sample data')
  .action(async () => {
    console.log(chalk.blue('\n🧪 Running Generator Test...\n'));
    
    try {
      const generator = new ServiceGenerator();
      
      // Test with Contractor model
      const testModel = {
        name: 'Contractor',
        table: 'V7.Contractor',
        port: 3035,
        fields: [
          { name: 'CompanyName', type: 'string', required: true },
          { name: 'ContactEmail', type: 'string', required: true },
          { name: 'ContactPhone', type: 'string', required: false },
          { name: 'Address', type: 'text', required: false },
          { name: 'InsuranceExpiry', type: 'Date', required: false },
          { name: 'IsActive', type: 'boolean', required: true }
        ]
      };
      
      const servicePath = await generator.generateService(testModel);
      
      console.log(chalk.green('\n✅ Test Successful!\n'));
      console.log(`Generated test service at: ${chalk.cyan(servicePath)}`);
    } catch (error) {
      console.error(chalk.red(`\n❌ Test failed: ${error.message}`));
      process.exit(1);
    }
  });

// Interactive mode (default)
if (process.argv.length === 2) {
  console.log(chalk.yellow('\nNo command specified. Use --help to see available commands.\n'));
  program.help();
}

program.parse(process.argv);