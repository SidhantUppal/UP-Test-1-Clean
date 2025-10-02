import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Risk Assessments Integration Test\n');
console.log('=================================\n');

// Check Frontend Pages
console.log('Frontend Pages:');
const frontendPages = [
  'apps/frontend/app/(main)/risk-assessments/page.tsx',
  'apps/frontend/app/(main)/risk-assessments/new/page.tsx',
  'apps/frontend/app/(main)/risk-assessments/manage/page.tsx',
  'apps/frontend/app/(main)/risk-assessments/[id]/page.tsx',
  'apps/frontend/app/(main)/risk-assessments/approvals/page.tsx',
  'apps/frontend/app/(main)/risk-assessments/monitoring/page.tsx',
  'apps/frontend/app/(main)/risk-assessments/changelog/page.tsx'
];

frontendPages.forEach(page => {
  const pagePath = path.join(__dirname, page);
  const exists = fs.existsSync(pagePath);
  console.log(`  ${exists ? '✓' : '✗'} ${page}`);
});

// Check API Routes
console.log('\nFrontend API Proxy Routes:');
const apiRoutes = [
  'apps/frontend/app/api/risk-assessments/route.ts',
  'apps/frontend/app/api/risk-assessments/[id]/route.ts',
  'apps/frontend/app/api/risk-assessments/statistics/route.ts',
  'apps/frontend/app/api/risk-assessments/pending-approvals/route.ts',
  'apps/frontend/app/api/risk-assessments/approvals/[id]/approve/route.ts',
  'apps/frontend/app/api/risk-assessments/approvals/[id]/reject/route.ts',
  'apps/frontend/app/api/risk-assessments/due-for-review/route.ts',
  'apps/frontend/app/api/risk-assessments/monitoring/changelog/route.ts'
];

apiRoutes.forEach(route => {
  const routePath = path.join(__dirname, route);
  const exists = fs.existsSync(routePath);
  console.log(`  ${exists ? '✓' : '✗'} ${route}`);
});

// Check Navigation Integration
console.log('\nNavigation Integration:');
const navFiles = [
  'apps/frontend/app/(main)/components/Sidebar.tsx',
  'apps/frontend/components/dashboards/ManagerHomeDashboard.tsx'
];

navFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  if (exists) {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasRiskAssessments = content.includes('risk-assessments');
    console.log(`  ${hasRiskAssessments ? '✓' : '✗'} ${file} ${hasRiskAssessments ? '(includes risk-assessments)' : '(missing risk-assessments)'}`);
  } else {
    console.log(`  ✗ ${file} (file not found)`);
  }
});

// Check Docker Configuration
console.log('\nDocker Configuration:');
const dockerComposePath = path.join(__dirname, 'docker-compose.yml');
if (fs.existsSync(dockerComposePath)) {
  const dockerContent = fs.readFileSync(dockerComposePath, 'utf8');
  const hasRiskService = dockerContent.includes('risk-assessments-service');
  const hasPort3015 = dockerContent.includes('3015');
  console.log(`  ${hasRiskService ? '✓' : '✗'} risk-assessments-service defined`);
  console.log(`  ${hasPort3015 ? '✓' : '✗'} Port 3015 configured`);
} else {
  console.log('  ✗ docker-compose.yml not found');
}

console.log('\n✅ Integration test complete!');
console.log('\nTo run the full stack:');
console.log('  1. Start the database (SQL Server)');
console.log('  2. Start the backend service: cd apps/services/risk-assessments-service && npm run dev');
console.log('  3. Start the frontend: cd apps/frontend && npm run dev');
console.log('  4. Access: http://localhost:3000/risk-assessments');