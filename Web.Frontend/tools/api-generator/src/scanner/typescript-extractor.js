import fs from 'fs/promises';
import { parse } from '@typescript-eslint/typescript-estree';

export async function extractTypeScript(filePath) {
  const types = [];
  
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    const ast = parse(content, {
      loc: true,
      range: true,
      comment: true
    });

    // Extract interfaces and types
    for (const node of ast.body) {
      if (node.type === 'TSInterfaceDeclaration') {
        types.push(extractInterface(node));
      } else if (node.type === 'TSTypeAliasDeclaration') {
        types.push(extractTypeAlias(node));
      } else if (node.type === 'ExportNamedDeclaration' && node.declaration) {
        if (node.declaration.type === 'TSInterfaceDeclaration') {
          types.push(extractInterface(node.declaration));
        } else if (node.declaration.type === 'TSTypeAliasDeclaration') {
          types.push(extractTypeAlias(node.declaration));
        }
      }
    }
  } catch (error) {
    console.error(`Error extracting TypeScript from ${filePath}: ${error.message}`);
  }

  return types;
}

function extractInterface(node) {
  const fields = [];
  
  for (const member of node.body.body) {
    if (member.type === 'TSPropertySignature') {
      fields.push({
        name: member.key.name,
        type: extractTypeAnnotation(member.typeAnnotation),
        optional: member.optional || false
      });
    }
  }

  return {
    kind: 'interface',
    name: node.id.name,
    fields: fields
  };
}

function extractTypeAlias(node) {
  return {
    kind: 'type',
    name: node.id.name,
    definition: extractTypeAnnotation({ typeAnnotation: node.typeAnnotation })
  };
}

function extractTypeAnnotation(annotation) {
  if (!annotation || !annotation.typeAnnotation) {
    return 'unknown';
  }

  const type = annotation.typeAnnotation;

  switch (type.type) {
    case 'TSStringKeyword':
      return 'string';
    case 'TSNumberKeyword':
      return 'number';
    case 'TSBooleanKeyword':
      return 'boolean';
    case 'TSAnyKeyword':
      return 'any';
    case 'TSUnknownKeyword':
      return 'unknown';
    case 'TSNullKeyword':
      return 'null';
    case 'TSUndefinedKeyword':
      return 'undefined';
    case 'TSVoidKeyword':
      return 'void';
    case 'TSArrayType':
      return `${extractTypeAnnotation({ typeAnnotation: type.elementType })}[]`;
    case 'TSTypeReference':
      return type.typeName.name || 'unknown';
    case 'TSUnionType':
      return type.types.map(t => extractTypeAnnotation({ typeAnnotation: t })).join(' | ');
    case 'TSLiteralType':
      if (type.literal.type === 'Literal') {
        return JSON.stringify(type.literal.value);
      }
      return 'literal';
    default:
      return 'complex';
  }
}

export function convertTypeToSQL(tsType) {
  // Map TypeScript types to SQL Server types
  const typeMap = {
    'string': 'NVARCHAR(255)',
    'number': 'INT',
    'boolean': 'BIT',
    'Date': 'DATETIMEOFFSET',
    'string[]': 'NVARCHAR(MAX)', // JSON array
    'number[]': 'NVARCHAR(MAX)', // JSON array
    'any': 'NVARCHAR(MAX)',
    'unknown': 'NVARCHAR(MAX)'
  };

  // Check for specific patterns
  if (tsType.includes('|')) {
    // Union type - use NVARCHAR
    return 'NVARCHAR(255)';
  }

  if (tsType.endsWith('[]')) {
    // Array type - use JSON
    return 'NVARCHAR(MAX)';
  }

  return typeMap[tsType] || 'NVARCHAR(255)';
}

export function inferModelFromInterface(interfaceData) {
  const model = {
    name: interfaceData.name,
    tableName: `V7.${interfaceData.name}`,
    fields: []
  };

  for (const field of interfaceData.fields) {
    // Skip ID fields (will be auto-generated)
    if (field.name.toLowerCase().endsWith('id') && field.name.toLowerCase() !== 'userid') {
      continue;
    }

    model.fields.push({
      name: field.name,
      type: convertTypeToSQL(field.type),
      required: !field.optional,
      tsType: field.type
    });
  }

  return model;
}