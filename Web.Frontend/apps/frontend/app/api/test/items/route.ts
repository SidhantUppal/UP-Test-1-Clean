import { NextRequest, NextResponse } from 'next/server';

// In-memory database for testing
let items: any[] = [
  { id: 1, name: 'Test Item 1', status: 'active', category: 'electronics', price: 99.99, createdAt: new Date('2024-01-01') },
  { id: 2, name: 'Test Item 2', status: 'inactive', category: 'books', price: 19.99, createdAt: new Date('2024-01-02') },
  { id: 3, name: 'Test Item 3', status: 'active', category: 'electronics', price: 299.99, createdAt: new Date('2024-01-03') },
];

let nextId = 4;

// GET /api/test/items - List all items with filtering, pagination, sorting
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Simulate delay if requested
    const delay = searchParams.get('delay');
    if (delay) {
      await new Promise(resolve => setTimeout(resolve, parseInt(delay)));
    }
    
    // Simulate error if requested
    const simulateError = searchParams.get('error');
    if (simulateError === '500') {
      return NextResponse.json(
        { error: 'Internal Server Error', message: 'Simulated server error for testing' },
        { status: 500 }
      );
    }
    
    // Filter items
    let filteredItems = [...items];
    
    // Search filter
    const search = searchParams.get('search');
    if (search) {
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Status filter
    const status = searchParams.get('status');
    if (status) {
      filteredItems = filteredItems.filter(item => item.status === status);
    }
    
    // Category filter
    const category = searchParams.get('category');
    if (category) {
      filteredItems = filteredItems.filter(item => item.category === category);
    }
    
    // Sorting
    const sortBy = searchParams.get('sortBy') || 'id';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    
    filteredItems.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      } else if (sortBy === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        comparison = a.id - b.id;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;
    
    const paginatedItems = filteredItems.slice(offset, offset + limit);
    
    // Response with metadata
    return NextResponse.json({
      data: paginatedItems,
      metadata: {
        total: filteredItems.length,
        page,
        limit,
        totalPages: Math.ceil(filteredItems.length / limit),
        hasNext: offset + limit < filteredItems.length,
        hasPrev: page > 1
      }
    }, {
      headers: {
        'X-Total-Count': filteredItems.length.toString(),
        'X-Page': page.toString(),
        'X-Limit': limit.toString()
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch items', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/test/items - Create new item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.name) {
      return NextResponse.json(
        { 
          error: 'Validation Error', 
          message: 'Name is required',
          fields: { name: 'This field is required' }
        },
        { status: 400 }
      );
    }
    
    if (body.price && (typeof body.price !== 'number' || body.price < 0)) {
      return NextResponse.json(
        { 
          error: 'Validation Error', 
          message: 'Price must be a positive number',
          fields: { price: 'Must be a positive number' }
        },
        { status: 400 }
      );
    }
    
    // Create new item
    const newItem = {
      id: nextId++,
      name: body.name,
      status: body.status || 'active',
      category: body.category || 'general',
      price: body.price || 0,
      description: body.description || '',
      tags: body.tags || [],
      metadata: body.metadata || {},
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    items.push(newItem);
    
    return NextResponse.json(newItem, { 
      status: 201,
      headers: {
        'Location': `/api/test/items/${newItem.id}`
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create item', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE /api/test/items - Bulk delete
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids } = body;
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Validation Error', message: 'ids array is required' },
        { status: 400 }
      );
    }
    
    const deletedIds: number[] = [];
    const notFoundIds: number[] = [];
    
    ids.forEach(id => {
      const index = items.findIndex(item => item.id === id);
      if (index !== -1) {
        items.splice(index, 1);
        deletedIds.push(id);
      } else {
        notFoundIds.push(id);
      }
    });
    
    return NextResponse.json({
      deleted: deletedIds,
      notFound: notFoundIds,
      message: `Deleted ${deletedIds.length} items`
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete items', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}