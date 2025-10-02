#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting T100 Development Environment...\n');

// Define services to start
const services = [
  {
    name: 'Checklists Service',
    path: path.join(__dirname, '../../services/checklists-service'),
    command: 'npm',
    args: ['run', 'dev'],
    color: '\x1b[36m', // Cyan
    port: 3004
  },
  {
    name: 'Documents Service',
    path: path.join(__dirname, '../../services/documents-service'),
    command: 'npm',
    args: ['run', 'dev'],
    color: '\x1b[35m', // Magenta
    port: 3006
  }
];

// Start Next.js with a delay
const nextService = {
  name: 'Next.js Frontend',
  path: path.join(__dirname, '..'),
  command: 'npm',
  args: ['run', 'dev'],
  color: '\x1b[32m', // Green
  port: 3000,
  delay: 3000 // Wait 3 seconds for services to start
};

// Function to start a service
function startService(service) {
  console.log(`${service.color}[${service.name}] Starting on port ${service.port}...\x1b[0m`);
  
  const proc = spawn(service.command, service.args, {
    cwd: service.path,
    env: { ...process.env, FORCE_COLOR: '1' },
    shell: true
  });

  proc.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim());
    lines.forEach(line => {
      console.log(`${service.color}[${service.name}]\x1b[0m ${line}`);
    });
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim());
    lines.forEach(line => {
      console.error(`${service.color}[${service.name} ERROR]\x1b[0m ${line}`);
    });
  });

  proc.on('close', (code) => {
    console.log(`${service.color}[${service.name}] Process exited with code ${code}\x1b[0m`);
  });

  return proc;
}

// Start all services
const processes = [];

// Start backend services first
services.forEach(service => {
  processes.push(startService(service));
});

// Start Next.js after a delay
setTimeout(() => {
  processes.push(startService(nextService));
}, nextService.delay);

// Handle shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down all services...\n');
  processes.forEach(proc => {
    if (proc && !proc.killed) {
      proc.kill('SIGTERM');
    }
  });
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});

process.on('SIGTERM', () => {
  processes.forEach(proc => {
    if (proc && !proc.killed) {
      proc.kill('SIGTERM');
    }
  });
  process.exit(0);
});

console.log('\n📝 Services starting up...');
console.log('   - Checklists Service: http://localhost:3004');
console.log('   - Documents Service: http://localhost:3006');
console.log('   - Frontend (Next.js): http://localhost:3000\n');
console.log('Press Ctrl+C to stop all services\n');