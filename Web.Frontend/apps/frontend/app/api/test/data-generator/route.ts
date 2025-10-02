import { NextRequest, NextResponse } from 'next/server';

// Sample data templates
const templates = {
  user: {
    firstName: ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Edward', 'Fiona'],
    lastName: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'],
    email: (first: string, last: string) => `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    roles: ['admin', 'user', 'manager', 'viewer'],
    departments: ['IT', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations'],
    status: ['active', 'inactive', 'suspended']
  },
  product: {
    names: ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Headphones', 'Webcam', 'Desk', 'Chair'],
    brands: ['TechCorp', 'ProGear', 'EliteTools', 'SmartDevices', 'PowerTech'],
    categories: ['electronics', 'furniture', 'accessories', 'software'],
    status: ['in_stock', 'out_of_stock', 'discontinued', 'pre_order']
  },
  incident: {
    types: ['safety', 'security', 'environmental', 'quality', 'operational'],
    severity: ['low', 'medium', 'high', 'critical'],
    status: ['open', 'investigating', 'resolved', 'closed'],
    locations: ['Building A', 'Building B', 'Parking Lot', 'Warehouse', 'Office Floor 1', 'Office Floor 2']
  },
  task: {
    titles: ['Review document', 'Update system', 'Fix bug', 'Deploy release', 'Meeting prep', 'Code review'],
    priorities: ['low', 'medium', 'high', 'urgent'],
    status: ['todo', 'in_progress', 'review', 'done', 'blocked'],
    assignees: ['user1', 'user2', 'user3', 'team_alpha', 'team_beta']
  }
};

// Generate random data based on type
function generateData(type: string, count: number) {
  const items = [];
  
  switch (type) {
    case 'user':
      for (let i = 0; i < count; i++) {
        const firstName = templates.user.firstName[Math.floor(Math.random() * templates.user.firstName.length)];
        const lastName = templates.user.lastName[Math.floor(Math.random() * templates.user.lastName.length)];
        items.push({
          id: i + 1,
          firstName,
          lastName,
          email: templates.user.email(firstName, lastName),
          role: templates.user.roles[Math.floor(Math.random() * templates.user.roles.length)],
          department: templates.user.departments[Math.floor(Math.random() * templates.user.departments.length)],
          status: templates.user.status[Math.floor(Math.random() * templates.user.status.length)],
          joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
          lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
      break;
      
    case 'product':
      for (let i = 0; i < count; i++) {
        const name = templates.product.names[Math.floor(Math.random() * templates.product.names.length)];
        const brand = templates.product.brands[Math.floor(Math.random() * templates.product.brands.length)];
        items.push({
          id: i + 1,
          name: `${brand} ${name}`,
          brand,
          category: templates.product.categories[Math.floor(Math.random() * templates.product.categories.length)],
          price: Math.round(Math.random() * 1000 * 100) / 100,
          stock: Math.floor(Math.random() * 100),
          status: templates.product.status[Math.floor(Math.random() * templates.product.status.length)],
          sku: `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
      break;
      
    case 'incident':
      for (let i = 0; i < count; i++) {
        items.push({
          id: i + 1,
          title: `Incident #${1000 + i}`,
          type: templates.incident.types[Math.floor(Math.random() * templates.incident.types.length)],
          severity: templates.incident.severity[Math.floor(Math.random() * templates.incident.severity.length)],
          status: templates.incident.status[Math.floor(Math.random() * templates.incident.status.length)],
          location: templates.incident.locations[Math.floor(Math.random() * templates.incident.locations.length)],
          reportedBy: `user${Math.floor(Math.random() * 50)}`,
          description: 'Auto-generated incident for testing purposes',
          reportedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          resolvedAt: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : null
        });
      }
      break;
      
    case 'task':
      for (let i = 0; i < count; i++) {
        items.push({
          id: i + 1,
          title: templates.task.titles[Math.floor(Math.random() * templates.task.titles.length)] + ` #${i + 1}`,
          priority: templates.task.priorities[Math.floor(Math.random() * templates.task.priorities.length)],
          status: templates.task.status[Math.floor(Math.random() * templates.task.status.length)],
          assignee: templates.task.assignees[Math.floor(Math.random() * templates.task.assignees.length)],
          dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          tags: ['auto-generated', type],
          estimatedHours: Math.floor(Math.random() * 40) + 1,
          completedHours: Math.floor(Math.random() * 20),
          createdAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
      break;
      
    default:
      // Generic items
      for (let i = 0; i < count; i++) {
        items.push({
          id: i + 1,
          name: `${type} Item ${i + 1}`,
          type: type,
          status: Math.random() > 0.5 ? 'active' : 'inactive',
          value: Math.round(Math.random() * 1000),
          metadata: {
            generated: true,
            timestamp: new Date().toISOString()
          },
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
  }
  
  return items;
}

// POST /api/test/data-generator - Generate test data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type = 'generic', count = 10 } = body;
    
    // Validate count
    if (count < 1 || count > 1000) {
      return NextResponse.json(
        { error: 'Validation Error', message: 'Count must be between 1 and 1000' },
        { status: 400 }
      );
    }
    
    // Generate data
    const data = generateData(type, count);
    
    return NextResponse.json({
      type,
      count: data.length,
      data,
      metadata: {
        generatedAt: new Date().toISOString(),
        availableTypes: ['user', 'product', 'incident', 'task', 'generic']
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate data', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET /api/test/data-generator - Get available templates
export async function GET() {
  return NextResponse.json({
    availableTypes: ['user', 'product', 'incident', 'task', 'generic'],
    templates: {
      user: {
        example: {
          id: 1,
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@example.com',
          role: 'admin',
          department: 'IT',
          status: 'active',
          joinDate: '2024-01-15T10:30:00Z',
          lastLogin: '2024-12-01T15:45:00Z'
        }
      },
      product: {
        example: {
          id: 1,
          name: 'TechCorp Laptop',
          brand: 'TechCorp',
          category: 'electronics',
          price: 999.99,
          stock: 25,
          status: 'in_stock',
          sku: 'SKU-ABC123',
          createdAt: '2024-01-01T00:00:00Z'
        }
      },
      incident: {
        example: {
          id: 1,
          title: 'Incident #1001',
          type: 'safety',
          severity: 'high',
          status: 'open',
          location: 'Building A',
          reportedBy: 'user42',
          description: 'Auto-generated incident for testing purposes',
          reportedAt: '2024-11-20T14:30:00Z',
          resolvedAt: null
        }
      },
      task: {
        example: {
          id: 1,
          title: 'Review document #1',
          priority: 'high',
          status: 'in_progress',
          assignee: 'user1',
          dueDate: '2024-12-15T17:00:00Z',
          tags: ['auto-generated', 'task'],
          estimatedHours: 8,
          completedHours: 3,
          createdAt: '2024-11-25T09:00:00Z'
        }
      }
    }
  });
}