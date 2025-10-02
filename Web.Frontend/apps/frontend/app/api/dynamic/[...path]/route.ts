import { NextRequest, NextResponse } from 'next/server';

// In-memory data store for testing
const dataStore: Record<string, any[]> = {};

// Get API definitions from localStorage (passed via headers in dev)
function getApiDefinition(apiId: string): any {
  // In production, this would read from a database
  // For now, we'll get it from the request headers
  return null;
}

// Generate ID based on entity type
function generateId(entityType: string, existingData: any[]): number {
  return existingData.length > 0 
    ? Math.max(...existingData.map(item => item.id || 0)) + 1 
    : 1;
}

// Apply filters to data
function applyFilters(data: any[], queryParams: URLSearchParams): any[] {
  let filtered = [...data];
  
  // Pagination
  const page = parseInt(queryParams.get('page') || '1');
  const limit = parseInt(queryParams.get('limit') || '10');
  const offset = (page - 1) * limit;
  
  // Search
  const search = queryParams.get('q') || queryParams.get('search');
  if (search) {
    filtered = filtered.filter(item => 
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Generic filters
  queryParams.forEach((value, key) => {
    if (!['page', 'limit', 'q', 'search', 'sort', 'order'].includes(key)) {
      filtered = filtered.filter(item => {
        if (value === 'true' || value === 'false') {
          return item[key] === (value === 'true');
        }
        return item[key]?.toString().toLowerCase().includes(value.toLowerCase());
      });
    }
  });
  
  // Sorting
  const sort = queryParams.get('sort');
  const order = queryParams.get('order') || 'asc';
  if (sort) {
    filtered.sort((a, b) => {
      const aVal = a[sort];
      const bVal = b[sort];
      const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return order === 'desc' ? -comparison : comparison;
    });
  }
  
  const total = filtered.length;
  const paginatedData = filtered.slice(offset, offset + limit);
  
  return paginatedData;
}

// Handle all HTTP methods
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest('GET', request, resolvedParams.path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest('POST', request, resolvedParams.path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest('PUT', request, resolvedParams.path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest('DELETE', request, resolvedParams.path);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest('PATCH', request, resolvedParams.path);
}

async function handleRequest(
  method: string,
  request: NextRequest,
  pathSegments: string[]
) {
  try {
    const path = pathSegments.join('/');
    const apiId = request.headers.get('x-api-id');
    const apiDefinition = request.headers.get('x-api-definition');
    
    if (!apiDefinition) {
      return NextResponse.json(
        { error: 'API definition not found' },
        { status: 404 }
      );
    }
    
    const definition = JSON.parse(apiDefinition);
    const entityType = definition.entity || 'item';
    const entityTypePlural = definition.entityPlural || entityType + 's';
    
    // Initialize data store if needed
    if (!dataStore[entityTypePlural]) {
      dataStore[entityTypePlural] = [];
    }
    
    // Parse the path to determine the operation
    const isCollection = path === `api/dynamic/${entityTypePlural}`;
    const idMatch = path.match(new RegExp(`^api/dynamic/${entityTypePlural}/(\\d+)$`));
    const isSpecialRoute = path.includes('/') && !idMatch;
    
    // Collection operations
    if (isCollection) {
      if (method === 'GET') {
        // List with pagination
        const queryParams = request.nextUrl.searchParams;
        const page = parseInt(queryParams.get('page') || '1');
        const limit = parseInt(queryParams.get('limit') || '10');
        
        const filtered = applyFilters(dataStore[entityTypePlural], queryParams);
        
        return NextResponse.json({
          data: filtered,
          pagination: {
            page,
            limit,
            total: dataStore[entityTypePlural].length,
            totalPages: Math.ceil(dataStore[entityTypePlural].length / limit)
          }
        });
      }
      
      if (method === 'POST') {
        // Create new item
        const body = await request.json();
        
        // Handle bulk creation
        if (body.bulk && Array.isArray(body.items)) {
          const created = body.items.map((item: any) => ({
            id: generateId(entityType, dataStore[entityTypePlural]),
            ...item,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));
          dataStore[entityTypePlural].push(...created);
          
          return NextResponse.json({
            message: `Created ${created.length} ${entityTypePlural}`,
            data: created
          }, { status: 201 });
        }
        
        // Single item creation
        const newItem = {
          id: generateId(entityType, dataStore[entityTypePlural]),
          ...body,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        dataStore[entityTypePlural].push(newItem);
        
        return NextResponse.json(newItem, { status: 201 });
      }
    }
    
    // Individual item operations
    if (idMatch) {
      const id = parseInt(idMatch[1]);
      const item = dataStore[entityTypePlural].find((i: any) => i.id === id);
      
      if (!item) {
        return NextResponse.json(
          { error: 'Not Found', message: `${entityType} with id ${id} not found` },
          { status: 404 }
        );
      }
      
      if (method === 'GET') {
        return NextResponse.json(item);
      }
      
      if (method === 'PUT' || method === 'PATCH') {
        const body = await request.json();
        Object.assign(item, body, { updatedAt: new Date().toISOString() });
        return NextResponse.json(item);
      }
      
      if (method === 'DELETE') {
        const index = dataStore[entityTypePlural].indexOf(item);
        dataStore[entityTypePlural].splice(index, 1);
        return NextResponse.json({
          message: `${entityType} deleted successfully`,
          id
        });
      }
    }
    
    // Special routes (like /search, /bulk-update, etc.)
    if (isSpecialRoute) {
      const specialRoute = path.split('/').pop();
      
      if (specialRoute === 'search' && method === 'GET') {
        const queryParams = request.nextUrl.searchParams;
        const filtered = applyFilters(dataStore[entityTypePlural], queryParams);
        
        return NextResponse.json({
          results: filtered,
          total: filtered.length
        });
      }
      
      if (specialRoute === 'bulk-delete' && method === 'POST') {
        const body = await request.json();
        const ids = body.ids || [];
        
        const deleted = dataStore[entityTypePlural].filter((item: any) => 
          ids.includes(item.id)
        );
        
        dataStore[entityTypePlural] = dataStore[entityTypePlural].filter((item: any) => 
          !ids.includes(item.id)
        );
        
        return NextResponse.json({
          message: `Deleted ${deleted.length} ${entityTypePlural}`,
          deletedIds: ids
        });
      }
      
      if (specialRoute === 'reset' && method === 'POST') {
        dataStore[entityTypePlural] = [];
        return NextResponse.json({
          message: `All ${entityTypePlural} have been reset`
        });
      }
    }
    
    // Default 404 for unmatched routes
    return NextResponse.json(
      { 
        error: 'Not Found', 
        message: `Endpoint ${method} /${path} not found`
      },
      { status: 404 }
    );
    
  } catch (error) {
    console.error('Dynamic API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// Data store getter for debugging (not exported as route handler)
function getDataStore() {
  return dataStore;
}