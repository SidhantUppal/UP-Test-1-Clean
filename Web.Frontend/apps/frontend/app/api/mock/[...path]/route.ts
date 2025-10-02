import { NextRequest, NextResponse } from 'next/server';

// Mock data store
const mockData: Record<string, any> = {
  userareas: [
    {
      id: 1,
      name: 'Acme Corporation',
      domain: 'acme.example.com',
      active: true,
      createdAt: '2024-01-15T10:30:00Z',
      settings: {
        theme: 'blue',
        features: ['safety', 'training']
      }
    },
    {
      id: 2,
      name: 'TechCo Ltd',
      domain: 'techco.example.com',
      active: true,
      createdAt: '2024-02-20T14:45:00Z',
      settings: {
        theme: 'green',
        features: ['safety', 'permits', 'contractors']
      }
    }
  ]
};

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
  const path = pathSegments.join('/');
  
  // Simulate delay if requested
  const delay = request.nextUrl.searchParams.get('delay');
  if (delay) {
    await new Promise(resolve => setTimeout(resolve, parseInt(delay)));
  }
  
  // UserArea endpoints
  if (path === 'api/userareas') {
    if (method === 'GET') {
      const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
      const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');
      const active = request.nextUrl.searchParams.get('active');
      
      let filtered = mockData.userareas;
      if (active !== null) {
        filtered = filtered.filter(ua => ua.active === (active === 'true'));
      }
      
      return NextResponse.json({
        data: filtered.slice((page - 1) * limit, page * limit),
        pagination: {
          page,
          limit,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / limit)
        }
      });
    }
    
    if (method === 'POST') {
      const body = await request.json();
      const newUserArea = {
        id: mockData.userareas.length + 1,
        ...body,
        active: true,
        createdAt: new Date().toISOString()
      };
      mockData.userareas.push(newUserArea);
      
      return NextResponse.json(newUserArea, { status: 201 });
    }
  }
  
  // UserArea by ID
  const userAreaMatch = path.match(/^api\/userareas\/(\d+)$/);
  if (userAreaMatch) {
    const id = parseInt(userAreaMatch[1]);
    const userArea = mockData.userareas.find(ua => ua.id === id);
    
    if (!userArea) {
      return NextResponse.json(
        { error: 'Not Found', message: `UserArea with id ${id} not found` },
        { status: 404 }
      );
    }
    
    if (method === 'GET') {
      return NextResponse.json({
        ...userArea,
        stats: {
          totalUsers: 45,
          activeUsers: 38,
          lastActivity: new Date().toISOString()
        }
      });
    }
    
    if (method === 'PUT' || method === 'PATCH') {
      const body = await request.json();
      Object.assign(userArea, body);
      return NextResponse.json(userArea);
    }
    
    if (method === 'DELETE') {
      userArea.active = false;
      return NextResponse.json({
        message: 'UserArea deactivated successfully',
        id
      });
    }
  }
  
  // Default response for unmatched routes
  return NextResponse.json(
    { 
      error: 'Not Found', 
      message: `Endpoint ${method} /${path} not found`,
      availableEndpoints: [
        'GET /api/userareas',
        'POST /api/userareas',
        'GET /api/userareas/:id',
        'PUT /api/userareas/:id',
        'DELETE /api/userareas/:id'
      ]
    },
    { status: 404 }
  );
}