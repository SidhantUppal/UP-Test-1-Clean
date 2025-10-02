import sql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import chalk from 'chalk';
import ora from 'ora';

// Load environment variables from root .env
dotenv.config({ path: path.resolve('../../.env') });

export class DevEngineSync {
  constructor() {
    this.config = {
      server: process.env.DB_HOST || 'YOUR_DATABASE_SERVER.database.windows.net',
      database: process.env.DB_NAME || 'V7-Dev',
      user: process.env.DB_USER || 'YOUR_DB_USER',
      password: process.env.DB_PASSWORD,
      options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
      }
    };
    this.pool = null;
  }

  async connect() {
    if (!this.pool) {
      this.pool = await sql.connect(this.config);
      console.log(chalk.green('Connected to Dev_Engine database'));
    }
    return this.pool;
  }

  async disconnect() {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
    }
  }

  async syncDiscoveredEndpoints(discoveryReport) {
    const spinner = ora('Syncing endpoints to Dev_Engine...').start();
    
    try {
      await this.connect();
      
      let created = 0;
      let updated = 0;
      let skipped = 0;

      for (const endpoint of discoveryReport.endpoints) {
        const result = await this.syncEndpoint(endpoint);
        if (result === 'created') created++;
        else if (result === 'updated') updated++;
        else skipped++;
      }

      spinner.succeed(`Sync complete: ${created} created, ${updated} updated, ${skipped} skipped`);
      
      return { created, updated, skipped };
    } catch (error) {
      spinner.fail('Sync failed');
      throw error;
    }
  }

  async syncEndpoint(endpoint) {
    const pool = await this.connect();
    
    // Check if this endpoint already exists in Dev_Engine
    const existing = await pool.request()
      .input('method', sql.NVarChar(10), endpoint.method)
      .input('path', sql.NVarChar(500), endpoint.path)
      .input('service', sql.NVarChar(100), endpoint.service)
      .query(`
        SELECT ElementID 
        FROM [V7].[PermissionElement] 
        WHERE ElementCode = @method + ':' + @path
          AND ArchivedDate IS NULL
      `);

    if (existing.recordset.length > 0) {
      // Update existing
      await pool.request()
        .input('elementId', sql.Int, existing.recordset[0].ElementID)
        .input('handler', sql.NVarChar(255), endpoint.handler)
        .input('userId', sql.Int, 1)
        .query(`
          UPDATE [V7].[PermissionElement]
          SET Description = 'Auto-discovered endpoint: ' + @handler,
              ModifiedByUserID = @userId,
              ModifiedDate = SYSDATETIMEOFFSET()
          WHERE ElementID = @elementId
        `);
      
      return 'updated';
    } else {
      // Create new - first check if module exists
      const moduleResult = await this.ensureModule(endpoint.service);
      const pageResult = await this.ensurePage(moduleResult.moduleId, 'API Endpoints');
      
      // Create element
      await pool.request()
        .input('pageId', sql.Int, pageResult.pageId)
        .input('elementCode', sql.NVarChar(100), `${endpoint.method}:${endpoint.path}`)
        .input('elementName', sql.NVarChar(255), `${endpoint.method} ${endpoint.path}`)
        .input('description', sql.NVarChar(500), `Auto-discovered endpoint: ${endpoint.handler}`)
        .input('elementType', sql.Int, 1) // API type
        .input('displayOrder', sql.Int, 1)
        .input('userAreaId', sql.Int, 1)
        .input('userId', sql.Int, 1)
        .query(`
          INSERT INTO [V7].[PermissionElement] (
            PageID, ElementCode, Name, Description, 
            ElementTypeID, DisplayOrder, IsActive,
            UserAreaID, CreatedByUserID, CreatedDate,
            ModifiedByUserID, ModifiedDate
          ) VALUES (
            @pageId, @elementCode, @elementName, @description,
            @elementType, @displayOrder, 1,
            @userAreaId, @userId, SYSDATETIMEOFFSET(),
            @userId, SYSDATETIMEOFFSET()
          )
        `);
      
      return 'created';
    }
  }

  async ensureModule(serviceName) {
    const pool = await this.connect();
    
    // Check if module exists
    const existing = await pool.request()
      .input('moduleCode', sql.NVarChar(50), serviceName.toUpperCase())
      .query(`
        SELECT ModuleID 
        FROM [V7].[PermissionModule]
        WHERE ModuleCode = @moduleCode
          AND ArchivedDate IS NULL
      `);

    if (existing.recordset.length > 0) {
      return { moduleId: existing.recordset[0].ModuleID };
    }

    // Create module
    const result = await pool.request()
      .input('moduleCode', sql.NVarChar(50), serviceName.toUpperCase())
      .input('name', sql.NVarChar(255), serviceName)
      .input('description', sql.NVarChar(500), `Auto-discovered service: ${serviceName}`)
      .input('displayOrder', sql.Int, 99)
      .input('baseRoute', sql.NVarChar(255), `/api/${serviceName}`)
      .input('userAreaId', sql.Int, 1)
      .input('userId', sql.Int, 1)
      .query(`
        INSERT INTO [V7].[PermissionModule] (
          ModuleCode, Name, Description, DisplayOrder, BaseRoute, IsActive,
          UserAreaID, CreatedByUserID, CreatedDate,
          ModifiedByUserID, ModifiedDate
        ) OUTPUT INSERTED.ModuleID
        VALUES (
          @moduleCode, @name, @description, @displayOrder, @baseRoute, 1,
          @userAreaId, @userId, SYSDATETIMEOFFSET(),
          @userId, SYSDATETIMEOFFSET()
        )
      `);

    return { moduleId: result.recordset[0].ModuleID };
  }

  async ensurePage(moduleId, pageName) {
    const pool = await this.connect();
    
    // Check if page exists
    const existing = await pool.request()
      .input('moduleId', sql.Int, moduleId)
      .input('pageCode', sql.NVarChar(50), pageName.replace(/\s+/g, '_').toUpperCase())
      .query(`
        SELECT PageID 
        FROM [V7].[PermissionPage]
        WHERE ModuleID = @moduleId 
          AND PageCode = @pageCode
          AND ArchivedDate IS NULL
      `);

    if (existing.recordset.length > 0) {
      return { pageId: existing.recordset[0].PageID };
    }

    // Create page
    const result = await pool.request()
      .input('moduleId', sql.Int, moduleId)
      .input('pageCode', sql.NVarChar(50), pageName.replace(/\s+/g, '_').toUpperCase())
      .input('name', sql.NVarChar(255), pageName)
      .input('description', sql.NVarChar(500), 'Auto-discovered API endpoints')
      .input('displayOrder', sql.Int, 1)
      .input('userAreaId', sql.Int, 1)
      .input('userId', sql.Int, 1)
      .query(`
        INSERT INTO [V7].[PermissionPage] (
          ModuleID, PageCode, Name, Description, Route, DisplayOrder, IsActive,
          UserAreaID, CreatedByUserID, CreatedDate,
          ModifiedByUserID, ModifiedDate
        ) OUTPUT INSERTED.PageID
        VALUES (
          @moduleId, @pageCode, @name, @description, '', @displayOrder, 1,
          @userAreaId, @userId, SYSDATETIMEOFFSET(),
          @userId, SYSDATETIMEOFFSET()
        )
      `);

    return { pageId: result.recordset[0].PageID };
  }

  async getPermissionElements() {
    const pool = await this.connect();
    
    const result = await pool.request()
      .input('userAreaId', sql.Int, 1)
      .query(`
        SELECT 
          e.ElementID,
          e.ElementCode,
          e.Name as ElementName,
          e.Description,
          p.Name as PageName,
          m.Name as ModuleName,
          m.ModuleCode
        FROM [V7].[PermissionElement] e
        INNER JOIN [V7].[PermissionPage] p ON e.PageID = p.PageID
        INNER JOIN [V7].[PermissionModule] m ON p.ModuleID = m.ModuleID
        WHERE e.UserAreaID = @userAreaId
          AND e.ArchivedDate IS NULL
          AND p.ArchivedDate IS NULL
          AND m.ArchivedDate IS NULL
        ORDER BY m.DisplayOrder, p.DisplayOrder, e.DisplayOrder
      `);

    return result.recordset;
  }

  async generateModelConfig(serviceName, endpoints) {
    // Analyze endpoints to infer model structure
    const model = {
      name: this.inferModelName(serviceName),
      service: serviceName,
      table: `V7.${this.inferModelName(serviceName)}`,
      fields: [],
      permissions: {
        create: ['TenantAdmin', 'ProjectManager'],
        read: ['all'],
        update: ['TenantAdmin', 'ProjectManager'],
        delete: ['TenantAdmin']
      },
      endpoints: endpoints.map(e => ({
        method: e.method,
        path: e.path,
        handler: e.handler
      }))
    };

    // Save to models directory
    const modelPath = path.join('models', `${serviceName}.model.json`);
    await fs.writeFile(modelPath, JSON.stringify(model, null, 2));
    
    console.log(chalk.green(`Model config saved to ${modelPath}`));
    return model;
  }

  inferModelName(serviceName) {
    // Remove common suffixes and convert to singular
    let name = serviceName
      .replace(/-service$/i, '')
      .replace(/-manager$/i, '')
      .replace(/s$/i, ''); // Simple pluralization removal
    
    // Convert kebab-case to PascalCase
    name = name.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
    
    return name;
  }

  async detectChanges(previousReport, currentReport) {
    const changes = {
      newEndpoints: [],
      removedEndpoints: [],
      modifiedEndpoints: []
    };

    const previousMap = new Map(
      previousReport.endpoints.map(e => [`${e.method}:${e.path}:${e.service}`, e])
    );
    
    const currentMap = new Map(
      currentReport.endpoints.map(e => [`${e.method}:${e.path}:${e.service}`, e])
    );

    // Find new endpoints
    for (const [key, endpoint] of currentMap) {
      if (!previousMap.has(key)) {
        changes.newEndpoints.push(endpoint);
      }
    }

    // Find removed endpoints
    for (const [key, endpoint] of previousMap) {
      if (!currentMap.has(key)) {
        changes.removedEndpoints.push(endpoint);
      }
    }

    return changes;
  }

  async saveReport(report) {
    const reportPath = path.join('output', 'sync-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(chalk.green(`Sync report saved to ${reportPath}`));
  }
}

export default DevEngineSync;