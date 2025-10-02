import fs from 'fs/promises';
import path from 'path';
import { parseJavaScript } from './ast-parser.js';
import { detectEndpoints } from './endpoint-detector.js';
import { extractTypeScript } from './typescript-extractor.js';
import chalk from 'chalk';
import ora from 'ora';

export class ServiceScanner {
  constructor(config = {}) {
    this.servicesPath = config.servicesPath || '../../apps/services';
    this.discoveredServices = new Map();
    this.discoveredEndpoints = [];
    this.discoveredModels = new Map();
  }

  async scanAllServices() {
    const spinner = ora('Scanning services...').start();
    
    try {
      const servicesDir = path.resolve(this.servicesPath);
      const services = await this.getServiceDirectories(servicesDir);
      
      spinner.text = `Found ${services.length} services to scan`;
      
      for (const service of services) {
        await this.scanService(service);
      }
      
      spinner.succeed(`Scanned ${services.length} services successfully`);
      return this.generateReport();
    } catch (error) {
      spinner.fail('Failed to scan services');
      throw error;
    }
  }

  async getServiceDirectories(basePath) {
    const dirs = [];
    const entries = await fs.readdir(basePath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const servicePath = path.join(basePath, entry.name);
        
        // Check if it's a valid service (has package.json)
        try {
          await fs.access(path.join(servicePath, 'package.json'));
          dirs.push({
            name: entry.name,
            path: servicePath
          });
        } catch {
          // Not a service, skip
        }
      }
    }
    
    return dirs;
  }

  async scanService(service) {
    console.log(chalk.blue(`  Scanning ${service.name}...`));
    
    const serviceData = {
      name: service.name,
      endpoints: [],
      models: [],
      routes: [],
      repositories: []
    };

    // Scan routes
    const routesPath = path.join(service.path, 'src', 'routes');
    try {
      const routeFiles = await this.findJSFiles(routesPath);
      for (const file of routeFiles) {
        const endpoints = await this.scanRouteFile(file);
        serviceData.endpoints.push(...endpoints);
      }
    } catch (error) {
      console.log(chalk.yellow(`    No routes found in ${service.name}`));
    }

    // Scan repositories
    const repoPath = path.join(service.path, 'src', 'repositories');
    try {
      const repoFiles = await this.findJSFiles(repoPath);
      for (const file of repoFiles) {
        const sqlPatterns = await this.scanRepositoryFile(file);
        serviceData.repositories.push(...sqlPatterns);
      }
    } catch (error) {
      // No repositories
    }

    // Scan for TypeScript types
    const typesPath = path.join(service.path, 'types');
    try {
      const typeFiles = await this.findTSFiles(typesPath);
      for (const file of typeFiles) {
        const types = await extractTypeScript(file);
        serviceData.models.push(...types);
      }
    } catch (error) {
      // No types directory
    }

    this.discoveredServices.set(service.name, serviceData);
    this.discoveredEndpoints.push(...serviceData.endpoints);
    
    console.log(chalk.green(`    ✓ Found ${serviceData.endpoints.length} endpoints`));
  }

  async scanRouteFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const endpoints = detectEndpoints(content, filePath);
    
    return endpoints.map(endpoint => ({
      ...endpoint,
      file: filePath,
      service: path.basename(path.dirname(path.dirname(path.dirname(filePath))))
    }));
  }

  async scanRepositoryFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const patterns = [];
    
    // Extract SQL queries and table references
    const sqlRegex = /\[V7\]\.\[(\w+)\]/g;
    const matches = [...content.matchAll(sqlRegex)];
    
    for (const match of matches) {
      patterns.push({
        table: match[1],
        file: filePath
      });
    }
    
    return patterns;
  }

  async findJSFiles(dirPath) {
    const files = [];
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isFile() && entry.name.endsWith('.js')) {
          files.push(fullPath);
        } else if (entry.isDirectory()) {
          const subFiles = await this.findJSFiles(fullPath);
          files.push(...subFiles);
        }
      }
    } catch (error) {
      // Directory doesn't exist
    }
    
    return files;
  }

  async findTSFiles(dirPath) {
    const files = [];
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.d.ts'))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Directory doesn't exist
    }
    
    return files;
  }

  generateReport() {
    const report = {
      summary: {
        totalServices: this.discoveredServices.size,
        totalEndpoints: this.discoveredEndpoints.length,
        totalModels: this.discoveredModels.size
      },
      services: Array.from(this.discoveredServices.entries()).map(([name, data]) => ({
        name,
        endpointCount: data.endpoints.length,
        modelCount: data.models.length,
        endpoints: data.endpoints.map(e => ({
          method: e.method,
          path: e.path,
          handler: e.handler
        }))
      })),
      endpoints: this.discoveredEndpoints,
      models: Array.from(this.discoveredModels.values())
    };

    return report;
  }

  async saveReport(outputPath) {
    const report = this.generateReport();
    const jsonPath = path.join(outputPath, 'discovery-report.json');
    
    await fs.writeFile(jsonPath, JSON.stringify(report, null, 2));
    console.log(chalk.green(`\nReport saved to ${jsonPath}`));
    
    // Also create a human-readable markdown report
    const mdReport = this.generateMarkdownReport(report);
    const mdPath = path.join(outputPath, 'discovery-report.md');
    await fs.writeFile(mdPath, mdReport);
    console.log(chalk.green(`Markdown report saved to ${mdPath}`));
  }

  generateMarkdownReport(report) {
    let md = '# API Discovery Report\n\n';
    md += `Generated: ${new Date().toISOString()}\n\n`;
    
    md += '## Summary\n';
    md += `- **Total Services**: ${report.summary.totalServices}\n`;
    md += `- **Total Endpoints**: ${report.summary.totalEndpoints}\n`;
    md += `- **Total Models**: ${report.summary.totalModels}\n\n`;
    
    md += '## Services\n\n';
    for (const service of report.services) {
      md += `### ${service.name}\n`;
      md += `- Endpoints: ${service.endpointCount}\n`;
      md += `- Models: ${service.modelCount}\n\n`;
      
      if (service.endpoints.length > 0) {
        md += '#### Endpoints:\n';
        for (const endpoint of service.endpoints) {
          md += `- \`${endpoint.method} ${endpoint.path}\`\n`;
        }
        md += '\n';
      }
    }
    
    return md;
  }
}

export default ServiceScanner;