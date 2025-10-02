import { NextRequest, NextResponse } from 'next/server';
import { userAreasDB } from '@/lib/db/userAreas';

// GET - Get single user area by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const userArea = await userAreasDB.getById(id);
    
    if (!userArea) {
      return NextResponse.json(
        { error: 'User area not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(userArea);
  } catch (error) {
    console.error('Error fetching user area:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update user area
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Don't allow changing ID
    delete body.id;
    
    // Email validation if provided
    if (body.adminEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.adminEmail)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }
    
    // Prepare update data with correct field names
    const updateData: any = {};
    if (body.name) updateData.Name = body.name;
    if (body.adminEmail) updateData.AdminEmail = body.adminEmail;
    if (body.settings) updateData.Settings = body.settings;
    if (body.active !== undefined) updateData.Active = body.active;
    
    // Update in database
    const updatedUserArea = await userAreasDB.update(id, updateData);
    
    if (!updatedUserArea) {
      return NextResponse.json(
        { error: 'User area not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedUserArea);
    
  } catch (error) {
    console.error('Error updating user area:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Partial update
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Same as PUT but for partial updates
  return PUT(request, { params });
}

// DELETE - Delete or deactivate user area
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const success = await userAreasDB.delete(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'User area not found' },
        { status: 404 }
      );
    }
    
    // TODO: In production
    // - Archive all data
    // - Notify users
    // - Cancel subscriptions
    // - Remove from search index
    
    return NextResponse.json({
      message: 'User area deactivated successfully',
      id: id
    });
  } catch (error) {
    console.error('Error deleting user area:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}