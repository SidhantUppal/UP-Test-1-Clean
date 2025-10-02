import { NextRequest, NextResponse } from 'next/server';

// Import the shared items array from parent route
// In a real app, this would be a database
let items: any[] = [];

// Helper to get items (in real app, this would be from DB)
function getItems() {
  // For demo purposes, we'll use a simple in-memory store
  // This is shared across all routes in this demo
  if (global.testItems === undefined) {
    global.testItems = [
      { id: 1, name: 'Test Item 1', status: 'active', category: 'electronics', price: 99.99, createdAt: new Date('2024-01-01') },
      { id: 2, name: 'Test Item 2', status: 'inactive', category: 'books', price: 19.99, createdAt: new Date('2024-01-02') },
      { id: 3, name: 'Test Item 3', status: 'active', category: 'electronics', price: 299.99, createdAt: new Date('2024-01-03') },
    ];
  }
  return global.testItems;
}

// GET /api/test/items/:id - Get single item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    // Simulate delay if requested
    const searchParams = request.nextUrl.searchParams;
    const delay = searchParams.get('delay');
    if (delay) {
      await new Promise(resolve => setTimeout(resolve, parseInt(delay)));
    }
    
    const items = getItems();
    const item = items.find(i => i.id === id);
    
    if (!item) {
      return NextResponse.json(
        { error: 'Not Found', message: `Item with id ${id} not found` },
        { status: 404 }
      );
    }
    
    // Add some computed fields
    const enrichedItem = {
      ...item,
      age: Math.floor((Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24)) + ' days',
      _links: {
        self: `/api/test/items/${id}`,
        collection: '/api/test/items'
      }
    };
    
    return NextResponse.json(enrichedItem);
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch item', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT /api/test/items/:id - Update item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const body = await request.json();
    
    const items = getItems();
    const itemIndex = items.findIndex(i => i.id === id);
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Not Found', message: `Item with id ${id} not found` },
        { status: 404 }
      );
    }
    
    // Validation
    if (body.price !== undefined && (typeof body.price !== 'number' || body.price < 0)) {
      return NextResponse.json(
        { 
          error: 'Validation Error', 
          message: 'Price must be a positive number',
          fields: { price: 'Must be a positive number' }
        },
        { status: 400 }
      );
    }
    
    // Update item
    const updatedItem = {
      ...items[itemIndex],
      ...body,
      id: id, // Ensure ID cannot be changed
      updatedAt: new Date()
    };
    
    items[itemIndex] = updatedItem;
    global.testItems = items;
    
    return NextResponse.json(updatedItem);
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update item', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PATCH /api/test/items/:id - Partial update
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Same as PUT but for partial updates
  return PUT(request, { params });
}

// DELETE /api/test/items/:id - Delete single item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    const items = getItems();
    const itemIndex = items.findIndex(i => i.id === id);
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Not Found', message: `Item with id ${id} not found` },
        { status: 404 }
      );
    }
    
    // Remove item
    const deletedItem = items[itemIndex];
    items.splice(itemIndex, 1);
    global.testItems = items;
    
    // Return 204 No Content or the deleted item
    return NextResponse.json({
      message: 'Item deleted successfully',
      deleted: deletedItem
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete item', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Declare global type for TypeScript
declare global {
  var testItems: any[] | undefined;
}