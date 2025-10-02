import { DEMO_EMPLOYEES } from './demoData';

// Breadcrumb configuration for all routes in the T100 system
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  parent?: string;
  dynamic?: boolean;
  getDynamicLabel?: (id: string) => string;
}

export const breadcrumbConfig: Record<string, BreadcrumbItem> = {
  // Root
  '/': { label: 'Home', icon: 'home' },
  '/home': { label: 'Home', icon: 'home' },
  
  // Checklists
  '/checklists': { label: 'Checklists', icon: 'clipboard-check' },
  '/checklists/create': { label: 'Create Checklist', parent: '/checklists' },
  '/checklists/create/basic': { label: 'Basic Checklist', parent: '/checklists/create' },
  '/checklists/create/document': { label: 'Document Checklist', parent: '/checklists/create' },
  '/checklists/my': { label: 'My Checklists', parent: '/checklists' },
  '/checklists/manage': { label: 'Manage Checklists', parent: '/checklists' },
  '/checklists/assign': { label: 'Assign Checklists', parent: '/checklists' },
  '/checklists/reports': { label: 'Reports', parent: '/checklists' },
  '/checklists/dashboard': { label: 'Dashboard', parent: '/checklists' },
  '/checklists/preview/[id]': { 
    label: 'Preview Checklist', 
    parent: '/checklists',
    dynamic: true,
    getDynamicLabel: (id) => `Preview Checklist #${id}`
  },
  '/checklists/complete/[id]': { 
    label: 'Complete Checklist', 
    parent: '/checklists',
    dynamic: true,
    getDynamicLabel: (id) => `Complete Checklist #${id}`
  },
  
  // Contractors
  '/contractors': { label: 'Contractors', icon: 'user-group' },
  '/contractors/manage': { label: 'Manage Contractors', parent: '/contractors' },
  '/contractors/compliance': { label: 'Contractor Compliance', parent: '/contractors' },
  '/contractors/compliance/manage': { label: 'Manage Compliance', parent: '/contractors/compliance' },
  '/contractors/new': { label: 'Add Contractor', parent: '/contractors' },
  '/contractors/permits-to-work': { label: 'Permits to Work', parent: '/contractors' },
  '/contractors/view': { label: 'Contractor View', parent: '/contractors' },
  '/contractors/[id]': { 
    label: 'Contractor Details', 
    parent: '/contractors',
    dynamic: true,
    getDynamicLabel: (id) => `Contractor #${id}`
  },
  
  // Employees
  '/employees': { label: 'Employees', icon: 'user-group' },
  '/employees/my-profile': { label: 'My Profile', parent: '/employees' },
  '/employees/search': { label: 'Search Employees', parent: '/employees' },
  '/employees/org-chart': { label: 'Organisation Chart', parent: '/employees' },
  '/employees/reports': { label: 'Employee Reports', parent: '/employees' },
  '/employees/[id]': { 
    label: 'Employee Details', 
    parent: '/employees',
    dynamic: true,
    getDynamicLabel: (id) => {
      const employee = DEMO_EMPLOYEES.find(emp => emp.id === id);
      return employee ? employee.name : `Employee #${id}`;
    }
  },
  
  // Documents
  '/documents': { label: 'Documents', icon: 'document' },
  '/documents/home': { label: 'All Documents', parent: '/documents' },
  '/documents/assign': { label: 'Assign Documents', parent: '/documents' },
  '/documents/assigned': { label: 'Assigned Documents', parent: '/documents' },
  '/documents/templates': { label: 'Templates', parent: '/documents' },
  '/documents/create-template': { label: 'Create Template', parent: '/documents' },
  '/documents/search': { label: 'Search Documents', parent: '/documents' },
  
  // Permits
  '/permits': { label: 'Permits', icon: 'document-text' },
  '/permits/home': { label: 'Permits Home', parent: '/permits' },
  '/permits/manage-templates': { label: 'Manage Templates', parent: '/permits' },
  '/permits/issue': { label: 'Issue Permit', parent: '/permits' },
  '/permits/pending-approvals': { label: 'Pending Approvals', parent: '/permits' },
  '/permits/lotos': { label: 'LOTO\'s', parent: '/permits' },
  
  // Risk Assessments
  '/risk-assessments': { label: 'Risk Assessments', icon: 'clipboard-check' },
  '/risk-assessments/dashboard': { label: 'Dashboard', parent: '/risk-assessments' },
  '/risk-assessments/new': { label: 'New Assessment', parent: '/risk-assessments' },
  '/risk-assessments/create': { label: 'Create Assessment', parent: '/risk-assessments' },
  '/risk-assessments/create/basic': { label: 'Create Basic Assessment', parent: '/risk-assessments' },
  '/risk-assessments/create/standard': { label: 'Create Standard Assessment', parent: '/risk-assessments' },
  '/risk-assessments/manage': { label: 'Manage Assessments', parent: '/risk-assessments' },
  '/risk-assessments/approvals': { label: 'Manage Approvals', parent: '/risk-assessments' },
  '/risk-assessments/monitoring': { label: 'Monitoring History', parent: '/risk-assessments' },
  '/risk-assessments/changelog': { label: 'Change Log', parent: '/risk-assessments' },

  // Incidents
  '/incidents': { label: 'Incidents', icon: 'exclamation-triangle' },
  '/incidents/riddor': { label: 'RIDDOR', parent: '/incidents' },
  '/incidents/riddor/new': { label: 'New Report', parent: '/incidents/riddor' },
  '/incidents/dashboard': { label: 'Dashboard', parent: '/incidents' },
  '/incidents/form': { label: 'New Incident', parent: '/incidents' },
  '/incidents/manage': { label: 'Manage Incidents', parent: '/incidents' },
  '/incidents/hazards': { label: 'Hazards', parent: '/incidents' },
  '/incidents/reports': { label: 'Reports', parent: '/incidents' },

  // Tasks
  '/tasks': { label: 'Tasks', icon: 'clipboard-check' },
  '/tasks/my': { label: 'My Tasks', parent: '/tasks' },
  '/tasks/create': { label: 'Create Task', parent: '/tasks' },
  
  // Processes
  '/processes': { label: 'Processes', icon: 'cog' },
  '/process-home': { label: 'Process Home', icon: 'cog' },
  '/build-process': { label: 'Build Process', icon: 'cog' },
  '/processes/list': { label: 'Process List', parent: '/processes' },
  '/processes/my': { label: 'My Processes', parent: '/processes' },
  '/processes/templates': { label: 'Process Templates', parent: '/processes' },
  '/processes/reports': { label: 'Process Reports', parent: '/processes' },
  '/processes/view/[id]': { 
    label: 'Process Details', 
    parent: '/processes',
    dynamic: true,
    getDynamicLabel: (id) => `Process #${id}`
  },
  
  // Alerts
  '/alerts': { label: 'Alerts', icon: 'bell' },
  
  // Admin
  '/admin': { label: 'Admin', icon: 'cog' },
  '/admin/dashboard': { label: 'Dashboard', parent: '/admin' },
  '/admin/permissions': { label: 'Tenant Management', parent: '/admin' },
  '/admin/users': { label: 'Admin Users', parent: '/admin' },
  '/admin/trials': { label: 'Trial Management', parent: '/admin' },
  '/admin/partners': { label: 'Partner Portal', parent: '/admin' },
  '/admin/monitoring': { label: 'System Monitoring', parent: '/admin' },
  '/admin/billing': { label: 'Billing & Revenue', parent: '/admin' },
  '/admin/support': { label: 'Support System', parent: '/admin' },
  '/admin/analytics': { label: 'LORIS Analytics', parent: '/admin' },
  '/admin/config': { label: 'Configuration', parent: '/admin' },
  '/admin/audit': { label: 'Audit & Security', parent: '/admin' },
  '/admin/reports': { label: 'Reports', parent: '/admin' },
  
  // Utility/Demo Pages
  '/permissions': { label: 'Permissions' },
  '/theme-demo': { label: 'Theme Demo' },
  '/logger-demo': { label: 'Logger Demo' },
  '/react-flow-test': { label: 'React Flow Test' },
  '/loci1': { label: 'LOCI 1' },
  '/loci2': { label: 'LOCI 2' },
  '/dock-pack': { label: 'Dock Pack' }
};

// Helper function to get icon SVG
export const getIconSvg = (iconName: string) => {
  const icons: Record<string, string> = {
    home: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>`,
    'user-group': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>`,
    'clipboard-check': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>`,
    document: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>`,
    'document-text': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>`,
    cog: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>`,
    bell: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>`,
    'exclamation-triangle': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>`
  };
  
  return icons[iconName] || icons.home;
};

// Helper function to build breadcrumb trail
export const buildBreadcrumbTrail = (pathname: string): BreadcrumbItem[] => {
  const trail: BreadcrumbItem[] = [];

  // Only start with home if we're not already on a home page
  if (pathname !== '/home') {
    trail.push({
      label: 'Home',
      href: '/',
      icon: 'home'
    });
  }
  
  // Handle dynamic routes - replace the last segment if it looks like an ID
  let normalizedPath = pathname;
  const segments = pathname.split('/');
  const lastSegment = segments[segments.length - 1];
  
  // If the last segment looks like an ID (number or UUID-like), replace it with [id]
  if (lastSegment && (lastSegment.match(/^\d+$/) || lastSegment.match(/^[a-f0-9-]+$/))) {
    segments[segments.length - 1] = '[id]';
    normalizedPath = segments.join('/');
  }
  
  // Get the current route config
  const currentConfig = breadcrumbConfig[normalizedPath] || breadcrumbConfig[pathname];
  
  if (!currentConfig) {
    // If no config found, try to build a trail from the path segments
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      // Try to find parent paths
      let currentPath = '';
      for (const segment of segments) {
        currentPath += '/' + segment;
        if (breadcrumbConfig[currentPath]) {
          const config = breadcrumbConfig[currentPath];
          trail.push({
            label: config.label,
            href: currentPath,
            icon: config.icon
          });
        }
      }
    }
    return trail;
  }
  
  // Build the trail by following parent relationships
  const buildTrail = (path: string, visited: Set<string> = new Set()) => {
    if (visited.has(path)) return; // Prevent infinite loops
    visited.add(path);
    
    const config = breadcrumbConfig[path];
    if (!config) {
      return;
    }
    
    // If this has a parent, add the parent first
    if (config.parent) {
      buildTrail(config.parent, visited);
    }
    
    // Add this item to the trail
    let label = config.label;
    let href = path;
    
    // Handle dynamic routes
    if (config.dynamic && config.getDynamicLabel) {
      const id = pathname.split('/').pop();
      if (id) {
        label = config.getDynamicLabel(id);
        href = pathname;
      }
    }
    
    // Don't add home again if it's already in the trail
    if (href === '/' && trail.some(item => item.href === '/')) {
      return;
    }
    
    trail.push({
      label,
      href,
      icon: config.icon
    });
  };
  
  buildTrail(normalizedPath);
  
  return trail;
};