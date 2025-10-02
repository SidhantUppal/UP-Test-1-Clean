/**
 * Test script for route discovery
 * Run with: node test-route-discovery.js
 */

const fs = require('fs');
const path = require('path');

class SimpleRouteDiscovery {
  constructor(appDir) {
    this.appDir = appDir;
    this.ignoredDirs = ['components', 'api', '_components', '_utils'];
  }

  async discoverRoutes() {
    const mainDir = path.join(this.appDir, '(main)');
    const routes = [];
    
    await this.scanDirectory(mainDir, '', routes);
    
    // Group by module
    const modules = {};
    routes.forEach(route => {
      const module = route.module || 'root';
      if (!modules[module]) {
        modules[module] = [];
      }
      modules[module].push(route);
    });
    
    return modules;
  }

  async scanDirectory(dir, routePath, routes) {
    try {
      const entries = await fs.promises.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory() && !this.ignoredDirs.includes(entry.name)) {
          const newRoutePath = routePath ? `${routePath}/${entry.name}` : entry.name;
          
          // Check if this directory has a page.tsx
          const pageFile = path.join(dir, entry.name, 'page.tsx');
          if (fs.existsSync(pageFile)) {
            const segments = newRoutePath.split('/').filter(Boolean);
            routes.push({
              module: segments[0] || 'root',
              page: segments.slice(1).join('/') || 'index',
              route: `/${newRoutePath}`,
              filePath: pageFile
            });
          }
          
          // Recursively scan subdirectories
          await this.scanDirectory(
            path.join(dir, entry.name), 
            newRoutePath, 
            routes
          );
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }
}

// Run the test
async function main() {
  const discovery = new SimpleRouteDiscovery('./apps/frontend/app');
  
  console.log('Discovering routes...\n');
  const modules = await discovery.discoverRoutes();
  
  // Display results
  Object.entries(modules).forEach(([moduleName, routes]) => {
    console.log(`\n📁 ${moduleName.toUpperCase()} MODULE (${routes.length} pages)`);
    console.log('─'.repeat(50));
    
    routes.forEach(route => {
      console.log(`  ${route.route}`);
      if (route.route.includes('[')) {
        console.log(`    └─ Dynamic route`);
      }
    });
  });
  
  // Summary
  const totalRoutes = Object.values(modules).reduce((sum, routes) => sum + routes.length, 0);
  console.log(`\n\n📊 SUMMARY`);
  console.log('─'.repeat(50));
  console.log(`Total modules: ${Object.keys(modules).length}`);
  console.log(`Total routes: ${totalRoutes}`);
}

main().catch(console.error);