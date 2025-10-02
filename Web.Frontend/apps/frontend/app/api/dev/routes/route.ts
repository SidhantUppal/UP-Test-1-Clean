import { NextRequest, NextResponse } from 'next/server';
import { RouteDiscoveryService, ElementDiscoveryService } from '@/lib/route-discovery';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Initialize services
    const routeDiscovery = new RouteDiscoveryService(
      path.join(process.cwd(), 'apps/frontend/app')
    );
    const elementDiscovery = new ElementDiscoveryService();
    
    // Discover all routes
    const modules = await routeDiscovery.discoverAllRoutes();
    
    // Enhance with element counts for each route
    for (const module of modules) {
      for (const route of module.routes) {
        const elements = await elementDiscovery.discoverElements(route.filePath);
        (route as any).elements = elements;
      }
    }
    
    // Get statistics
    const stats = routeDiscovery.getRouteStats(modules);
    
    return NextResponse.json({
      success: true,
      modules,
      stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Route discovery error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to discover routes',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Discover elements for a specific route
 */
export async function POST(request: NextRequest) {
  try {
    const { route } = await request.json();
    
    if (!route) {
      return NextResponse.json(
        { success: false, error: 'Route parameter required' },
        { status: 400 }
      );
    }
    
    // TODO: Implement real-time element discovery for specific route
    // This would involve:
    // 1. Loading the page in a headless browser
    // 2. Running the permission overlay logic
    // 3. Collecting all elements with permission IDs
    // 4. Returning the element data
    
    return NextResponse.json({
      success: true,
      route,
      elements: [],
      message: 'Real-time element discovery not yet implemented'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to discover elements' },
      { status: 500 }
    );
  }
}