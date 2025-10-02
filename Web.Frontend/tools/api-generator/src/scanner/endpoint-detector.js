import * as parser from '@babel/parser';
import traverse from '@babel/traverse';

export function detectEndpoints(code, filePath) {
  const endpoints = [];
  
  try {
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });

    traverse.default(ast, {
      CallExpression(path) {
        const node = path.node;
        
        // Detect Express router methods: router.get, router.post, etc.
        if (node.callee.type === 'MemberExpression') {
          const object = node.callee.object;
          const property = node.callee.property;
          
          if (object.name === 'router' || object.name === 'app') {
            const httpMethods = ['get', 'post', 'put', 'patch', 'delete', 'all', 'use'];
            
            if (httpMethods.includes(property.name)) {
              const endpoint = extractEndpointInfo(node, property.name);
              if (endpoint) {
                endpoints.push(endpoint);
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error(`Error parsing ${filePath}: ${error.message}`);
  }

  return endpoints;
}

function extractEndpointInfo(node, method) {
  if (node.arguments.length === 0) return null;

  const firstArg = node.arguments[0];
  
  // Extract the path
  let path = null;
  if (firstArg.type === 'StringLiteral') {
    path = firstArg.value;
  } else if (firstArg.type === 'TemplateLiteral' && firstArg.quasis.length === 1) {
    path = firstArg.quasis[0].value.raw;
  }

  if (!path) return null;

  // Try to extract handler function name
  let handler = 'anonymous';
  const lastArg = node.arguments[node.arguments.length - 1];
  
  if (lastArg.type === 'Identifier') {
    handler = lastArg.name;
  } else if (lastArg.type === 'ArrowFunctionExpression' || lastArg.type === 'FunctionExpression') {
    handler = 'inline-function';
    
    // Try to detect what the handler does
    const handlerInfo = analyzeHandler(lastArg);
    if (handlerInfo) {
      handler = handlerInfo;
    }
  }

  return {
    method: method.toUpperCase(),
    path: path,
    handler: handler,
    line: node.loc ? node.loc.start.line : null
  };
}

function analyzeHandler(functionNode) {
  // Simple analysis to detect CRUD operations
  const bodyString = generateBodyString(functionNode.body);
  
  if (bodyString.includes('findAll') || bodyString.includes('SELECT')) {
    return 'list';
  } else if (bodyString.includes('findOne') || bodyString.includes('findById')) {
    return 'getById';
  } else if (bodyString.includes('create') || bodyString.includes('INSERT')) {
    return 'create';
  } else if (bodyString.includes('update') || bodyString.includes('UPDATE')) {
    return 'update';
  } else if (bodyString.includes('delete') || bodyString.includes('DELETE')) {
    return 'delete';
  }
  
  return 'custom';
}

function generateBodyString(node) {
  // Simple string representation of function body for pattern matching
  // This is a simplified approach - could be enhanced with deeper AST analysis
  try {
    return JSON.stringify(node);
  } catch {
    return '';
  }
}

export function detectCRUDPatterns(endpoints) {
  const patterns = {
    hasListEndpoint: false,
    hasGetByIdEndpoint: false,
    hasCreateEndpoint: false,
    hasUpdateEndpoint: false,
    hasDeleteEndpoint: false,
    resourceName: null
  };

  for (const endpoint of endpoints) {
    const { method, path } = endpoint;
    
    // Detect resource name from path
    const resourceMatch = path.match(/^\/(?:api\/)?([\w-]+)/);
    if (resourceMatch && !patterns.resourceName) {
      patterns.resourceName = resourceMatch[1];
    }

    // Detect CRUD patterns
    if (method === 'GET' && !path.includes(':')) {
      patterns.hasListEndpoint = true;
    } else if (method === 'GET' && path.includes(':id')) {
      patterns.hasGetByIdEndpoint = true;
    } else if (method === 'POST' && !path.includes(':')) {
      patterns.hasCreateEndpoint = true;
    } else if ((method === 'PUT' || method === 'PATCH') && path.includes(':id')) {
      patterns.hasUpdateEndpoint = true;
    } else if (method === 'DELETE' && path.includes(':id')) {
      patterns.hasDeleteEndpoint = true;
    }
  }

  patterns.isCompleteCRUD = 
    patterns.hasListEndpoint &&
    patterns.hasGetByIdEndpoint &&
    patterns.hasCreateEndpoint &&
    patterns.hasUpdateEndpoint &&
    patterns.hasDeleteEndpoint;

  return patterns;
}