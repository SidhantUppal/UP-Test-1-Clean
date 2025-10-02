#!/usr/bin/env node

/**
 * Portal V7 - Local Development Environment Auto-Setup Script
 * This script automates the setup of a local development environment on Windows
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('');
  log(`${'='.repeat(60)}`, colors.cyan);
  log(title, colors.bright + colors.cyan);
  log(`${'='.repeat(60)}`, colors.cyan);
  console.log('');
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.blue);
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(`${colors.yellow}${prompt}${colors.reset}`, (answer) => {
      resolve(answer);
    });
  });
}

function execCommand(command, options = {}) {
  try {
    const result = execSync(command, { 
      encoding: 'utf-8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
    return { success: true, output: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function checkNodeVersion() {
  const result = execCommand('node --version', { silent: true });
  if (result.success) {
    const version = result.output.trim();
    const versionParts = version.substring(1).split('.');
    const major = parseInt(versionParts[0]);
    const minor = parseInt(versionParts[1]);
    
    logInfo(`Node.js version detected: ${version}`);
    
    // Check for specific version requirements
    if (major >= 22) {
      logSuccess(`Node.js ${version} meets recommended version (v22+)`);
      return { success: true, version, major, minor };
    } else if (major === 20 || major === 21) {
      logWarning(`Node.js ${version} detected. Version 22+ is recommended for best compatibility.`);
      return { success: true, version, major, minor };
    } else if (major === 18 || major === 19) {
      logWarning(`Node.js ${version} detected. This version works but v22+ is strongly recommended.`);
      logWarning('You may experience issues with some newer features.');
      return { success: true, version, major, minor };
    } else {
      logError(`Node.js ${version} is not supported. Minimum required version is v18.0.0`);
      logInfo('Please install Node.js v22+ from: https://nodejs.org/');
      return { success: false, version, major, minor };
    }
  }
  logError('Could not detect Node.js version');
  return { success: false };
}

function checkNpm() {
  const result = execCommand('npm --version', { silent: true });
  if (result.success) {
    const version = result.output.trim();
    const major = parseInt(version.split('.')[0]);
    
    logInfo(`npm version detected: ${version}`);
    
    // npm version requirements (npm 8+ for Node 18+, npm 10+ for Node 22+)
    if (major >= 10) {
      logSuccess(`npm ${version} meets recommended version (v10+)`);
      return { success: true, version, major };
    } else if (major >= 8) {
      logWarning(`npm ${version} detected. Version 10+ is recommended for Node.js v22+`);
      return { success: true, version, major };
    } else {
      logError(`npm ${version} is too old. Please upgrade npm: npm install -g npm@latest`);
      return { success: false, version, major };
    }
  }
  logError('Could not detect npm version');
  return { success: false };
}

function checkGit() {
  const result = execCommand('git --version', { silent: true });
  if (result.success) {
    logSuccess(`Git detected: ${result.output.trim()}`);
    
    // Check current branch
    const branchResult = execCommand('git branch --show-current', { silent: true });
    if (branchResult.success) {
      const currentBranch = branchResult.output.trim();
      logInfo(`Current git branch: ${currentBranch}`);
      
      // Check if on recommended branch
      if (!['develop', 'main', 'entra', 'neil', 'adele'].includes(currentBranch)) {
        logWarning(`You're on branch '${currentBranch}'. Consider switching to 'develop' for feature work.`);
      }
    }
    return true;
  }
  return false;
}

function checkPackageVersions() {
  logSection('Checking Package Versions');
  
  const packageJsonPath = './package.json';
  if (!fs.existsSync(packageJsonPath)) {
    logError('package.json not found');
    return false;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    // Check for critical package versions
    const criticalPackages = {
      'react': { min: '18.0.0', recommended: '19.0.0' },
      'react-dom': { min: '18.0.0', recommended: '19.0.0' },
      'next': { min: '14.0.0', recommended: '15.0.0' },
      '@nx/next': { min: '19.0.0', recommended: '21.0.0' },
      'typescript': { min: '5.0.0', recommended: '5.3.0' }
    };
    
    let hasIssues = false;
    
    // Check dependencies
    const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    for (const [pkg, requirements] of Object.entries(criticalPackages)) {
      if (allDeps[pkg]) {
        const version = allDeps[pkg].replace(/[\^~]/, '');
        logInfo(`${pkg}: ${version}`);
        
        // Simple version comparison (could be enhanced)
        if (version < requirements.min) {
          logError(`${pkg} version ${version} is below minimum ${requirements.min}`);
          hasIssues = true;
        } else if (version < requirements.recommended) {
          logWarning(`${pkg} version ${version} works but ${requirements.recommended}+ is recommended`);
        } else {
          logSuccess(`${pkg} version ${version} meets requirements`);
        }
      }
    }
    
    // Check for React version mismatch
    if (allDeps['react'] && allDeps['react-dom']) {
      const reactVersion = allDeps['react'].replace(/[\^~]/, '');
      const reactDomVersion = allDeps['react-dom'].replace(/[\^~]/, '');
      if (reactVersion !== reactDomVersion) {
        logWarning(`React (${reactVersion}) and React-DOM (${reactDomVersion}) versions should match`);
        hasIssues = true;
      }
    }
    
    // Check NX workspace
    const nxPackages = Object.keys(allDeps).filter(pkg => pkg.startsWith('@nx/'));
    if (nxPackages.length > 0) {
      const nxVersions = new Set(nxPackages.map(pkg => allDeps[pkg].replace(/[\^~]/, '')));
      if (nxVersions.size > 1) {
        logWarning('Multiple NX package versions detected. All @nx/* packages should use the same version.');
        logInfo(`Found versions: ${Array.from(nxVersions).join(', ')}`);
        hasIssues = true;
      } else {
        logSuccess(`NX packages aligned at version ${Array.from(nxVersions)[0]}`);
      }
    }
    
    return !hasIssues;
  } catch (error) {
    logError(`Failed to check package versions: ${error.message}`);
    return false;
  }
}

function checkNxSetup() {
  logSection('Checking NX Workspace');
  
  // Check if nx.json exists
  if (!fs.existsSync('nx.json')) {
    logError('nx.json not found. This may not be an NX workspace.');
    return false;
  }
  
  // Check NX CLI
  const nxVersion = execCommand('npx nx --version', { silent: true });
  if (nxVersion.success) {
    logSuccess(`NX CLI version: ${nxVersion.output.trim()}`);
  } else {
    logWarning('NX CLI not found. It will be installed with npm install.');
  }
  
  // Check NX cache
  if (fs.existsSync('.nx/cache')) {
    const cacheSize = execCommand('du -sh .nx/cache 2>/dev/null', { silent: true });
    if (cacheSize.success) {
      logInfo(`NX cache size: ${cacheSize.output.trim().split('\t')[0]}`);
    }
  }
  
  return true;
}

function displayGitWorkflow() {
  logSection('Git Repository Workflow');
  
  logInfo('Repository: https://business-safety.visualstudio.com/Portal%20-%20V7/_git/Portal%20-%20V7');
  console.log('');
  
  log('Branch Structure:', colors.cyan);
  log('  • main       - Production source of truth (protected)', colors.blue);
  log('  • develop    - Integration branch for all features', colors.blue);
  log('  • entra      - Entra authentication integration', colors.blue);
  log('  • neil/adele - Personal working branches', colors.blue);
  console.log('');
  
  log('Daily Workflow:', colors.cyan);
  log('  1. git pull                     # Update your branch', colors.yellow);
  log('  2. git pull origin develop      # Sync with develop', colors.yellow);
  log('  3. [make your changes]', colors.yellow);
  log('  4. git add .', colors.yellow);
  log('  5. git commit -m "#[task-id] message"', colors.yellow);
  log('  6. git push', colors.yellow);
  console.log('');
  
  log('Merging to develop:', colors.cyan);
  log('  1. Ensure your branch is up to date with develop', colors.yellow);
  log('  2. Push your changes to your branch', colors.yellow);
  log('  3. Switch to develop: git checkout develop', colors.yellow);
  log('  4. Pull from your branch: git pull origin [your-branch]', colors.yellow);
  log('  5. Resolve any conflicts', colors.yellow);
  log('  6. Commit and push to develop', colors.yellow);
  console.log('');
}

function checkDocker() {
  const result = execCommand('docker --version 2>/dev/null', { silent: true });
  if (result.success && !result.output.includes('could not be found')) {
    logSuccess(`Docker detected: ${result.output.trim()}`);
    return true;
  }
  
  // Check if we're in WSL
  const wslCheck = execCommand('uname -r', { silent: true });
  if (wslCheck.success && wslCheck.output.toLowerCase().includes('microsoft')) {
    logWarning('Docker not found in WSL. You can:');
    logInfo('  1. Enable Docker Desktop WSL2 integration');
    logInfo('  2. Use a local SQL Server instance');
    logInfo('  3. Connect to SQL Server on Windows host');
  } else {
    logWarning('Docker not found. You can use a local SQL Server instance instead.');
  }
  return false;
}

function cleanupDuplicateLockFiles() {
  logSection('Cleaning Package Lock Files');
  
  const parentLockFile = path.join('..', 'package-lock.json');
  if (fs.existsSync(parentLockFile)) {
    logWarning('Found package-lock.json in parent directory');
    fs.unlinkSync(parentLockFile);
    logSuccess('Removed parent package-lock.json');
  } else {
    logSuccess('No duplicate package-lock.json files found');
  }
}

function cleanNodeModules() {
  logSection('Cleaning Node Modules');
  
  // Clean root node_modules
  if (fs.existsSync('node_modules')) {
    logInfo('Removing root node_modules');
    execCommand('rm -rf node_modules', { silent: true });
  }
  
  // Clean frontend node_modules
  if (fs.existsSync('apps/frontend/node_modules')) {
    logInfo('Removing apps/frontend/node_modules');
    execCommand('rm -rf apps/frontend/node_modules', { silent: true });
  }
  
  // Clean service node_modules
  const servicesDir = 'apps/services';
  if (fs.existsSync(servicesDir)) {
    const services = fs.readdirSync(servicesDir);
    services.forEach(service => {
      const nodeModulesPath = path.join(servicesDir, service, 'node_modules');
      if (fs.existsSync(nodeModulesPath)) {
        logInfo(`Removing ${nodeModulesPath}`);
        execCommand(`rm -rf "${nodeModulesPath}"`, { silent: true });
      }
    });
  }
  
  // Clean libs node_modules
  if (fs.existsSync('libs')) {
    const libs = fs.readdirSync('libs');
    libs.forEach(lib => {
      const nodeModulesPath = path.join('libs', lib, 'node_modules');
      if (fs.existsSync(nodeModulesPath)) {
        logInfo(`Removing ${nodeModulesPath}`);
        execCommand(`rm -rf "${nodeModulesPath}"`, { silent: true });
      }
    });
  }
  
  logSuccess('Node modules cleaned');
}

function installDependencies() {
  logSection('Installing Dependencies');
  
  logInfo('This will take approximately 3 minutes...');
  const result = execCommand('npm install');
  
  if (result.success) {
    logSuccess('Dependencies installed successfully');
    return true;
  } else {
    logError('Failed to install dependencies');
    return false;
  }
}

function fixFrontendPackageJson() {
  logSection('Fixing Frontend Package.json');
  
  const packageJsonPath = path.join('apps', 'frontend', 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    logError('Frontend package.json not found');
    return false;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    // Fix the dev script
    if (packageJson.scripts && packageJson.scripts.dev) {
      const oldScript = packageJson.scripts.dev;
      packageJson.scripts.dev = 'node ../../node_modules/next/dist/bin/next dev';
      
      if (oldScript !== packageJson.scripts.dev) {
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        logSuccess('Fixed frontend package.json dev script');
      } else {
        logSuccess('Frontend package.json dev script already correct');
      }
    }
    
    return true;
  } catch (error) {
    logError(`Failed to fix frontend package.json: ${error.message}`);
    return false;
  }
}

function createDirectories() {
  logSection('Creating Required Directories');
  
  const dirs = [
    'storage/uploads',
    'storage/documents',
    'logs/emails'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      logSuccess(`Created ${dir}`);
    } else {
      logInfo(`${dir} already exists`);
    }
  });
}

function generateSecureKey() {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
}

function createEnvFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (fs.existsSync(filePath)) {
    return { exists: true };
  }
  
  fs.writeFileSync(filePath, content);
  return { created: true };
}

async function setupEnvironmentFiles(useDocker, sqlConfig) {
  logSection('Setting Up Environment Files');
  
  // Check for existing env files
  const existingEnvFiles = [];
  if (fs.existsSync('.env')) existingEnvFiles.push('.env');
  if (fs.existsSync('apps/frontend/.env.local')) existingEnvFiles.push('apps/frontend/.env.local');
  
  if (existingEnvFiles.length > 0) {
    logWarning('Found existing environment files:');
    existingEnvFiles.forEach(file => logInfo(`  - ${file}`));
    const overwrite = await question('Do you want to overwrite existing env files? (y/n): ');
    if (overwrite.toLowerCase() !== 'y') {
      logInfo('Skipping environment file creation to preserve existing configuration');
      return;
    }
  }
  
  const jwtSecret = generateSecureKey();
  
  // Root .env
  const rootEnv = `# Database Configuration
DB_HOST=${sqlConfig.host || 'localhost'}
DB_NAME=${sqlConfig.database || 'V7-Dev'}
DB_USER=${sqlConfig.user || 'sa'}
DB_PASSWORD=${sqlConfig.password || 'Dev@2024!'}

# JWT Configuration (for mock auth)
JWT_SECRET=${jwtSecret}

# Mock Services Configuration
USE_MOCK_AUTH=true
USE_MOCK_EMAIL=true
USE_LOCAL_STORAGE=true

# API Keys (optional for local)
CLAUDE_API_KEY=mock-api-key-for-local-dev

# Local File Storage (instead of Azure Blob)
LOCAL_STORAGE_PATH=./storage/uploads
LOCAL_DOCUMENTS_PATH=./storage/documents

# Mock Email Service
MOCK_EMAIL_ENABLED=true
MOCK_EMAIL_LOG_PATH=./logs/emails

# Environment
NODE_ENV=development
`;

  const rootResult = createEnvFile('.env', rootEnv);
  if (rootResult.created) {
    logSuccess('Created root .env file');
  } else {
    logInfo('Root .env file already exists (skipped)');
  }

  // Frontend .env.local
  const frontendEnv = `# Database Configuration
DB_SERVER=${sqlConfig.host || 'localhost'}
DB_NAME=${sqlConfig.database || 'V7-Dev'}
DB_USER=${sqlConfig.user || 'sa'}
DB_PASSWORD=${sqlConfig.password || 'Dev@2024!'}

# API URLs (all local services)
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_DOCUMENTS_SERVICE_URL=http://localhost:3006
NEXT_PUBLIC_PROCESS_SERVICE_URL=http://localhost:5001
NEXT_PUBLIC_INCIDENTS_SERVICE_URL=http://localhost:3014
NEXT_PUBLIC_CHECKLISTS_SERVICE_URL=http://localhost:3005
NEXT_PUBLIC_ASSETS_SERVICE_URL=http://localhost:3007

# Mock Authentication
NEXT_PUBLIC_AUTH_URL=http://localhost:3003
NEXT_PUBLIC_ENABLE_AUTH=false
NEXT_PUBLIC_USE_MOCK_AUTH=true
NEXT_PUBLIC_MOCK_USER_ID=dev-user-001
NEXT_PUBLIC_MOCK_USER_NAME=Developer User
NEXT_PUBLIC_MOCK_USER_ROLE=admin

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_USE_LOCAL_STORAGE=true
NEXT_PUBLIC_ENABLE_DEV_TOOLS=true

# Environment
NODE_ENV=development

# Mock API Keys
ANTHROPIC_API_KEY=mock-claude-key-local
`;

  const frontendResult = createEnvFile('apps/frontend/.env.local', frontendEnv);
  if (frontendResult.created) {
    logSuccess('Created frontend .env.local file');
  } else {
    logInfo('Frontend .env.local file already exists (skipped)');
  }

  // Service .env files
  const services = [
    { name: 'documents-service', port: 3006 },
    { name: 'checklists-service', port: 3005 },
    { name: 'incident-manager', port: 5004 },
    { name: 'assets-service', port: 3007 },
    { name: 'email-service', port: 3008 },
    { name: 'sys-admin-service', port: 3009 }
  ];

  for (const service of services) {
    let serviceEnv = `PORT=${service.port}
DB_USER=${sqlConfig.user || 'sa'}
DB_PASSWORD=${sqlConfig.password || 'Dev@2024!'}
DB_SERVER=${sqlConfig.host || 'localhost'}
DB_DATABASE=${sqlConfig.database || 'V7-Dev'}
DB_ENCRYPT=false
DB_TRUST_CERTIFICATE=true
NODE_ENV=development
LOG_LEVEL=info
`;

    // Add service-specific configurations
    if (service.name === 'documents-service') {
      serviceEnv += `
# Use local file storage instead of Azure Blob
USE_LOCAL_STORAGE=true
LOCAL_STORAGE_PATH=./storage/documents
AZURE_BLOB_SAS_URL=mock-url-not-used
MAX_FILE_SIZE=104857600
ALLOWED_FILE_TYPES=pdf,doc,docx,xls,xlsx,png,jpg,jpeg,txt,csv,zip
`;
    } else if (service.name === 'email-service') {
      serviceEnv += `
# Mock Email Configuration
USE_MOCK_EMAIL=true
MOCK_EMAIL_PATH=./logs/emails
SMTP_HOST=mock-smtp
SMTP_PORT=1025
SMTP_USER=mock-user
SMTP_PASSWORD=mock-password
`;
    }

    const servicePath = `apps/services/${service.name}/.env`;
    const serviceResult = createEnvFile(servicePath, serviceEnv);
    if (serviceResult.created) {
      logSuccess(`Created ${service.name} .env file`);
    } else {
      logInfo(`${service.name} .env file already exists (skipped)`);
    }
  }
}

async function setupSqlServer(useDocker) {
  logSection('SQL Server Setup');
  
  if (useDocker) {
    logInfo('Setting up SQL Server with Docker...');
    
    // Check if container already exists
    const checkResult = execCommand('docker ps -a --filter name=t100-sql-server-dev --format "{{.Names}}"', { silent: true });
    
    if (checkResult.success && checkResult.output.trim() === 't100-sql-server-dev') {
      logInfo('SQL Server container already exists');
      
      // Check if it's running
      const runningResult = execCommand('docker ps --filter name=t100-sql-server-dev --format "{{.Names}}"', { silent: true });
      
      if (runningResult.success && runningResult.output.trim() === 't100-sql-server-dev') {
        logSuccess('SQL Server container is running');
      } else {
        logInfo('Starting SQL Server container...');
        execCommand('docker start t100-sql-server-dev');
        logSuccess('SQL Server container started');
      }
    } else {
      logInfo('Creating SQL Server container...');
      const result = execCommand('docker-compose -f docker-compose.dev.yml up -d');
      if (result.success) {
        logSuccess('SQL Server container created and started');
        logInfo('Waiting for SQL Server to be ready...');
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      } else {
        logError('Failed to create SQL Server container');
        return null;
      }
    }
    
    return {
      host: 'localhost',
      port: 1433,
      user: 'sa',
      password: 'Dev@2024!',
      database: 'V7-Dev'
    };
  } else {
    logInfo('Using local SQL Server instance');
    logInfo('For WSL users: You can connect to SQL Server on Windows using:');
    logInfo('  - Host: localhost or 127.0.0.1 (if SQL Server is on Windows)');
    logInfo('  - Host: host.docker.internal (alternative for WSL2)');
    
    const host = await question('SQL Server host (default: localhost): ') || 'localhost';
    const port = await question('SQL Server port (default: 1433): ') || '1433';
    const database = await question('Database name (default: V7-Dev): ') || 'V7-Dev';
    const user = await question('Username (default: sa): ') || 'sa';
    const password = await question('Password (default: T100@2024!): ') || 'T100@2024!';
    
    // Test connection
    logInfo('Testing SQL Server connection...');
    const testCmd = `sqlcmd -S ${host},${port} -U ${user} -P "${password}" -Q "SELECT 1" 2>&1`;
    const testResult = execCommand(testCmd, { silent: true });
    
    if (testResult.success && !testResult.output.includes('Error')) {
      logSuccess('SQL Server connection successful!');
    } else {
      logWarning('Could not verify SQL Server connection. Please ensure SQL Server is running and accessible.');
    }
    
    return { host, port, user, password, database };
  }
}

function updatePersonalConfig() {
  logSection('Updating Personal Configuration');
  
  const date = new Date().toISOString();
  const user = process.env.USERNAME || process.env.USER || 'Developer';
  
  let content = fs.readFileSync('_your.env.md', 'utf-8');
  
  // Update placeholders
  content = content.replace('[Date will be auto-filled]', date);
  content = content.replace('[Current Windows User]', user);
  content = content.replace('[To be detected]', process.version);
  content = content.replace('[To be detected]', execCommand('npm --version', { silent: true }).output?.trim() || 'Unknown');
  
  // Mark SQL Server as configured
  content = content.replace('[Running/Stopped]', 'Running (Configured)');
  
  fs.writeFileSync('_your.env.md', content);
  logSuccess('Updated _your.env.md with your configuration');
}

async function testConfiguration() {
  logSection('Testing Configuration');
  
  // Test Node/npm setup
  logInfo('Testing Node.js setup...');
  const nodeTest = execCommand('node --version', { silent: true });
  if (nodeTest.success) {
    logSuccess(`Node.js is working: ${nodeTest.output.trim()}`);
  } else {
    logError('Node.js test failed');
    return false;
  }
  
  // Test npm
  const npmTest = execCommand('npm --version', { silent: true });
  if (npmTest.success) {
    logSuccess(`npm is working: ${npmTest.output.trim()}`);
  } else {
    logError('npm test failed');
    return false;
  }
  
  // Test if packages are installed
  logInfo('Checking if packages are installed...');
  if (fs.existsSync('node_modules')) {
    logSuccess('Node modules found');
    
    // Check for Next.js
    if (fs.existsSync('node_modules/next')) {
      const nextVersion = execCommand('npx next --version', { silent: true });
      if (nextVersion.success) {
        logSuccess(`Next.js installed: ${nextVersion.output.trim()}`);
      }
    }
    
    // Check for NX
    if (fs.existsSync('node_modules/@nx/workspace')) {
      logSuccess('NX workspace packages found');
    }
  } else {
    logWarning('Node modules not found - run npm install');
  }
  
  // Test frontend configuration
  logInfo('Testing frontend configuration...');
  const packageJsonPath = path.join('apps', 'frontend', 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    if (packageJson.scripts?.dev === 'node ../../node_modules/next/dist/bin/next dev') {
      logSuccess('Frontend package.json is correctly configured');
    } else {
      logWarning('Frontend package.json may need adjustment');
    }
  }
  
  // Test environment files
  logInfo('Checking environment files...');
  const envFiles = [
    '.env',
    'apps/frontend/.env.local',
    'apps/services/documents-service/.env',
    'apps/services/checklists-service/.env'
  ];
  
  let allEnvFilesExist = true;
  envFiles.forEach(file => {
    if (fs.existsSync(file)) {
      logSuccess(`Found ${file}`);
    } else {
      logWarning(`Missing ${file}`);
      allEnvFilesExist = false;
    }
  });
  
  // Test directories
  logInfo('Checking required directories...');
  const dirs = ['storage/uploads', 'storage/documents', 'logs/emails'];
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      logSuccess(`Found ${dir}`);
    } else {
      logWarning(`Missing ${dir}`);
    }
  });
  
  return true;
}

async function main() {
  console.clear();
  log(colors.bright + colors.cyan);
  log('╔════════════════════════════════════════════════════════════╗');
  log('║                                                            ║');
  log('║          Portal V7 - Local Environment Setup              ║');
  log('║                    Auto-Configuration                      ║');
  log('║                                                            ║');
  log('╚════════════════════════════════════════════════════════════╝');
  log(colors.reset);
  
  logSection('Prerequisites Check');
  
  // Check prerequisites with enhanced version checking
  const nodeCheck = checkNodeVersion();
  const npmCheck = checkNpm();
  const hasGit = checkGit();
  const hasDocker = checkDocker();
  
  if (!nodeCheck.success || !npmCheck.success) {
    logError('Node.js and npm are required. Please install Node.js v22+');
    process.exit(1);
  }
  
  // Check for version compatibility
  if (nodeCheck.major >= 22 && npmCheck.major < 10) {
    logWarning('Node.js v22+ works best with npm v10+. Consider upgrading npm:');
    logInfo('  npm install -g npm@latest');
  }
  
  if (!hasGit) {
    logWarning('Git is not detected but may be installed');
  }
  
  // Display git workflow information
  displayGitWorkflow();
  
  // Check package versions for conflicts
  checkPackageVersions();
  
  // Check NX workspace setup
  checkNxSetup();
  
  // Ask user if they want to proceed
  console.log('');
  const proceed = await question('Do you want to proceed with auto-configuration? (y/n): ');
  if (proceed.toLowerCase() !== 'y') {
    logInfo('Setup cancelled');
    rl.close();
    return;
  }
  
  // Clean up duplicate lock files
  cleanupDuplicateLockFiles();
  
  // Ask about cleaning node_modules
  const cleanModules = await question('Clean existing node_modules? (recommended for fresh setup) (y/n): ');
  if (cleanModules.toLowerCase() === 'y') {
    cleanNodeModules();
  }
  
  // Install dependencies
  const installDeps = await question('Install/update npm dependencies? (y/n): ');
  if (installDeps.toLowerCase() === 'y') {
    if (!installDependencies()) {
      logError('Failed to install dependencies. Please run npm install manually.');
    }
  }
  
  // Fix frontend package.json
  fixFrontendPackageJson();
  
  // Create required directories
  createDirectories();
  
  // Setup SQL Server
  let sqlConfig = null;
  if (hasDocker) {
    const useDocker = await question('Use Docker for SQL Server? (y/n): ');
    sqlConfig = await setupSqlServer(useDocker.toLowerCase() === 'y');
  } else {
    sqlConfig = await setupSqlServer(false);
  }
  
  // Setup environment files
  if (sqlConfig) {
    await setupEnvironmentFiles(hasDocker, sqlConfig);
  }
  
  // Update personal configuration
  updatePersonalConfig();
  
  // Test configuration
  await testConfiguration();
  
  logSection('Setup Complete!');
  
  logSuccess('Your local development environment is configured');
  console.log('');
  
  log('Quick Start Commands:', colors.cyan);
  log('  npm run dev              # Start frontend (Next.js)', colors.yellow);
  log('  npm run build            # Build for production', colors.yellow);
  log('  npm run test             # Run tests', colors.yellow);
  log('  npx nx graph             # View project dependencies', colors.yellow);
  console.log('');
  
  log('Service URLs:', colors.cyan);
  log('  Frontend:    http://localhost:3000', colors.blue);
  log('  Documents:   http://localhost:3006', colors.blue);
  log('  Checklists:  http://localhost:3005', colors.blue);
  log('  Incidents:   http://localhost:5004', colors.blue);
  console.log('');
  
  log('Important Files:', colors.cyan);
  log('  • .env                   - Root environment configuration', colors.blue);
  log('  • apps/frontend/.env.local - Frontend configuration', colors.blue);
  log('  • _your.env.md           - Your personal configuration record', colors.blue);
  log('  • git-repo.md            - Repository workflow guide', colors.blue);
  console.log('');
  
  logInfo('For troubleshooting, see ENV_local.md');
  logInfo('For git workflow, see git-repo.md');
  
  rl.close();
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  logError(`Unexpected error: ${error.message}`);
  process.exit(1);
});

// Run the setup
main().catch(error => {
  logError(`Setup failed: ${error.message}`);
  process.exit(1);
});