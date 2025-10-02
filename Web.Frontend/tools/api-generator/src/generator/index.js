import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ServiceGenerator {
  constructor() {
    this.templatesPath = path.join(__dirname, '../../templates');
    this.outputPath = path.join(__dirname, '../../output');
    this.registerHelpers();
  }

  registerHelpers() {
    // Handlebars helpers for template processing
    Handlebars.registerHelper('lowercase', str => str.toLowerCase());
    Handlebars.registerHelper('uppercase', str => str.toUpperCase());
    Handlebars.registerHelper('camelCase', str => {
      return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
    });
    Handlebars.registerHelper('pascalCase', str => {
      const camel = str.replace(/-([a-z])/g, g => g[1].toUpperCase());
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    });
    Handlebars.registerHelper('singular', str => {
      // Simple singularization
      if (str.endsWith('ies')) return str.slice(0, -3) + 'y';
      if (str.endsWith('es')) return str.slice(0, -2);
      if (str.endsWith('s')) return str.slice(0, -1);
      return str;
    });
    Handlebars.registerHelper('sqlType', tsType => {
      const typeMap = {
        'string': 'NVARCHAR(255)',
        'number': 'INT',
        'boolean': 'BIT',
        'Date': 'DATETIMEOFFSET',
        'text': 'NVARCHAR(MAX)'
      };
      return typeMap[tsType] || 'NVARCHAR(255)';
    });
    Handlebars.registerHelper('eq', (a, b) => a === b);
    Handlebars.registerHelper('unless', (conditional, options) => {
      if (!conditional) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });
  }

  async generateService(modelConfig) {
    const spinner = ora(`Generating service for ${modelConfig.name}...`).start();
    
    try {
      const serviceName = `${modelConfig.name.toLowerCase()}-service`;
      const servicePath = path.join(this.outputPath, serviceName);
      
      // Create service directory structure
      await this.createDirectoryStructure(servicePath);
      
      // Generate files
      await this.generatePackageJson(servicePath, modelConfig);
      await this.generateMainFile(servicePath, modelConfig);
      await this.generateRoutes(servicePath, modelConfig);
      await this.generateServiceLayer(servicePath, modelConfig);
      await this.generateRepository(servicePath, modelConfig);
      await this.generateDatabaseConfig(servicePath, modelConfig);
      await this.generateMigration(servicePath, modelConfig);
      await this.generateTypes(servicePath, modelConfig);
      await this.generateDocumentation(servicePath, modelConfig);
      
      spinner.succeed(`Service generated at ${servicePath}`);
      return servicePath;
    } catch (error) {
      spinner.fail(`Failed to generate service: ${error.message}`);
      throw error;
    }
  }

  async createDirectoryStructure(servicePath) {
    const dirs = [
      servicePath,
      path.join(servicePath, 'src'),
      path.join(servicePath, 'src', 'routes'),
      path.join(servicePath, 'src', 'services'),
      path.join(servicePath, 'src', 'repositories'),
      path.join(servicePath, 'src', 'middleware'),
      path.join(servicePath, 'migrations'),
      path.join(servicePath, 'types'),
      path.join(servicePath, 'test')
    ];

    for (const dir of dirs) {
      await fs.mkdir(dir, { recursive: true });
    }
  }

  async generatePackageJson(servicePath, model) {
    const template = await this.loadTemplate('service/package.json.hbs');
    const content = template({
      serviceName: `${model.name.toLowerCase()}-service`,
      description: `CRUD API service for ${model.name}`,
      port: model.port || 3030
    });
    
    await fs.writeFile(path.join(servicePath, 'package.json'), content);
  }

  async generateMainFile(servicePath, model) {
    const template = await this.loadTemplate('service/main.js.hbs');
    const content = template({
      serviceName: model.name,
      port: model.port || 3030,
      resourceName: model.name.toLowerCase()
    });
    
    await fs.writeFile(path.join(servicePath, 'src', 'main.js'), content);
  }

  async generateRoutes(servicePath, model) {
    const template = await this.loadTemplate('routes/crud.routes.js.hbs');
    const content = template({
      resourceName: model.name.toLowerCase(),
      ResourceName: model.name,
      fields: model.fields
    });
    
    const fileName = `${model.name.toLowerCase()}.routes.js`;
    await fs.writeFile(path.join(servicePath, 'src', 'routes', fileName), content);
  }

  async generateServiceLayer(servicePath, model) {
    const template = await this.loadTemplate('service/service.js.hbs');
    const content = template({
      resourceName: model.name.toLowerCase(),
      ResourceName: model.name,
      fields: model.fields,
      tableName: model.table
    });
    
    const fileName = `${model.name.toLowerCase()}.service.js`;
    await fs.writeFile(path.join(servicePath, 'src', 'services', fileName), content);
  }

  async generateRepository(servicePath, model) {
    const template = await this.loadTemplate('repository/repository.js.hbs');
    const content = template({
      resourceName: model.name.toLowerCase(),
      ResourceName: model.name,
      tableName: model.table,
      fields: model.fields,
      idField: `${model.name}ID`
    });
    
    const fileName = `${model.name.toLowerCase()}.repository.js`;
    await fs.writeFile(path.join(servicePath, 'src', 'repositories', fileName), content);
  }

  async generateDatabaseConfig(servicePath, model) {
    const template = await this.loadTemplate('service/database.js.hbs');
    const content = template({});
    
    await fs.writeFile(path.join(servicePath, 'src', 'database.js'), content);
  }

  async generateMigration(servicePath, model) {
    const template = await this.loadTemplate('migrations/create-table.sql.hbs');
    const content = template({
      tableName: model.table,
      ResourceName: model.name,
      idField: `${model.name}ID`,
      fields: model.fields
    });
    
    const fileName = `001-create-${model.name.toLowerCase()}-table.sql`;
    await fs.writeFile(path.join(servicePath, 'migrations', fileName), content);
  }

  async generateTypes(servicePath, model) {
    const template = await this.loadTemplate('types/types.ts.hbs');
    const content = template({
      ResourceName: model.name,
      fields: model.fields
    });
    
    const fileName = `${model.name.toLowerCase()}.types.ts`;
    await fs.writeFile(path.join(servicePath, 'types', fileName), content);
  }

  async generateDocumentation(servicePath, model) {
    const template = await this.loadTemplate('service/README.md.hbs');
    const content = template({
      serviceName: `${model.name}-service`,
      ResourceName: model.name,
      resourceName: model.name.toLowerCase(),
      port: model.port || 3030,
      fields: model.fields
    });
    
    await fs.writeFile(path.join(servicePath, 'README.md'), content);
  }

  async loadTemplate(templatePath) {
    const fullPath = path.join(this.templatesPath, templatePath);
    const content = await fs.readFile(fullPath, 'utf8');
    return Handlebars.compile(content);
  }

  async generateFromButton(buttonElement) {
    // Infer model from button name
    const model = this.inferModelFromButton(buttonElement);
    
    // Generate the service
    return this.generateService(model);
  }

  inferModelFromButton(button) {
    // Parse button name like "Create Contractor" or "Delete Document"
    const parts = button.name.split(' ');
    const action = parts[0].toLowerCase();
    const resource = parts.slice(1).join('');
    
    const model = {
      name: resource,
      table: `V7.${resource}`,
      fields: this.inferFieldsForResource(resource),
      port: this.getNextAvailablePort(),
      permissions: {
        create: ['TenantAdmin', 'ProjectManager'],
        read: ['all'],
        update: ['TenantAdmin', 'ProjectManager'],
        delete: ['TenantAdmin']
      }
    };
    
    return model;
  }

  inferFieldsForResource(resourceName) {
    // Default fields based on resource type
    const commonFields = [
      { name: 'Name', type: 'string', required: true },
      { name: 'Description', type: 'text', required: false },
      { name: 'IsActive', type: 'boolean', required: true, default: true }
    ];
    
    // Add resource-specific fields
    const resourceFields = {
      'Contractor': [
        { name: 'CompanyName', type: 'string', required: true },
        { name: 'ContactEmail', type: 'string', required: true },
        { name: 'ContactPhone', type: 'string', required: false },
        { name: 'Address', type: 'text', required: false },
        { name: 'InsuranceExpiry', type: 'Date', required: false }
      ],
      'Document': [
        { name: 'FileName', type: 'string', required: true },
        { name: 'FileSize', type: 'number', required: true },
        { name: 'MimeType', type: 'string', required: true },
        { name: 'StorageUrl', type: 'string', required: true },
        { name: 'Version', type: 'number', required: true, default: 1 }
      ],
      'Task': [
        { name: 'Title', type: 'string', required: true },
        { name: 'DueDate', type: 'Date', required: false },
        { name: 'Priority', type: 'string', required: true },
        { name: 'Status', type: 'string', required: true },
        { name: 'AssignedToUserID', type: 'number', required: false }
      ]
    };
    
    return resourceFields[resourceName] || commonFields;
  }

  getNextAvailablePort() {
    // Start from 3030 and increment
    // In real implementation, would check which ports are in use
    return 3030 + Math.floor(Math.random() * 100);
  }
}

export default ServiceGenerator;