"use client";

import { useState, useEffect } from 'react';
import { loadLOCIPage } from '../LOCI/loader';
import type { LOCIElement } from '../LOCI/types/loci.types';

export default function LOCI1Page() {
  const [showLOCI, setShowLOCI] = useState(false);
  
  // Debug: Log showLOCI changes
  useEffect(() => {
    console.log('showLOCI state changed to:', showLOCI);
  }, [showLOCI]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [modalData, setModalData] = useState<LOCIElement | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('configuration');
  const [lociData, setLociData] = useState<Record<string, LOCIElement> | null>(null);
  const [buttonDescription, setButtonDescription] = useState('');
  const [showTableData, setShowTableData] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [addedPermissions, setAddedPermissions] = useState<string[]>([]);
  const [historyDrilldown, setHistoryDrilldown] = useState<string | null>(null);
  const [codeGenerationRequests, setCodeGenerationRequests] = useState<Array<{
    id: string;
    timestamp: string;
    instruction: string;
    backendCode: string;
    frontendCode: string;
    testCode: string;
    status: 'live' | 'failed' | 'ready_to_push' | 'deprecated';
    expanded: boolean;
  }>>([
    {
      id: 'req_1703847200000',
      timestamp: '2024-01-20T10:30:00.000Z',
      instruction: `Create a DELETE API endpoint:
- Action: Soft delete record in checklist_items table
- Business Logic: Only managers and above can delete items, check if item is not locked
- Include: Permission checks, audit logging, error handling
- Return: JSON success/error response`,
      backendCode: `// Generated API Route - Production
export async function DELETE(request: Request) {
  try {
    const user = await getUser(request);
    if (!hasPermission(user, 'manager|admin')) {
      return Response.json({ error: 'Access denied' }, { status: 403 });
    }

    const { itemId } = await request.json();
    
    // Check if item is locked
    const item = await db.checklistItem.findUnique({ where: { id: itemId } });
    if (item?.isLocked) {
      return Response.json({ error: 'Item is locked and cannot be deleted' }, { status: 400 });
    }

    // Soft delete
    await db.checklistItem.update({
      where: { id: itemId },
      data: { deletedAt: new Date(), deletedBy: user.id }
    });
    
    // Audit logging
    await logAction(user.id, 'DELETE_CHECKLIST_ITEM', { itemId });
    
    return Response.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return Response.json({ error: 'Delete operation failed' }, { status: 500 });
  }
}`,
      frontendCode: `// Frontend Handler - Production
const handleDeleteItem = async (itemId: string) => {
  if (!confirm('Are you sure you want to delete this item?')) return;
  
  try {
    setLoading(true);
    const response = await fetch('/api/checklist/items', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Delete failed');
    }
    
    showSuccessMessage('Item deleted successfully');
    refreshItems();
    
  } catch (error) {
    showErrorMessage(error.message);
  } finally {
    setLoading(false);
  }
};`,
      testCode: `// Test Suite - Production
describe('DELETE /api/checklist/items', () => {
  test('should delete item with manager permissions', async () => {
    const response = await request(app)
      .delete('/api/checklist/items')
      .set('Authorization', 'Bearer manager-token')
      .send({ itemId: 'test-item-123' });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
  
  test('should fail for locked items', async () => {
    const response = await request(app)
      .delete('/api/checklist/items')
      .set('Authorization', 'Bearer manager-token')
      .send({ itemId: 'locked-item-456' });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('locked');
  });
  
  test('should fail without permissions', async () => {
    const response = await request(app)
      .delete('/api/checklist/items')
      .send({ itemId: 'test-item-123' });
    
    expect(response.status).toBe(403);
  });
});`,
      status: 'live',
      expanded: false
    },
    {
      id: 'req_1703933600000',
      timestamp: '2024-01-21T14:15:00.000Z',
      instruction: `Create a POST API endpoint:
- Action: Create new user account in users table
- Business Logic: Validate email format, check for duplicates, send welcome email
- Include: Input validation, duplicate checks, email service integration
- Return: JSON with user data or validation errors`,
      backendCode: `// Generated API Route - FAILED VALIDATION
export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, role } = await request.json();
    
    // Email validation - ISSUE: Missing regex validation
    if (!email.includes('@')) {
      return Response.json({ error: 'Invalid email' }, { status: 400 });
    }
    
    // Check duplicates
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json({ error: 'Email already exists' }, { status: 409 });
    }

    // Create user - ERROR: Missing required fields validation
    const user = await db.user.create({
      data: { email, firstName, lastName, role }
    });
    
    // Send welcome email - ISSUE: Not implemented
    // await sendWelcomeEmail(user);
    
    return Response.json({ user });
  } catch (error) {
    return Response.json({ error: 'User creation failed' }, { status: 500 });
  }
}`,
      frontendCode: `// Frontend Handler - Has Issues
const handleCreateUser = async (userData) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    // ISSUE: Missing proper error handling
    const result = await response.json();
    if (result.user) {
      showSuccessMessage('User created');
    }
    
  } catch (error) {
    // ISSUE: Generic error handling
    alert('Error creating user');
  }
};`,
      testCode: `// Test Suite - Incomplete
describe('POST /api/users', () => {
  test('should create user with valid data', async () => {
    // TODO: Complete this test
    expect(true).toBe(true);
  });
  
  // MISSING: Email validation tests
  // MISSING: Duplicate email tests  
  // MISSING: Welcome email tests
});`,
      status: 'failed',
      expanded: true
    },
    {
      id: 'req_1704020000000',
      timestamp: '2024-01-22T09:45:00.000Z',
      instruction: `Create a PUT API endpoint:
- Action: Update checklist item status in checklist_items table
- Business Logic: Users can update their own items, managers can update any item
- Include: Ownership validation, status transition rules, notification system
- Return: JSON with updated item data`,
      backendCode: `// Generated API Route - Ready for Deploy
export async function PUT(request: Request) {
  try {
    const user = await getUser(request);
    const { itemId, status, notes } = await request.json();
    
    // Get current item
    const item = await db.checklistItem.findUnique({ 
      where: { id: itemId },
      include: { assignedTo: true }
    });
    
    if (!item) {
      return Response.json({ error: 'Item not found' }, { status: 404 });
    }
    
    // Check permissions - own items or manager+
    const canUpdate = item.assignedToId === user.id || 
                     hasPermission(user, 'manager|admin');
    
    if (!canUpdate) {
      return Response.json({ error: 'Access denied' }, { status: 403 });
    }
    
    // Validate status transition
    const validTransitions = {
      'pending': ['in_progress', 'cancelled'],
      'in_progress': ['completed', 'pending', 'blocked'],
      'completed': ['pending'], // reopen
      'blocked': ['pending', 'cancelled']
    };
    
    if (!validTransitions[item.status]?.includes(status)) {
      return Response.json({ 
        error: \`Cannot transition from \${item.status} to \${status}\`
      }, { status: 400 });
    }
    
    // Update item
    const updatedItem = await db.checklistItem.update({
      where: { id: itemId },
      data: { 
        status, 
        notes,
        updatedAt: new Date(),
        updatedBy: user.id
      },
      include: { assignedTo: true, checklist: true }
    });
    
    // Send notifications
    if (status === 'completed') {
      await notificationService.send({
        userId: item.checklist.createdBy,
        message: \`Item "\${item.title}" completed by \${user.name}\`,
        type: 'item_completed'
      });
    }
    
    // Audit logging
    await logAction(user.id, 'UPDATE_ITEM_STATUS', { 
      itemId, 
      oldStatus: item.status, 
      newStatus: status 
    });
    
    return Response.json({ 
      success: true, 
      item: updatedItem,
      message: 'Item updated successfully'
    });
    
  } catch (error) {
    console.error('Update error:', error);
    return Response.json({ error: 'Update failed' }, { status: 500 });
  }
}`,
      frontendCode: `// Frontend Handler - Ready for Deploy
const handleUpdateItemStatus = async (itemId: string, newStatus: string, notes?: string) => {
  try {
    setUpdating(true);
    
    const response = await fetch(\`/api/checklist/items/\${itemId}\`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${getAuthToken()}\`
      },
      body: JSON.stringify({ 
        itemId,
        status: newStatus, 
        notes 
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Update failed');
    }
    
    const result = await response.json();
    
    // Update local state
    setItems(prev => prev.map(item => 
      item.id === itemId ? result.item : item
    ));
    
    // Show success notification
    showSuccessToast(result.message);
    
    // Trigger analytics
    analytics.track('item_status_updated', {
      itemId,
      oldStatus: getCurrentItemStatus(itemId),
      newStatus
    });
    
  } catch (error) {
    showErrorToast(error.message);
    console.error('Status update failed:', error);
  } finally {
    setUpdating(false);
  }
};`,
      testCode: `// Test Suite - Comprehensive
describe('PUT /api/checklist/items/:id', () => {
  beforeEach(async () => {
    await seedTestData();
  });

  describe('Permission Tests', () => {
    test('should allow user to update own items', async () => {
      const response = await request(app)
        .put('/api/checklist/items/user-item-123')
        .set('Authorization', 'Bearer user-token')
        .send({ status: 'in_progress' });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
    
    test('should allow manager to update any item', async () => {
      const response = await request(app)
        .put('/api/checklist/items/other-user-item')
        .set('Authorization', 'Bearer manager-token')
        .send({ status: 'completed' });
      
      expect(response.status).toBe(200);
    });
    
    test('should deny user updating others items', async () => {
      const response = await request(app)
        .put('/api/checklist/items/other-user-item')
        .set('Authorization', 'Bearer user-token')
        .send({ status: 'completed' });
      
      expect(response.status).toBe(403);
    });
  });

  describe('Status Transition Tests', () => {
    test('should allow valid status transitions', async () => {
      const response = await request(app)
        .put('/api/checklist/items/pending-item')
        .set('Authorization', 'Bearer user-token')
        .send({ status: 'in_progress' });
      
      expect(response.status).toBe(200);
    });
    
    test('should reject invalid status transitions', async () => {
      const response = await request(app)
        .put('/api/checklist/items/completed-item')
        .set('Authorization', 'Bearer user-token')
        .send({ status: 'in_progress' });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Cannot transition');
    });
  });

  describe('Notification Tests', () => {
    test('should send notification on completion', async () => {
      const notificationSpy = jest.spyOn(notificationService, 'send');
      
      await request(app)
        .put('/api/checklist/items/user-item-123')
        .set('Authorization', 'Bearer user-token')
        .send({ status: 'completed' });
      
      expect(notificationSpy).toHaveBeenCalledWith({
        userId: expect.any(String),
        message: expect.stringContaining('completed'),
        type: 'item_completed'
      });
    });
  });
});`,
      status: 'ready_to_push',
      expanded: false
    },
    {
      id: 'req_1703760800000',
      timestamp: '2024-01-19T16:20:00.000Z',
      instruction: `Create a GET API endpoint:
- Action: Fetch checklist items with filtering in checklist_items table  
- Business Logic: Return items based on user role and assignment
- Include: Pagination, sorting, filtering by status/user
- Return: JSON with paginated item list`,
      backendCode: `// Generated API Route - Deprecated (v1)
export async function GET(request: Request) {
  try {
    const user = await getUser(request);
    const url = new URL(request.url);
    
    // Basic filtering - OLD APPROACH
    let items;
    if (user.role === 'admin') {
      items = await db.checklistItem.findMany();
    } else {
      items = await db.checklistItem.findMany({
        where: { assignedToId: user.id }
      });
    }
    
    return Response.json({ items });
  } catch (error) {
    return Response.json({ error: 'Fetch failed' }, { status: 500 });
  }
}`,
      frontendCode: `// Frontend Handler - Deprecated
const fetchItems = async () => {
  const response = await fetch('/api/checklist/items');
  const data = await response.json();
  setItems(data.items || []);
};`,
      testCode: `// Test Suite - Minimal (v1)
describe('GET /api/checklist/items', () => {
  test('should return items', async () => {
    const response = await request(app).get('/api/checklist/items');
    expect(response.status).toBe(200);
  });
});`,
      status: 'deprecated',
      expanded: false
    },
    {
      id: 'req_1704106400000',
      timestamp: '2024-01-23T11:30:00.000Z',
      instruction: `Create a POST API endpoint:
- Action: Create new checklist template in checklist_templates table
- Business Logic: Only admin users can create templates, validate template structure
- Include: JSON schema validation, duplicate name checks, auto-assign template ID
- Return: JSON with created template data`,
      backendCode: `// Generated API Route - Latest Generation
export async function POST(request: Request) {
  try {
    const user = await getUser(request);
    
    // Admin only permission
    if (!hasPermission(user, 'admin')) {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }
    
    const { name, description, items, category, isPublic } = await request.json();
    
    // Input validation
    const validation = templateSchema.safeParse({ name, description, items, category });
    if (!validation.success) {
      return Response.json({ 
        error: 'Validation failed', 
        details: validation.error.issues 
      }, { status: 400 });
    }
    
    // Check for duplicate names
    const existing = await db.checklistTemplate.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } }
    });
    
    if (existing) {
      return Response.json({ 
        error: 'Template name already exists' 
      }, { status: 409 });
    }
    
    // Generate template ID
    const templateId = \`TPL_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
    
    // Create template
    const template = await db.checklistTemplate.create({
      data: {
        id: templateId,
        name,
        description,
        items: JSON.stringify(items),
        category,
        isPublic: isPublic || false,
        createdBy: user.id,
        version: 1,
        status: 'draft'
      },
      include: {
        creator: { select: { id: true, name: true, email: true } }
      }
    });
    
    // Audit logging
    await logAction(user.id, 'CREATE_TEMPLATE', { 
      templateId: template.id,
      templateName: name,
      itemCount: items.length
    });
    
    return Response.json({ 
      success: true,
      template,
      message: 'Template created successfully'
    });
    
  } catch (error) {
    console.error('Template creation error:', error);
    return Response.json({ 
      error: 'Template creation failed' 
    }, { status: 500 });
  }
}`,
      frontendCode: `// Frontend Handler - Latest Generation  
const handleCreateTemplate = async (templateData: TemplateFormData) => {
  try {
    setCreating(true);
    
    // Client-side validation
    const validationResult = validateTemplateForm(templateData);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }
    
    const response = await fetch('/api/templates', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${getAuthToken()}\`
      },
      body: JSON.stringify(templateData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      if (error.details) {
        // Handle validation errors
        setErrors(formatValidationErrors(error.details));
      } else {
        throw new Error(error.error || 'Creation failed');
      }
      return;
    }
    
    const result = await response.json();
    
    // Success handling
    showSuccessToast(result.message);
    navigate(\`/templates/\${result.template.id}\`);
    
    // Analytics
    analytics.track('template_created', {
      templateId: result.template.id,
      itemCount: templateData.items.length,
      category: templateData.category
    });
    
  } catch (error) {
    showErrorToast(error.message);
    console.error('Template creation failed:', error);
  } finally {
    setCreating(false);
  }
};`,
      testCode: `// Test Suite - Latest Generation
describe('POST /api/templates', () => {
  const validTemplateData = {
    name: 'Test Template',
    description: 'A test checklist template',
    items: [
      { title: 'Task 1', required: true },
      { title: 'Task 2', required: false }
    ],
    category: 'general',
    isPublic: false
  };

  describe('Permission Tests', () => {
    test('should create template with admin permissions', async () => {
      const response = await request(app)
        .post('/api/templates')
        .set('Authorization', 'Bearer admin-token')
        .send(validTemplateData);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.template.name).toBe(validTemplateData.name);
    });
    
    test('should deny non-admin users', async () => {
      const response = await request(app)
        .post('/api/templates')
        .set('Authorization', 'Bearer user-token')
        .send(validTemplateData);
      
      expect(response.status).toBe(403);
    });
  });

  describe('Validation Tests', () => {
    test('should reject invalid template data', async () => {
      const response = await request(app)
        .post('/api/templates')
        .set('Authorization', 'Bearer admin-token')
        .send({ name: '' }); // Invalid
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
    });
    
    test('should reject duplicate template names', async () => {
      // Create first template
      await request(app)
        .post('/api/templates')
        .set('Authorization', 'Bearer admin-token')
        .send(validTemplateData);
      
      // Try to create duplicate
      const response = await request(app)
        .post('/api/templates')
        .set('Authorization', 'Bearer admin-token')
        .send(validTemplateData);
      
      expect(response.status).toBe(409);
      expect(response.body.error).toContain('already exists');
    });
  });

  describe('Template ID Generation', () => {
    test('should generate unique template IDs', async () => {
      const response1 = await request(app)
        .post('/api/templates')
        .set('Authorization', 'Bearer admin-token')
        .send({ ...validTemplateData, name: 'Template 1' });
      
      const response2 = await request(app)
        .post('/api/templates')
        .set('Authorization', 'Bearer admin-token')
        .send({ ...validTemplateData, name: 'Template 2' });
      
      expect(response1.body.template.id).not.toBe(response2.body.template.id);
      expect(response1.body.template.id).toMatch(/^TPL_/);
    });
  });
});`,
      status: 'ready_to_push',
      expanded: false
    }
  ]);

  // Helper to get short element name (last 2 parts of ID)
  const getShortElementId = (fullId: string) => {
    const parts = fullId.split('_');
    return parts.slice(-2).join('_');
  };

  // Mock permissions for demo
  const hasDeletePermission = false;

  // Element IDs following our schema: MS_PG_T_A_TG_###
  const elementIds = {
    // Page permission
    pagePermission: 'ADM_LOC1_PG_V_ALL_000',
    // Navigation elements
    navDashboard: 'NAV_GLB_L_N_DSH_001',
    navChecklists: 'NAV_GLB_L_N_CHK_002',
    navReports: 'NAV_GLB_L_N_RPT_003',
    navAdmin: 'NAV_GLB_L_N_ADM_004',
    // Regular elements
    deleteBtn: 'CHK_LOC1_B_D_ITM_001',
    editBtn: 'CHK_LOC1_B_E_ITM_002', // This triggers a modal
    createBtn: 'CHK_LOC1_B_C_ITM_003',
    emailInput: 'USR_LOC1_I_V_EML_004',
    dateInput: 'CHK_LOC1_I_V_DTE_005',
    statusDropdown: 'CHK_LOC1_D_F_STS_006',
    saveForm: 'CHK_LOC1_F_S_ALL_007',
    dataTable: 'CHK_LOC1_T_V_LST_008',
    confirmDialog: 'CHK_LOC1_M_C_DEL_009',
    exportBtn: 'RPT_LOC1_B_E_CSV_010',
    // Modal elements
    modalSaveBtn: 'CHK_LOC1_M_B_S_EDT_011',
    modalCancelBtn: 'CHK_LOC1_M_B_C_EDT_012'
  };

  // Load LOCI data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔍 LOCI: Attempting to load page data...');
        const data = await loadLOCIPage('loci1');
        console.log('🔍 LOCI: Loaded data:', data);
        setLociData(data);
      } catch (error) {
        console.error('🔍 LOCI: Failed to load LOCI data:', error);
      }
    };

    loadData();
  }, []);

  const handleElementClick = (elementId: string) => {
    if (!showLOCI || !lociData) return;
    
    const data = lociData[elementId] || {
      id: elementId,
      pageId: 'loci1',
      element: elementId,
      status: 'pending' as const,
      type: [],
      info: { action: 'No data available yet', effects: [] },
      connections: [],
      validation: null,
      dbRules: null,
      history: [],
      lastUpdated: new Date().toISOString()
    };
    
    setTimeout(() => {
      setSelectedElement(elementId);
      setModalData(data);
      setButtonDescription(''); // Reset description when modal opens
      setAddedPermissions([]); // Reset permissions when modal opens
      setSelectedRole(''); // Reset selected role
    }, 500);
  };

  const handleSendToClaude = () => {
    const timestamp = new Date().toISOString();
    const newRequest = {
      id: `req_${Date.now()}`,
      timestamp,
      instruction: `Create a ${modalData?.element === 'DeleteButton' ? 'DELETE' : 'POST'} API endpoint:
- Action: ${modalData?.element === 'DeleteButton' ? 'Soft delete' : 'Update'} record in ${showTableData || 'checklists'} table
- Business Logic: ${buttonDescription || 'User-defined business action'}
- Include: Permission checks, audit logging, error handling
- Return: JSON success/error response`,
      backendCode: `// Generated API Route - ${timestamp}
export async function ${modalData?.element === 'DeleteButton' ? 'DELETE' : 'POST'}(request: Request) {
  try {
    // Permission check
    const user = await getUser(request);
    if (!hasPermission(user, '${addedPermissions.join('|')}')) {
      return Response.json({ error: 'Access denied' }, { status: 403 });
    }

    // Business logic: ${buttonDescription || 'Process action'}
    const result = await processAction(request);
    
    // Audit logging
    await logAction(user.id, '${modalData?.element || 'action'}', result);
    
    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json({ error: 'Operation failed' }, { status: 500 });
  }
}`,
      frontendCode: `// Generated Frontend Handler
const handle${modalData?.element || 'Action'} = async () => {
  try {
    const response = await fetch('/api/${modalData?.element?.toLowerCase() || 'action'}', {
      method: '${modalData?.element === 'DeleteButton' ? 'DELETE' : 'POST'}',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ /* data */ })
    });
    
    if (!response.ok) throw new Error('Action failed');
    
    const result = await response.json();
    // Handle success
    showSuccessMessage('Action completed successfully');
    
  } catch (error) {
    showErrorMessage(error.message);
  }
};`,
      testCode: `// Generated Test Suite
describe('${modalData?.element || 'Action'} API', () => {
  test('should succeed with valid permissions', async () => {
    const response = await request(app)
      .${modalData?.element === 'DeleteButton' ? 'delete' : 'post'}('/api/${modalData?.element?.toLowerCase() || 'action'}')
      .set('Authorization', 'Bearer valid-token');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
  
  test('should fail without permissions', async () => {
    const response = await request(app)
      .${modalData?.element === 'DeleteButton' ? 'delete' : 'post'}('/api/${modalData?.element?.toLowerCase() || 'action'}');
    
    expect(response.status).toBe(403);
  });
});`,
      status: 'ready_to_push' as const,
      expanded: true
    };
    
    setCodeGenerationRequests(prev => [newRequest, ...prev]);
    setActiveTab('code');
  };

  return (
    <div className="relative min-h-screen">
      {/* LOCI Toggle - Floating in top right */}
      <div className="fixed top-28 right-4 z-50 bg-black/90 text-white p-4 rounded-lg shadow-xl">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            id="loci-debug-toggle"
            type="checkbox"
            checked={showLOCI}
            onChange={(e) => {
              console.log('LOCI Toggle clicked, new value:', e.target.checked);
              setShowLOCI(e.target.checked);
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span className="font-mono text-sm">LOCI Debug</span>
        </label>
        {showLOCI && (
          <div className="mt-2 text-xs text-green-400">
            🟢 Active {lociData ? `- ${Object.keys(lociData).length} elements` : '- Loading...'}
          </div>
        )}
      </div>

      {/* Debug Test */}
      {showLOCI && (
        <div className="fixed top-44 right-4 bg-red-500 text-white p-4 z-50">
          LOCI IS ACTIVE - showLOCI = {showLOCI.toString()}
        </div>
      )}

      {/* Page Permission Indicator */}
      {showLOCI && (
        <div 
          className="fixed top-28 left-20 bg-black text-white text-base px-5 py-4 rounded-md shadow-lg border-4 border-blue-500 z-40 cursor-pointer hover:bg-gray-900"
          onClick={() => handleElementClick(elementIds.pagePermission)}
        >
          <div className="font-bold text-lg mb-2">PAGE OVERVIEW</div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400 font-bold text-xl">P</span>
            <span className="text-gray-400">•</span>
            <span className="font-mono">{getShortElementId(elementIds.pagePermission)}</span>
          </div>
          <div className="text-sm mt-2 text-gray-400">Admin Users Only</div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">LOCI Test Page 1</h1>
          <p className="text-gray-600 mt-2">Various UI elements with LOCI overlay system</p>
        </div>

        {/* Section 1: Action Buttons */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Action Buttons (Permissions)</h2>
          <div className="flex space-x-4">
            {/* Delete Button - No Permission */}
            <div className="relative">
              <button
                className={`btn ${hasDeletePermission ? 'btn-error' : 'btn-disabled'}`}
                disabled={!hasDeletePermission}
                onClick={() => handleElementClick(elementIds.deleteBtn)}
              >
                Delete Item
              </button>
              {showLOCI && (
                <div 
                  className="absolute -top-12 left-0 bg-black text-white text-base px-4 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-800 shadow-lg border-2 border-gray-500"
                  onClick={() => handleElementClick(elementIds.deleteBtn)}
                >
                  <span className="text-red-400 font-bold text-lg">P</span> <span className="text-gray-400">•</span> {getShortElementId(elementIds.deleteBtn)}
                </div>
              )}
            </div>

            {/* Edit Button - Has Permission */}
            <div className="relative">
              <button 
                className="btn btn-primary"
                onClick={() => setShowEditModal(true)}
              >
                Edit Item
              </button>
              {showLOCI && (
                <div 
                  className="absolute -top-12 left-0 bg-black text-white text-base px-4 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-800 shadow-lg border-4 border-orange-500"
                  onClick={() => handleElementClick(elementIds.editBtn)}
                >
                  <span className="text-green-400 font-bold text-lg">P</span><span className="text-orange-400 font-bold text-lg">M</span> <span className="text-gray-400">•</span> {getShortElementId(elementIds.editBtn)}
                </div>
              )}
            </div>

            {/* Create Button */}
            <div className="relative">
              <button className="btn btn-success">
                Create New
              </button>
              {showLOCI && (
                <div 
                  className="absolute -top-12 left-0 bg-black text-white text-base px-4 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-800 shadow-lg border-2 border-gray-500"
                  onClick={() => handleElementClick(elementIds.createBtn)}
                >
                  <span className="text-orange-400 font-bold text-lg">P</span><span className="text-green-400 font-bold text-lg">C</span> <span className="text-gray-400">•</span> {getShortElementId(elementIds.createBtn)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Form Inputs with Validation */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Form Elements (Validation)</h2>
          <div className="space-y-4">
            {/* Email Input with Validation */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                className="input input-bordered w-full max-w-xs"
                placeholder="user@example.com"
              />
              {showLOCI && (
                <div 
                  className="absolute -top-10 right-0 bg-black text-white text-base px-4 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-800 shadow-lg border-2 border-gray-500"
                  onClick={() => handleElementClick(elementIds.emailInput)}
                >
                  <span className="text-green-400 font-bold text-lg">V</span> <span className="text-gray-400">•</span> {getShortElementId(elementIds.emailInput)}
                </div>
              )}
            </div>

            {/* Date Input with Business Rule */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Due Date (Must be future)</label>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs"
              />
              {showLOCI && (
                <div 
                  className="absolute -top-10 right-0 bg-black text-white text-base px-4 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-800 shadow-lg border-2 border-gray-500"
                  onClick={() => handleElementClick(elementIds.dateInput)}
                >
                  <span className="text-orange-400 font-bold text-lg">V</span><span className="text-red-400 font-bold text-lg">DB</span> <span className="text-gray-400">•</span> {getShortElementId(elementIds.dateInput)}
                </div>
              )}
            </div>

            {/* Status Dropdown with Filter */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select className="select select-bordered w-full max-w-xs">
                <option>Active</option>
                <option>Pending</option>
                <option>Completed</option>
                <option>Archived</option>
              </select>
              {showLOCI && (
                <div 
                  className="absolute -top-10 right-0 bg-black text-white text-base px-4 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-800 shadow-lg border-2 border-gray-500"
                  onClick={() => handleElementClick(elementIds.statusDropdown)}
                >
                  <span className="text-green-400 font-bold text-lg">F</span> <span className="text-gray-400">•</span> {getShortElementId(elementIds.statusDropdown)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Complex Elements */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Complex Elements</h2>
          
          {/* Data Table */}
          <div className="relative mb-6">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Item 1</td>
                    <td>Active</td>
                    <td>
                      <button className="btn btn-xs">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Item 2</td>
                    <td>Pending</td>
                    <td>
                      <button className="btn btn-xs">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {showLOCI && (
              <div 
                className="absolute -top-10 left-0 bg-black text-white text-base px-4 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-800 shadow-lg border-2 border-gray-500"
                onClick={() => handleElementClick(elementIds.dataTable)}
              >
                <span className="text-green-400 font-bold text-lg">I</span><span className="text-green-400 font-bold text-lg">F</span> <span className="text-gray-400">•</span> {getShortElementId(elementIds.dataTable)}
              </div>
            )}
          </div>

          {/* Export Button with Connected Permission */}
          <div className="relative inline-block">
            <button className="btn btn-secondary">
              Export to CSV
            </button>
            {showLOCI && (
              <div 
                className="absolute -top-10 left-0 bg-black text-white text-base px-4 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-800 shadow-lg border-2 border-gray-500"
                onClick={() => handleElementClick(elementIds.exportBtn)}
              >
                <span className="text-orange-400 font-bold text-lg">P</span><span className="text-green-400 font-bold text-lg">C</span><span className="text-green-400 font-bold text-lg">I</span> <span className="text-gray-400">•</span> {getShortElementId(elementIds.exportBtn)}
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Confirmation Dialog Example */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">User Confirmations (V2)</h2>
          <div className="relative inline-block">
            <button 
              className="btn btn-warning"
              onClick={() => {
                if (confirm('Are you sure you want to delete this item?')) {
                  alert('Item deleted!');
                }
              }}
            >
              Delete with Confirmation
            </button>
            {showLOCI && (
              <div 
                className="absolute -top-10 left-0 bg-black text-white text-base px-4 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-800 shadow-lg border-2 border-gray-500"
                onClick={() => handleElementClick(elementIds.confirmDialog)}
              >
                <span className="text-green-400 font-bold text-lg">V2</span> <span className="text-gray-400">•</span> {getShortElementId(elementIds.confirmDialog)}
              </div>
            )}
          </div>
        </div>

        {/* LOCI Legend when active */}
        {showLOCI && (
          <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg shadow-xl max-w-md">
            <h3 className="font-bold mb-2">LOCI Legend</h3>
            <div className="text-xs space-y-1">
              <div><span className="font-bold">P</span> - Permission</div>
              <div><span className="font-bold">N</span> - Navigation Element</div>
              <div><span className="font-bold">V</span> - Validation Rule</div>
              <div><span className="font-bold">V2</span> - User Confirmation</div>
              <div><span className="font-bold">F</span> - Filter Rule</div>
              <div><span className="font-bold">I</span> - Info/Behavior</div>
              <div><span className="font-bold">C</span> - Connected Elements</div>
              <div><span className="font-bold">DB</span> - Database Rule</div>
            </div>
            <div className="mt-3 text-xs space-y-1">
              <div><span className="text-green-400">●</span> Green - Complete/Working</div>
              <div><span className="text-orange-400">●</span> Orange - Needs Work</div>
              <div><span className="text-red-400">●</span> Red - Broken</div>
            </div>
            <div className="mt-3 text-xs space-y-1">
              <div><span className="border-4 border-orange-500 px-1 py-0.5">Thick Orange</span> - Opens Modal</div>
              <div><span className="border-4 border-purple-500 px-1 py-0.5">Thick Purple</span> - Element Inside Modal</div>
              <div><span className="bg-purple-600 text-white px-1 rounded font-bold">M</span> - Modal Context Indicator</div>
              <div><span className="border-4 border-blue-500 px-1 py-0.5">Thick Blue</span> - Page Overview</div>
              <div><span className="border-2 border-gray-500 px-1 py-0.5">Gray Border</span> - Regular Element</div>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              Click any element to see details
            </div>
          </div>
        )}

        {/* Edit Item Modal (Example of Modal with LOCI elements) */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Edit Item</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Item Name</label>
                    <input type="text" className="input input-bordered w-full" defaultValue="Sample Item" />
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-6">
                    {/* Save Button in Modal */}
                    <div className="relative">
                      <button className="btn btn-primary">
                        Save Changes
                      </button>
                      {showLOCI && (
                        <div 
                          className="absolute -top-10 left-0 bg-black text-white text-sm px-3 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-800 shadow-lg border border-gray-700 z-50"
                          onClick={() => handleElementClick(elementIds.modalSaveBtn)}
                        >
                          <span className="text-green-400 font-bold">P:</span> <span className="bg-purple-600 px-1 rounded text-xs">MODAL</span> {elementIds.modalSaveBtn}
                        </div>
                      )}
                    </div>
                    
                    {/* Cancel Button in Modal */}
                    <div className="relative">
                      <button 
                        className="btn btn-ghost"
                        onClick={() => setShowEditModal(false)}
                      >
                        Cancel
                      </button>
                      {showLOCI && (
                        <div 
                          className="absolute -top-10 right-0 bg-black text-white text-sm px-3 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-800 shadow-lg border border-gray-700 z-50"
                          onClick={() => handleElementClick(elementIds.modalCancelBtn)}
                        >
                          <span className="text-green-400 font-bold">I:</span> <span className="bg-purple-600 px-1 rounded text-xs">MODAL</span> {elementIds.modalCancelBtn}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LOCI Detail Modal - Enhanced with Tabs */}
        {modalData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header with Tabs */}
              <div className="bg-gray-900 text-white">
                <div className="flex justify-between items-start p-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold">Button - Delete</h2>
                      <div className={`px-4 py-1 rounded-full border-2 text-sm font-bold ${
                        modalData.status === 'complete' ? 'border-green-500 bg-green-100 text-green-800' :
                        modalData.status === 'partial' ? 'border-orange-500 bg-orange-100 text-orange-800' :
                        modalData.status === 'broken' ? 'border-red-500 bg-red-100 text-red-800' :
                        'border-gray-500 bg-gray-100 text-gray-800'
                      }`}>
                        {getShortElementId(selectedElement || '')}
                      </div>
                    </div>
                    <p className="text-gray-300 mt-1 font-mono text-sm">{selectedElement}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-3 py-1 rounded text-sm font-bold ${
                        modalData.status === 'complete' ? 'bg-green-600' :
                        modalData.status === 'partial' ? 'bg-orange-600' :
                        modalData.status === 'broken' ? 'bg-red-600' :
                        'bg-gray-600'
                      }`}>
                        {modalData.status?.toUpperCase() || 'PENDING'}
                      </span>
                      {modalData.type && modalData.type.map((t, i) => (
                        <span key={i} className="bg-gray-700 px-2 py-1 rounded text-sm">{t}</span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => setModalData(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>
                {/* Tabs */}
                <div className="flex border-t border-gray-700">
                  <button 
                    className={`px-6 py-3 border-b-2 ${
                      activeTab === 'configuration' 
                        ? 'border-blue-500 bg-gray-800' 
                        : 'border-transparent hover:bg-gray-800'
                    }`}
                    onClick={() => setActiveTab('configuration')}
                  >
                    Quick Actions
                  </button>
                  <button 
                    className={`px-6 py-3 border-b-2 ${
                      activeTab === 'code' 
                        ? 'border-blue-500 bg-gray-800' 
                        : 'border-transparent hover:bg-gray-800'
                    }`}
                    onClick={() => setActiveTab('code')}
                  >
                    💻 Code & Implementation
                  </button>
                  <button 
                    className={`px-6 py-3 border-b-2 ${
                      activeTab === 'permissions' 
                        ? 'border-blue-500 bg-gray-800' 
                        : 'border-transparent hover:bg-gray-800'
                    }`}
                    onClick={() => setActiveTab('permissions')}
                  >
                    🔐 Permissions & Security
                  </button>
                  <button 
                    className={`px-6 py-3 border-b-2 ${
                      activeTab === 'history' 
                        ? 'border-blue-500 bg-gray-800' 
                        : 'border-transparent hover:bg-gray-800'
                    }`}
                    onClick={() => setActiveTab('history')}
                  >
                    📝 History & Audit
                  </button>
                </div>
              </div>

              {/* Modal Content - Dynamic based on active tab */}
              <div className="flex-1 overflow-y-auto">
                {activeTab === 'configuration' && (
                <div className="p-6 space-y-6">
                  {/* BUSINESS LOGIC INSTRUCTION BUILDER */}
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-2">
                      🎯 TELL CLAUDE WHAT TO BUILD
                    </h2>
                    <p className="text-purple-100 mb-4">
                      Describe the business logic and Claude will write the API for you
                    </p>
                  </div>

                  {/* STEP 1: BUTTON-SPECIFIC ACTION */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-800">
                      1️⃣ &quot;{modalData.element?.replace('Button', '').toUpperCase()}&quot; BUTTON ACTION
                    </h3>
                    
                    {/* Delete Button Specific */}
                    {modalData.element === 'DeleteButton' && (
                      <div className="space-y-4">
                        <div className="bg-red-50 p-4 rounded border border-red-200">
                          <div className="font-semibold text-red-800 mb-2">Delete what from where?</div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">What to delete:</label>
                              <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                  <input type="radio" name="deleteWhat" className="radio radio-sm" />
                                  <span>Single checklist item</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="radio" name="deleteWhat" className="radio radio-sm" />
                                  <span>Multiple selected items</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="radio" name="deleteWhat" className="radio radio-sm" />
                                  <span>User assignment</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="radio" name="deleteWhat" className="radio radio-sm" />
                                  <span>Entire checklist</span>
                                </label>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Delete type:</label>
                              <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                  <input type="checkbox" className="checkbox checkbox-sm" defaultChecked />
                                  <span>Soft delete (mark as deleted)</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="checkbox" className="checkbox checkbox-sm" />
                                  <span>Hard delete (remove completely)</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="checkbox" className="checkbox checkbox-sm" />
                                  <span>Archive instead of delete</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="checkbox" className="checkbox checkbox-sm" />
                                  <span>Move to trash folder</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Edit Button Specific */}
                    {modalData.element === 'EditButton' && (
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded border border-blue-200">
                          <div className="font-semibold text-blue-800 mb-2">Edit what and how?</div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium mb-2">What can be edited:</label>
                              <div className="grid grid-cols-2 gap-2">
                                <label className="flex items-center gap-2">
                                  <input type="checkbox" className="checkbox checkbox-sm" />
                                  <span>Title/Name</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="checkbox" className="checkbox checkbox-sm" />
                                  <span>Description</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="checkbox" className="checkbox checkbox-sm" />
                                  <span>Due Date</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="checkbox" className="checkbox checkbox-sm" />
                                  <span>Status</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="checkbox" className="checkbox checkbox-sm" />
                                  <span>Assigned Users</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="checkbox" className="checkbox checkbox-sm" />
                                  <span>Priority Level</span>
                                </label>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Edit method:</label>
                              <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                  <input type="radio" name="editMethod" className="radio radio-sm" defaultChecked />
                                  <span>Open modal dialog</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="radio" name="editMethod" className="radio radio-sm" />
                                  <span>Inline editing</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="radio" name="editMethod" className="radio radio-sm" />
                                  <span>Navigate to edit page</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Unknown/New Button */}
                    {!['DeleteButton', 'EditButton'].includes(modalData.element) && (
                      <div className="space-y-4">
                        <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                          <div className="font-semibold text-yellow-800 mb-2">
                            New button type: &quot;{modalData.element}&quot; - Let&apos;s describe it!
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              What does this &quot;{modalData.element?.replace('Button', '')}&quot; button do?
                            </label>
                            <textarea 
                              className="textarea textarea-bordered w-full h-20" 
                              placeholder="Describe what happens when user clicks this button..."
                              value={buttonDescription}
                              onChange={(e) => setButtonDescription(e.target.value)}
                            />
                          </div>
                          <div className="mt-3">
                            <button className="btn btn-sm btn-warning">
                              💾 Save Description for Future Use
                            </button>
                            <div className="text-xs text-yellow-600 mt-1">
                              This will be remembered for other &quot;{modalData.element?.replace('Button', '')}&quot; buttons
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* STEP 2: DATABASE & TABLES */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-800">
                      2️⃣ WHICH TABLE DOES THIS AFFECT?
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <button 
                          className="p-4 border-2 border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 text-left"
                          onClick={() => setShowTableData('checklists')}
                        >
                          <div className="font-bold text-blue-800">checklists</div>
                          <div className="text-xs text-blue-600">Main checklist data</div>
                        </button>
                        <button 
                          className="p-4 border-2 border-yellow-300 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-left"
                          onClick={() => setShowTableData('assignments')}
                        >
                          <div className="font-bold text-yellow-800">assignments</div>
                          <div className="text-xs text-yellow-600">User assignments</div>
                        </button>
                        <button 
                          className="p-4 border-2 border-green-300 rounded-lg bg-green-50 hover:bg-green-100 text-left"
                          onClick={() => setShowTableData('audit_logs')}
                        >
                          <div className="font-bold text-green-800">audit_logs</div>
                          <div className="text-xs text-green-600">Activity tracking</div>
                        </button>
                      </div>
                      {showTableData && (
                        <div className="bg-white p-4 rounded border-2 border-gray-200">
                          <div className="font-bold mb-2">Selected: {showTableData}</div>
                          <div className="text-sm text-gray-600">
                            This will affect the <code className="bg-gray-100 px-1">{showTableData}</code> table
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* STEP 3: BUSINESS RULES */}
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-800">
                      3️⃣ BUSINESS RULES & SIDE EFFECTS
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What else needs to happen? (Check all that apply)
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                            <span>Send notification email</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                            <span>Create audit log entry</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                            <span>Update related records</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                            <span>Check user permissions</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                            <span>Validate data before action</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                            <span>Return success/error message</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional business rules:
                        </label>
                        <textarea 
                          className="textarea textarea-bordered w-full h-16" 
                          placeholder="e.g., Only managers can delete items, Must check if item is not locked, etc."
                        />
                      </div>
                    </div>
                  </div>

                  {/* STEP 4: GENERATE CLAUDE INSTRUCTIONS */}
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-800">
                      4️⃣ CLAUDE INSTRUCTIONS
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded border">
                        <div className="text-sm font-medium text-gray-700 mb-2">Generated instruction for Claude:</div>
                        <div className="bg-gray-50 p-4 rounded font-mono text-sm">
                          &quot;Create a {modalData.element === 'DeleteButton' ? 'DELETE' : 'POST'} API endpoint: <br/>
                          - Action: {modalData.element === 'DeleteButton' ? 'Soft delete' : 'Update'} record in {showTableData || 'checklists'} table <br/>
                          - Business Logic: {buttonDescription || 'User-defined business action'} <br/>
                          - Include: Permission checks, audit logging, error handling <br/>
                          - Return: JSON success/error response&quot;
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button 
                          className="btn btn-primary flex-1"
                          onClick={handleSendToClaude}
                        >
                          🤖 Send to Claude & Generate API
                        </button>
                        <button className="btn btn-outline flex-1">
                          📋 Copy Instructions
                        </button>
                        <button className="btn btn-outline flex-1">
                          📝 Edit Instructions
                        </button>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded">
                        <div className="text-sm text-blue-800">
                          <strong>Next:</strong> Claude will generate the complete API endpoint with all business logic, 
                          error handling, and tests based on your specifications above.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {/* Code Tab Content */}
                {activeTab === 'code' && (
                <div className="p-6 space-y-4">
                  {codeGenerationRequests.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-6xl mb-4">🤖</div>
                      <h3 className="text-xl font-semibold mb-2">No Code Generated Yet</h3>
                      <p>Click &quot;Send to Claude &amp; Generate API&quot; on the Quick Actions tab to generate code</p>
                    </div>
                  ) : (
                    codeGenerationRequests.map((request) => (
                      <div key={request.id} className={`border-2 rounded-lg overflow-hidden ${
                        request.status === 'live' ? 'border-green-500 bg-green-50' :
                        request.status === 'failed' ? 'border-red-500 bg-red-50' :
                        request.status === 'ready_to_push' ? 'border-orange-500 bg-orange-50' :
                        'border-purple-500 bg-purple-50'
                      }`}>
                        {/* Accordion Header */}
                        <div 
                          className={`p-4 cursor-pointer transition-colors ${
                            request.status === 'live' ? 'bg-green-100 hover:bg-green-200' :
                            request.status === 'failed' ? 'bg-red-100 hover:bg-red-200' :
                            request.status === 'ready_to_push' ? 'bg-orange-100 hover:bg-orange-200' :
                            'bg-purple-100 hover:bg-purple-200'
                          }`}
                          onClick={() => {
                            setCodeGenerationRequests(prev => 
                              prev.map(req => req.id === request.id 
                                ? { ...req, expanded: !req.expanded }
                                : req
                              )
                            );
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <span className={`w-3 h-3 rounded-full ${
                                request.status === 'live' ? 'bg-green-500' :
                                request.status === 'failed' ? 'bg-red-500' :
                                request.status === 'ready_to_push' ? 'bg-orange-500' :
                                'bg-purple-500'
                              }`}></span>
                              <div>
                                <h3 className="font-bold text-lg">
                                  {request.status === 'live' ? '🟢 Live' :
                                   request.status === 'failed' ? '🔴 Failed' :
                                   request.status === 'ready_to_push' ? '🟠 Ready to Push' :
                                   '🟣 Deprecated'} - API Generation
                                </h3>
                                <p className="text-sm text-gray-600">
                                  Generated: {new Date(request.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <select 
                                className="select select-sm"
                                value={request.status}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  setCodeGenerationRequests(prev => 
                                    prev.map(req => req.id === request.id 
                                      ? { ...req, status: e.target.value as 'live' | 'failed' | 'ready_to_push' }
                                      : req
                                    )
                                  );
                                }}
                              >
                                <option value="live">🟢 Live</option>
                                <option value="failed">🔴 Failed</option>
                                <option value="ready_to_push">🟠 Ready to Push</option>
                                <option value="deprecated">🟣 Deprecated</option>
                              </select>
                              <span className="text-2xl">
                                {request.expanded ? '▼' : '▶'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Accordion Content */}
                        {request.expanded && (
                          <div className="p-6 space-y-6 bg-white">
                            {/* 1. Instruction Section */}
                            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                              <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                                📋 Claude Instruction
                              </h4>
                              <pre className="text-sm bg-white p-3 rounded border font-mono whitespace-pre-wrap">
                                {request.instruction}
                              </pre>
                            </div>

                            {/* 2. Generated Code Section */}
                            <div className="space-y-4">
                              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                💻 Generated Code
                              </h4>
                              
                              {/* Backend Code */}
                              <div className="border border-gray-200 rounded-lg">
                                <div className="bg-gray-100 px-4 py-2 font-semibold text-sm">
                                  Backend API Route
                                </div>
                                <textarea 
                                  className="textarea w-full font-mono text-xs border-0 rounded-t-none"
                                  rows={12}
                                  value={request.backendCode}
                                  onChange={(e) => {
                                    setCodeGenerationRequests(prev => 
                                      prev.map(req => req.id === request.id 
                                        ? { ...req, backendCode: e.target.value }
                                        : req
                                      )
                                    );
                                  }}
                                />
                              </div>

                              {/* Frontend Code */}
                              <div className="border border-gray-200 rounded-lg">
                                <div className="bg-gray-100 px-4 py-2 font-semibold text-sm">
                                  Frontend Handler
                                </div>
                                <textarea 
                                  className="textarea w-full font-mono text-xs border-0 rounded-t-none"
                                  rows={8}
                                  value={request.frontendCode}
                                  onChange={(e) => {
                                    setCodeGenerationRequests(prev => 
                                      prev.map(req => req.id === request.id 
                                        ? { ...req, frontendCode: e.target.value }
                                        : req
                                      )
                                    );
                                  }}
                                />
                              </div>
                            </div>

                            {/* 3. Test Section */}
                            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                              <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                                🧪 Testing & Validation
                              </h4>
                              
                              {/* Test Code */}
                              <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Test Suite:</label>
                                <textarea 
                                  className="textarea textarea-bordered w-full font-mono text-xs"
                                  rows={8}
                                  value={request.testCode}
                                  onChange={(e) => {
                                    setCodeGenerationRequests(prev => 
                                      prev.map(req => req.id === request.id 
                                        ? { ...req, testCode: e.target.value }
                                        : req
                                      )
                                    );
                                  }}
                                />
                              </div>

                              {/* Interactive Test Actions */}
                              <div className="grid grid-cols-3 gap-3">
                                <button className="btn btn-sm btn-success">▶ Run Tests</button>
                                <button className="btn btn-sm btn-warning">🔍 Validate Syntax</button>
                                <button className="btn btn-sm btn-info">🛡️ Security Check</button>
                                <button className="btn btn-sm btn-error">🚨 Error Scenarios</button>
                                <button className="btn btn-sm btn-outline">📊 Performance Test</button>
                                <button className="btn btn-sm btn-outline">🔄 Regenerate Tests</button>
                              </div>
                              
                              {/* Test Results Area */}
                              <div className="mt-4 p-3 bg-gray-900 text-green-400 rounded font-mono text-xs">
                                <div>$ Running tests...</div>
                                <div>✓ Permission validation test passed</div>
                                <div>✓ Success response test passed</div>
                                <div>✓ Error handling test passed</div>
                                <div className="mt-2 text-white">Tests: 3 passed, 0 failed</div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                              <button className="btn btn-primary flex-1">🚀 Deploy to Production</button>
                              <button className="btn btn-outline flex-1">📝 Save Changes</button>
                              <button className="btn btn-error">🗑️ Delete</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
                )}

                {/* History Tab Content */}
                {activeTab === 'history' && (
                <div className="p-6 space-y-6">
                  <div className="max-h-[600px] overflow-y-auto pr-2">
                  {historyDrilldown ? (
                    /* Drilldown View */
                    <div className="space-y-4">
                      {/* Back Button */}
                      <button 
                        className="btn btn-ghost btn-sm gap-2"
                        onClick={() => setHistoryDrilldown(null)}
                      >
                        ← Back to History
                      </button>
                      
                      {/* Drilldown Content */}
                      <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                        <h3 className="font-bold text-xl mb-4 text-blue-800">
                          Change Details - {historyDrilldown}
                        </h3>
                        
                        {historyDrilldown === 'CHG_001' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-2">Change Information</h4>
                                <div className="bg-white p-4 rounded border space-y-2">
                                  <div><strong>Change ID:</strong> CHG_001</div>
                                  <div><strong>Type:</strong> Permission Update</div>
                                  <div><strong>Priority:</strong> High</div>
                                  <div><strong>Status:</strong> Completed</div>
                                  <div><strong>Requested by:</strong> sarah.manager@company.com</div>
                                  <div><strong>Approved by:</strong> admin@company.com</div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Technical Details</h4>
                                <div className="bg-white p-4 rounded border space-y-2">
                                  <div><strong>Git Commit:</strong> abc123f</div>
                                  <div><strong>Files Changed:</strong> 3</div>
                                  <div><strong>Lines Added:</strong> +45</div>
                                  <div><strong>Lines Removed:</strong> -12</div>
                                  <div><strong>Deployment:</strong> PROD-2024-01-15</div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Change Description</h4>
                              <div className="bg-white p-4 rounded border">
                                <p className="mb-3">Updated delete button permissions to allow managers and above to delete checklist items, previously restricted to admin only.</p>
                                <p className="mb-3"><strong>Business Justification:</strong> Team leads need ability to clean up completed/invalid items without requiring admin intervention.</p>
                                <p><strong>Risk Assessment:</strong> Low - soft delete with audit trail maintained.</p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Files Modified</h4>
                              <div className="bg-white rounded border overflow-hidden">
                                <table className="table table-sm w-full">
                                  <thead>
                                    <tr className="bg-gray-50">
                                      <th>File</th>
                                      <th>Type</th>
                                      <th>Changes</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="font-mono text-xs">/api/checklist/delete.ts</td>
                                      <td><span className="badge badge-primary">Backend</span></td>
                                      <td>+32 -8</td>
                                    </tr>
                                    <tr>
                                      <td className="font-mono text-xs">/components/ChecklistItem.tsx</td>
                                      <td><span className="badge badge-info">Frontend</span></td>
                                      <td>+8 -3</td>
                                    </tr>
                                    <tr>
                                      <td className="font-mono text-xs">/lib/permissions.ts</td>
                                      <td><span className="badge badge-warning">Utils</span></td>
                                      <td>+5 -1</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Test Results</h4>
                              <div className="bg-white p-4 rounded border">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-green-600">✅</span>
                                  <span>Unit Tests: 24/24 passed</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-green-600">✅</span>
                                  <span>Integration Tests: 8/8 passed</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-green-600">✅</span>
                                  <span>Security Scan: No vulnerabilities</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-green-600">✅</span>
                                  <span>Performance: No regression</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {historyDrilldown === 'SUB_001' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-2">Submission Details</h4>
                                <div className="bg-white p-4 rounded border space-y-2">
                                  <div><strong>Submission ID:</strong> SUB_001</div>
                                  <div><strong>Element:</strong> Delete Button (CHK_LOC1_B_D_ITM_001)</div>
                                  <div><strong>Submitted by:</strong> john.developer@company.com</div>
                                  <div><strong>Date:</strong> 2024-01-20 15:45:00</div>
                                  <div><strong>Status:</strong> Deployed to Production</div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Code Metrics</h4>
                                <div className="bg-white p-4 rounded border space-y-2">
                                  <div><strong>Complexity Score:</strong> 3.2/10</div>
                                  <div><strong>Test Coverage:</strong> 94%</div>
                                  <div><strong>Performance:</strong> 23ms avg</div>
                                  <div><strong>Security Score:</strong> A+</div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Code Diff</h4>
                              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto">
                                <div className="text-gray-400">+ Added permission check for manager role</div>
                                <div className="text-green-400">+ if (!hasPermission(user, &apos;manager|admin&apos;)) {`{`}</div>
                                <div className="text-green-400">+   return Response.json({`{ error: &apos;Access denied&apos; }`}, {`{ status: 403 }`});</div>
                                <div className="text-green-400">+ {`}`}</div>
                                <div className="text-gray-400 mt-2">+ Enhanced audit logging</div>
                                <div className="text-green-400">+ await logAction(user.id, &apos;DELETE_ITEM&apos;, {`{ itemId, reason }`});</div>
                                <div className="text-red-400 mt-2">- // TODO: Add proper permission check</div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Deployment History</h4>
                              <div className="bg-white rounded border overflow-hidden">
                                <table className="table table-sm w-full">
                                  <thead>
                                    <tr className="bg-gray-50">
                                      <th>Environment</th>
                                      <th>Date</th>
                                      <th>Status</th>
                                      <th>Deploy Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td><span className="badge badge-info">DEV</span></td>
                                      <td>2024-01-20 16:00</td>
                                      <td><span className="text-green-600">✅ Success</span></td>
                                      <td>2.3s</td>
                                    </tr>
                                    <tr>
                                      <td><span className="badge badge-warning">STAGING</span></td>
                                      <td>2024-01-21 10:30</td>
                                      <td><span className="text-green-600">✅ Success</span></td>
                                      <td>3.1s</td>
                                    </tr>
                                    <tr>
                                      <td><span className="badge badge-error">PROD</span></td>
                                      <td>2024-01-22 14:15</td>
                                      <td><span className="text-green-600">✅ Success</span></td>
                                      <td>4.2s</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Main History View */
                    <div className="space-y-6">
                      {/* Page Changes Table */}
                      <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                        <div className="bg-gray-100 px-6 py-4 border-b">
                          <h3 className="font-bold text-lg text-gray-800">📋 Page Changes & Additions</h3>
                          <p className="text-sm text-gray-600 mt-1">Track all modifications to LOCI elements on this page</p>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="table w-full">
                            <thead>
                              <tr className="bg-gray-50">
                                <th>Change ID</th>
                                <th>Element</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="hover:bg-gray-50">
                                <td className="font-mono text-sm">CHG_001</td>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    <span className="font-mono text-xs">ITM_001</span>
                                  </div>
                                </td>
                                <td><span className="badge badge-primary">Permission</span></td>
                                <td>Updated delete permissions for managers</td>
                                <td>sarah.manager</td>
                                <td>2024-01-15 14:30</td>
                                <td><span className="badge badge-success">Deployed</span></td>
                                <td>
                                  <button 
                                    className="btn btn-xs btn-ghost"
                                    onClick={() => setHistoryDrilldown('CHG_001')}
                                  >
                                    View Details →
                                  </button>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="font-mono text-sm">CHG_002</td>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span className="font-mono text-xs">ITM_002</span>
                                  </div>
                                </td>
                                <td><span className="badge badge-secondary">UI</span></td>
                                <td>Added confirmation dialog for delete action</td>
                                <td>john.developer</td>
                                <td>2024-01-18 09:15</td>
                                <td><span className="badge badge-success">Deployed</span></td>
                                <td>
                                  <button className="btn btn-xs btn-ghost">View Details →</button>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="font-mono text-sm">CHG_003</td>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="font-mono text-xs">EML_004</span>
                                  </div>
                                </td>
                                <td><span className="badge badge-info">Validation</span></td>
                                <td>Enhanced email format validation</td>
                                <td>jane.qa</td>
                                <td>2024-01-20 11:22</td>
                                <td><span className="badge badge-warning">Testing</span></td>
                                <td>
                                  <button className="btn btn-xs btn-ghost">View Details →</button>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="font-mono text-sm">CHG_004</td>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span className="font-mono text-xs">STS_006</span>
                                  </div>
                                </td>
                                <td><span className="badge badge-warning">Business</span></td>
                                <td>Added new status options for workflow</td>
                                <td>mark.business</td>
                                <td>2024-01-22 16:45</td>
                                <td><span className="badge badge-error">Failed</span></td>
                                <td>
                                  <button className="btn btn-xs btn-ghost">View Details →</button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Submissions History */}
                      <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                        <div className="bg-gray-100 px-6 py-4 border-b">
                          <h3 className="font-bold text-lg text-gray-800">🚀 Submissions & Code History</h3>
                          <p className="text-sm text-gray-600 mt-1">Track all code submissions and deployments for LOCI elements</p>
                        </div>
                        <div className="p-6 space-y-4">
                          {/* Submission Entry */}
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-3">
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                <div>
                                  <h4 className="font-semibold text-green-800">Delete API Implementation</h4>
                                  <p className="text-sm text-green-600">CHK_LOC1_B_D_ITM_001 - Production Deployment</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600">2024-01-20 15:45</div>
                                <div className="text-xs text-gray-500">by john.developer</div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex gap-2">
                                <span className="badge badge-success">Live</span>
                                <span className="badge badge-outline">v1.2.3</span>
                                <span className="text-xs text-gray-500">Git: abc123f</span>
                              </div>
                              <button 
                                className="btn btn-xs btn-primary"
                                onClick={() => setHistoryDrilldown('SUB_001')}
                              >
                                View Code & Deployment →
                              </button>
                            </div>
                          </div>

                          {/* Submission Entry */}
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-3">
                                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                                <div>
                                  <h4 className="font-semibold text-orange-800">Edit Modal Enhancement</h4>
                                  <p className="text-sm text-orange-600">CHK_LOC1_B_E_ITM_002 - Staging Ready</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600">2024-01-22 09:30</div>
                                <div className="text-xs text-gray-500">by sarah.frontend</div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex gap-2">
                                <span className="badge badge-warning">Ready to Push</span>
                                <span className="badge badge-outline">v1.3.0-rc1</span>
                                <span className="text-xs text-gray-500">Git: def456g</span>
                              </div>
                              <button className="btn btn-xs btn-warning">View Code & Deployment →</button>
                            </div>
                          </div>

                          {/* Submission Entry */}
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-3">
                                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                <div>
                                  <h4 className="font-semibold text-red-800">User Creation API</h4>
                                  <p className="text-sm text-red-600">USR_LOC1_I_V_EML_004 - Failed Validation</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600">2024-01-21 14:15</div>
                                <div className="text-xs text-gray-500">by mike.backend</div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex gap-2">
                                <span className="badge badge-error">Failed</span>
                                <span className="badge badge-outline">v1.2.4-failed</span>
                                <span className="text-xs text-gray-500">Git: ghi789h</span>
                              </div>
                              <button className="btn btn-xs btn-error">View Code & Deployment →</button>
                            </div>
                          </div>

                          {/* Submission Entry */}
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-3">
                                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                                <div>
                                  <h4 className="font-semibold text-purple-800">Legacy Status API</h4>
                                  <p className="text-sm text-purple-600">CHK_LOC1_D_F_STS_006 - Deprecated</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600">2024-01-10 08:20</div>
                                <div className="text-xs text-gray-500">by old.developer</div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex gap-2">
                                <span className="badge badge-secondary">Deprecated</span>
                                <span className="badge badge-outline">v1.0.8</span>
                                <span className="text-xs text-gray-500">Git: jkl012i</span>
                              </div>
                              <button className="btn btn-xs btn-ghost">View Code & Deployment →</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                </div>
                )}

                {/* Permissions & Security Tab Content */}
                {activeTab === 'permissions' && (
                <div className="p-6 space-y-6">
                  <div className="max-h-[600px] overflow-y-auto pr-2">
                  {/* Add Permission Section */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="font-bold text-lg mb-4 text-blue-800 flex items-center gap-2">
                      ➕ Add Permission
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Role to Grant Access:
                        </label>
                        <select 
                          className="select select-bordered w-full"
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                        >
                          <option disabled value="">Choose a role...</option>
                          <option value="admin">Admin - Full system access</option>
                          <option value="manager">Manager - Team management + operations</option>
                          <option value="supervisor">Supervisor - Department oversight</option>
                          <option value="team_lead">Team Lead - Team coordination</option>
                          <option value="senior_user">Senior User - Advanced features</option>
                          <option value="user">User - Standard access</option>
                          <option value="readonly">Read-Only - View only access</option>
                          <option value="guest">Guest - Limited temporary access</option>
                        </select>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          className="btn btn-primary flex-1"
                          disabled={!selectedRole}
                          onClick={() => {
                            if (selectedRole && !addedPermissions.includes(selectedRole)) {
                              setAddedPermissions([...addedPermissions, selectedRole]);
                              setSelectedRole('');
                            }
                          }}
                        >
                          ✅ Grant Permission
                        </button>
                        <button className="btn btn-outline flex-1">📋 Preview Changes</button>
                      </div>
                      
                      {/* Added Permissions List */}
                      {addedPermissions.length > 0 && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Granted Permissions:
                          </label>
                          <div className="space-y-2">
                            {addedPermissions.map((role, index) => (
                              <div key={index} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-green-600">✅</span>
                                  <span className="font-medium capitalize">{role.replace('_', ' ')}</span>
                                  <span className="text-sm text-gray-600">
                                    - {role === 'admin' ? 'Full system access' :
                                       role === 'manager' ? 'Team management + operations' :
                                       role === 'supervisor' ? 'Department oversight' :
                                       role === 'team_lead' ? 'Team coordination' :
                                       role === 'senior_user' ? 'Advanced features' :
                                       role === 'user' ? 'Standard access' :
                                       role === 'readonly' ? 'View only access' :
                                       'Limited temporary access'}
                                  </span>
                                </div>
                                <button 
                                  className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
                                  onClick={() => {
                                    setAddedPermissions(addedPermissions.filter((_, i) => i !== index));
                                  }}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Business Request Panel */}
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-5">
                    <h3 className="font-bold text-lg mb-4 text-orange-800 flex items-center gap-2">
                      🎯 Request Permission Implementation
                    </h3>
                    <p className="text-orange-700 mb-4 text-sm">
                      Create a task for developers to implement this permission requirement
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business Requirement:
                        </label>
                        <textarea 
                          className="textarea textarea-bordered w-full h-20" 
                          placeholder="e.g., Only managers and above should be able to delete checklist items to prevent accidental data loss..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Implementation Notes:
                        </label>
                        <textarea 
                          className="textarea textarea-bordered w-full h-16" 
                          placeholder="e.g., Add role check in API endpoint, update frontend to hide button for unauthorized users..."
                        />
                      </div>
                      <div className="flex gap-3">
                        <button className="btn btn-warning flex-1">
                          🚀 Create Dev Task (P = Orange)
                        </button>
                        <button className="btn btn-outline flex-1">📝 Save Draft</button>
                      </div>
                    </div>
                  </div>

                  {/* Current Permission Status */}
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
                    <h3 className="font-bold text-lg mb-4 text-red-800 flex items-center gap-2">
                      🚫 Current Permission Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Required Permission:</span>
                        <code className="bg-red-100 text-red-800 px-2 py-1 rounded">manager+</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Current User:</span>
                        <span className="text-red-600 font-semibold">
                          user - ❌ Access Denied
                        </span>
                      </div>
                    </div>
                  </div>
                  </div>

                </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}