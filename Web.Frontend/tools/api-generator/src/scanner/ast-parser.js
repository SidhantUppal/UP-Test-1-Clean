import * as parser from '@babel/parser';
import traverse from '@babel/traverse';

export function parseJavaScript(code) {
  try {
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
        'decorators-legacy',
        'dynamicImport',
        'classProperties',
        'asyncGenerators',
        'objectRestSpread'
      ]
    });

    return ast;
  } catch (error) {
    console.error('Failed to parse JavaScript:', error.message);
    return null;
  }
}

export function extractImports(ast) {
  const imports = [];

  traverse.default(ast, {
    ImportDeclaration(path) {
      imports.push({
        source: path.node.source.value,
        specifiers: path.node.specifiers.map(spec => ({
          type: spec.type,
          name: spec.local.name
        }))
      });
    }
  });

  return imports;
}

export function extractExports(ast) {
  const exports = [];

  traverse.default(ast, {
    ExportNamedDeclaration(path) {
      if (path.node.declaration) {
        exports.push({
          type: 'named',
          declaration: path.node.declaration.type
        });
      }
    },
    ExportDefaultDeclaration(path) {
      exports.push({
        type: 'default',
        declaration: path.node.declaration.type
      });
    }
  });

  return exports;
}

export function extractFunctions(ast) {
  const functions = [];

  traverse.default(ast, {
    FunctionDeclaration(path) {
      functions.push({
        name: path.node.id ? path.node.id.name : 'anonymous',
        params: path.node.params.map(p => p.name || 'param'),
        async: path.node.async
      });
    },
    ArrowFunctionExpression(path) {
      if (path.parent.type === 'VariableDeclarator') {
        functions.push({
          name: path.parent.id.name,
          params: path.node.params.map(p => p.name || 'param'),
          async: path.node.async,
          arrow: true
        });
      }
    }
  });

  return functions;
}

export function extractClasses(ast) {
  const classes = [];

  traverse.default(ast, {
    ClassDeclaration(path) {
      const methods = [];
      
      for (const item of path.node.body.body) {
        if (item.type === 'ClassMethod') {
          methods.push({
            name: item.key.name,
            kind: item.kind,
            static: item.static,
            async: item.async
          });
        }
      }

      classes.push({
        name: path.node.id ? path.node.id.name : 'anonymous',
        methods: methods
      });
    }
  });

  return classes;
}

export function extractDatabaseQueries(ast) {
  const queries = [];

  traverse.default(ast, {
    TemplateLiteral(path) {
      const raw = path.node.quasis.map(q => q.value.raw).join('');
      
      // Check if it looks like SQL
      if (raw.match(/\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/i)) {
        // Extract table names
        const tableMatches = raw.matchAll(/\[V7\]\.\[(\w+)\]/g);
        const tables = Array.from(tableMatches).map(m => m[1]);
        
        queries.push({
          type: detectQueryType(raw),
          tables: tables,
          raw: raw.substring(0, 100) // First 100 chars for reference
        });
      }
    },
    StringLiteral(path) {
      const value = path.node.value;
      
      // Check if it looks like SQL
      if (value.match(/\b(SELECT|INSERT|UPDATE|DELETE)\b/i)) {
        const tableMatches = value.matchAll(/\[V7\]\.\[(\w+)\]/g);
        const tables = Array.from(tableMatches).map(m => m[1]);
        
        queries.push({
          type: detectQueryType(value),
          tables: tables,
          raw: value.substring(0, 100)
        });
      }
    }
  });

  return queries;
}

function detectQueryType(sql) {
  const upper = sql.toUpperCase();
  
  if (upper.includes('SELECT')) return 'SELECT';
  if (upper.includes('INSERT')) return 'INSERT';
  if (upper.includes('UPDATE')) return 'UPDATE';
  if (upper.includes('DELETE')) return 'DELETE';
  if (upper.includes('CREATE')) return 'CREATE';
  if (upper.includes('ALTER')) return 'ALTER';
  if (upper.includes('DROP')) return 'DROP';
  
  return 'UNKNOWN';
}