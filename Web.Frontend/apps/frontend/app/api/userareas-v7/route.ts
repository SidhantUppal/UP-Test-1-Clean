import { NextRequest, NextResponse } from 'next/server';

const SYS_ADMIN_SERVICE_URL = process.env.SYS_ADMIN_SERVICE_URL || 'http://localhost:3002';

// POST - Create new user area via sys-admin service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward to sys-admin service
    const response = await fetch(`${SYS_ADMIN_SERVICE_URL}/api/userareas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }
    
    // Transform response to frontend format
    return NextResponse.json({
      id: data.UserAreaID,
      name: data.Title,
      domain: data.BaseURL?.replace('https://', '') || body.domain,
      adminEmail: body.adminEmail,
      settings: body.settings,
      createdAt: data.CreatedDate
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error creating user area:', error);
    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    );
  }
}

// GET - List all user areas via sys-admin service
export async function GET(request: NextRequest) {
  try {
    // Forward to sys-admin service
    const response = await fetch(`${SYS_ADMIN_SERVICE_URL}/api/userareas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const userAreas = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(userAreas, { status: response.status });
    }
    
    // Transform to frontend format
    const transformedData = userAreas.map((ua: any) => ({
      id: ua.UserAreaID,
      name: ua.Title,
      domain: ua.BaseURL?.replace('https://', '') || '',
      adminEmail: 'admin@' + (ua.BaseURL?.replace('https://', '') || 'example.com'),
      settings: {
        theme: ua.ThemeTypeID === 1 ? 'blue' : ua.ThemeTypeID === 2 ? 'green' : 'orange',
        tier: ua.ThemeTypeID === 1 ? 'trial' : ua.ThemeTypeID === 2 ? 'basic' : ua.ThemeTypeID === 3 ? 'premium' : 'enterprise',
        maxUsers: ua.UploadedFileMBLimit ? ua.UploadedFileMBLimit / 10 : 100
      },
      active: !ua.IsDemo,
      totalUsers: 0, // TODO: Get from user count
      createdAt: ua.CreatedDate
    }));
    
    return NextResponse.json({
      data: transformedData,
      pagination: {
        page: 1,
        limit: transformedData.length,
        total: transformedData.length,
        totalPages: 1
      }
    });
  } catch (error) {
    console.error('Error fetching user areas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organizations' },
      { status: 500 }
    );
  }
}

// DELETE and PUT exports for compatibility
export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { error: 'Not implemented' },
    { status: 501 }
  );
}

export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { error: 'Not implemented' },
    { status: 501 }
  );
}