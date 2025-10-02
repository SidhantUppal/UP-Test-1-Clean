/**
 * Claude Prompt Generator for Permission System
 *
 * This generates structured prompts that Claude can use to write
 * implementation code based on the permission configurations
 */

interface ApiActions {
  create?: string;
  read?: string;
  update?: string;
  delete?: string;
  custom?: Array<{
    method: string;
    endpoint: string;
    description: string;
  }>;
}

export interface UIElement {
  elementId: string;
  name: string;
  type: 'Button' | 'Link' | 'Table' | 'Form' | 'Dropdown' | 'Modal' | 'Tab' | 'Card' | 'Chart' | 'Menu' | string;
  r0?: boolean;
  displayMode?: 'visible' | 'hidden' | 'disabled';
  permissions: Record<string, boolean>;
  apiActions?: ApiActions;
  notes?: string;
  dropdownConfig?: {
    dataEndpoint: string;
    cacheStrategy: string;
    filterable: boolean;
  };
}

interface ClaudePromptOptions {
  element: UIElement;
  moduleId: string;
  pageId: string;
  naturalLanguageDesc?: string;
  includeTests?: boolean;
  framework?: 'nextjs' | 'react' | 'vue';
}

export function generateClaudePrompt(options: ClaudePromptOptions): string {
  const { element, moduleId, pageId, naturalLanguageDesc, includeTests = true, framework = 'nextjs' } = options;
  
  const prompt = `
## Task: Implement ${element.type} with Permissions

### Context
- Module: ${moduleId}
- Page: ${pageId}
- Element ID: ${element.elementId}
- Element Name: ${element.name}
- Type: ${element.type}

### Business Requirements
${naturalLanguageDesc || element.notes || 'Standard CRUD operations'}

### Permission Configuration
\`\`\`json
${JSON.stringify({
  id: element.elementId,
  name: element.name,
  type: element.type,
  r0: element.r0,
  displayMode: element.displayMode,
  permissions: element.permissions,
  apiActions: element.apiActions
}, null, 2)}
\`\`\`

### API Endpoints
${formatApiEndpoints(element.apiActions)}

### Implementation Requirements

1. Create a ${framework} component that:
   - Uses the Permission${element.type} wrapper with permissionId="${element.elementId}"
   - Implements all configured API calls
   - Handles loading and error states
   - Respects the display mode: ${element.displayMode}
   - ${element.r0 ? 'Shows to all users (R0=true) but may be disabled based on permissions' : 'Only shows to users with permission'}

2. Permission Logic:
${formatPermissionLogic(element.permissions)}

3. API Integration:
${formatApiIntegration(element.apiActions)}

${element.type === 'Dropdown' && element.dropdownConfig ? `
4. Dropdown Data Source:
   - Endpoint: ${element.dropdownConfig.dataEndpoint}
   - Cache: ${element.dropdownConfig.cacheStrategy}
   - Filterable: ${element.dropdownConfig.filterable}
` : ''}

${includeTests ? `
### Test Cases to Include
1. Permission denial handling
2. API error scenarios
3. Loading states
4. ${element.type}-specific interactions
` : ''}

### Code Structure
Please provide:
1. The main component implementation
2. API service functions
3. Type definitions
4. ${includeTests ? 'Basic test cases' : ''}

Use these imports:
\`\`\`typescript
import { Permission${element.type} } from '@/components/permissions';
import { api } from '@/lib/api';
import { usePermissions } from '@/hooks/usePermissions';
\`\`\`
`;

  return prompt.trim();
}

function formatApiEndpoints(apiActions?: ApiActions): string {
  if (!apiActions) return 'No API endpoints configured';
  
  const endpoints = [];
  if (apiActions.create) endpoints.push(`- CREATE: ${apiActions.create}`);
  if (apiActions.read) endpoints.push(`- READ: ${apiActions.read}`);
  if (apiActions.update) endpoints.push(`- UPDATE: ${apiActions.update}`);
  if (apiActions.delete) endpoints.push(`- DELETE: ${apiActions.delete}`);
  
  if (apiActions.custom?.length > 0) {
    endpoints.push('\nCustom Endpoints:');
    apiActions.custom.forEach((custom) => {
      endpoints.push(`- ${custom.method} ${custom.endpoint}: ${custom.description}`);
    });
  }
  
  return endpoints.join('\n') || 'No API endpoints configured';
}

function formatPermissionLogic(permissions: Record<string, boolean>): string {
  const allowed = Object.entries(permissions)
    .filter(([, hasPermission]) => hasPermission)
    .map(([role]) => role);

  const denied = Object.entries(permissions)
    .filter(([, hasPermission]) => !hasPermission)
    .map(([role]) => role);
  
  return `
   - Allowed roles: ${allowed.join(', ') || 'None'}
   - Denied roles: ${denied.join(', ') || 'None'}
   - Implement role-based visibility/functionality`;
}

function formatApiIntegration(apiActions?: ApiActions): string {
  if (!apiActions) return '   - No API integration required';
  
  const integrations = [];
  
  if (apiActions.create) {
    integrations.push(`   - POST request to create new ${apiActions.create.includes('user') ? 'user' : 'resource'}`);
  }
  if (apiActions.read) {
    integrations.push(`   - GET request to fetch data`);
  }
  if (apiActions.update) {
    integrations.push(`   - PUT request to update existing data`);
  }
  if (apiActions.delete) {
    integrations.push(`   - DELETE request with confirmation dialog`);
  }
  
  return integrations.join('\n') || '   - No API integration required';
}

// Generate prompt for entire page
export function generatePagePrompt(
  elements: UIElement[], 
  moduleId: string, 
  pageId: string
): string {
  return `
## Task: Implement Complete Page with Permissions

### Page Information
- Module: ${moduleId}
- Page: ${pageId}
- Total Elements: ${elements.length}

### Elements to Implement

${elements.map((element, index) => `
#### ${index + 1}. ${element.name} (${element.elementId})
- Type: ${element.type}
- Permissions: ${Object.entries(element.permissions).filter(([, v]) => v).map(([k]) => k).join(', ')}
- APIs: ${element.apiActions ? Object.keys(element.apiActions).join(', ') : 'None'}
`).join('\n')}

### Implementation Notes
1. Use Permission wrappers for all elements
2. Implement proper error boundaries
3. Handle loading states consistently
4. Follow the existing code patterns in the codebase

Please implement this page with all the configured permissions and API integrations.
`;
}

// Generate API service file
export function generateApiServicePrompt(
  elements: UIElement[],
  moduleId: string
): string {
  const allEndpoints = new Set<string>();
  
  elements.forEach(element => {
    if (element.apiActions) {
      Object.values(element.apiActions).forEach(endpoint => {
        if (typeof endpoint === 'string') {
          allEndpoints.add(endpoint);
        }
      });
    }
  });
  
  return `
## Task: Create API Service for ${moduleId} Module

### Required Endpoints
${Array.from(allEndpoints).map(endpoint => `- ${endpoint}`).join('\n')}

### Requirements
1. Use consistent error handling
2. Include TypeScript types for all requests/responses
3. Handle authentication tokens
4. Implement retry logic for failed requests
5. Add request/response interceptors for logging

### Service Structure
\`\`\`typescript
// api/${moduleId}.service.ts
export const ${moduleId}Service = {
  // Implement all endpoints here
};
\`\`\`

Please create a complete API service file with all the endpoints, proper types, and error handling.
`;
}