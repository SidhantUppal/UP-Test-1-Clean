"use client";

import { useState } from 'react';
import { LOCIButton } from '@/components/LOCI/LOCIButton';

// Mock data structure matching our Azure schema
interface TenantServicePermission {
  tenantId: number;
  serviceName: string;
  isEnabled: boolean;
}

interface TenantPagePermission {
  tenantId: number;
  tenantRoleId: number;
  roleName: string;
  pageRoute: string;
  accessLevel: 'view' | 'edit' | 'admin';
  isGranted: boolean;
}

interface TenantElementPermission {
  tenantId: number;
  tenantRoleId: number;
  roleName: string;
  elementPattern: string;
  permissionType: 'view' | 'edit' | 'hide';
  isGranted: boolean;
}

// User management interface for tenant admins
interface TenantUser {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  tenantRoleId: number;
  roleName: string;
  createdDate: string;
  lastLogin: string;
}

export default function PermissionsPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'services' | 'pages' | 'elements'>('users');
  const [selectedTenant, setSelectedTenant] = useState(1);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  
  // Mock user data for the current tenant
  const [tenantUsers, setTenantUsers] = useState<TenantUser[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@democorp.com',
      status: 'active',
      tenantRoleId: 1,
      roleName: 'Admin',
      createdDate: '2024-01-15',
      lastLogin: '2024-07-04 09:30'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@democorp.com',
      status: 'active',
      tenantRoleId: 2,
      roleName: 'Manager',
      createdDate: '2024-02-01',
      lastLogin: '2024-07-04 08:15'
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@democorp.com',
      status: 'active',
      tenantRoleId: 3,
      roleName: 'User',
      createdDate: '2024-03-10',
      lastLogin: '2024-07-03 16:45'
    },
    {
      id: 4,
      name: 'Lisa Chen',
      email: 'lisa.chen@democorp.com',
      status: 'pending',
      tenantRoleId: 3,
      roleName: 'User',
      createdDate: '2024-07-01',
      lastLogin: 'Never'
    },
    {
      id: 5,
      name: 'Tom Wilson',
      email: 'tom.wilson@democorp.com',
      status: 'inactive',
      tenantRoleId: 2,
      roleName: 'Manager',
      createdDate: '2024-01-20',
      lastLogin: '2024-06-15 14:20'
    }
  ]);
  
  // Mock data - in real implementation, these would come from Azure DB
  const [servicePermissions, setServicePermissions] = useState<TenantServicePermission[]>([
    { tenantId: 1, serviceName: 'users-service', isEnabled: true },
    { tenantId: 1, serviceName: 'contractors-service', isEnabled: true },
    { tenantId: 1, serviceName: 'documents-service', isEnabled: false },
    { tenantId: 1, serviceName: 'permits-service', isEnabled: true },
    { tenantId: 1, serviceName: 'tasks-service', isEnabled: true },
    { tenantId: 1, serviceName: 'checklists-service', isEnabled: false },
  ]);

  const [pagePermissions, setPagePermissions] = useState<TenantPagePermission[]>([
    { tenantId: 1, tenantRoleId: 1, roleName: 'Admin', pageRoute: 'users/list', accessLevel: 'admin', isGranted: true },
    { tenantId: 1, tenantRoleId: 1, roleName: 'Admin', pageRoute: 'users/create', accessLevel: 'admin', isGranted: true },
    { tenantId: 1, tenantRoleId: 1, roleName: 'Admin', pageRoute: 'contractors/list', accessLevel: 'admin', isGranted: true },
    { tenantId: 1, tenantRoleId: 2, roleName: 'Manager', pageRoute: 'users/list', accessLevel: 'view', isGranted: true },
    { tenantId: 1, tenantRoleId: 2, roleName: 'Manager', pageRoute: 'users/create', accessLevel: 'edit', isGranted: false },
    { tenantId: 1, tenantRoleId: 3, roleName: 'User', pageRoute: 'users/list', accessLevel: 'view', isGranted: true },
  ]);

  const [elementPermissions, setElementPermissions] = useState<TenantElementPermission[]>([
    { tenantId: 1, tenantRoleId: 1, roleName: 'Admin', elementPattern: 'USR_*_V_*', permissionType: 'view', isGranted: true },
    { tenantId: 1, tenantRoleId: 1, roleName: 'Admin', elementPattern: 'USR_*_B_E_*', permissionType: 'edit', isGranted: true },
    { tenantId: 1, tenantRoleId: 1, roleName: 'Admin', elementPattern: 'USR_*_B_D_*', permissionType: 'edit', isGranted: true },
    { tenantId: 1, tenantRoleId: 2, roleName: 'Manager', elementPattern: 'USR_*_V_*', permissionType: 'view', isGranted: true },
    { tenantId: 1, tenantRoleId: 2, roleName: 'Manager', elementPattern: 'USR_*_B_E_*', permissionType: 'edit', isGranted: true },
    { tenantId: 1, tenantRoleId: 2, roleName: 'Manager', elementPattern: 'USR_*_B_D_*', permissionType: 'hide', isGranted: true },
    { tenantId: 1, tenantRoleId: 3, roleName: 'User', elementPattern: 'USR_*_V_*', permissionType: 'view', isGranted: true },
    { tenantId: 1, tenantRoleId: 3, roleName: 'User', elementPattern: 'USR_*_B_E_*', permissionType: 'hide', isGranted: true },
  ]);

  const tenantRoles = [
    { id: 1, name: 'Admin', displayName: 'Administrator' },
    { id: 2, name: 'Manager', displayName: 'Manager' },
    { id: 3, name: 'User', displayName: 'Standard User' },
  ];

  const availableServices = [
    'users-service', 'contractors-service', 'documents-service', 
    'permits-service', 'tasks-service', 'checklists-service'
  ];

  // Available options for adding new permissions (currently unused but ready for future)
  // const availablePages = [
  //   'users/list', 'users/create', 'users/edit', 'users/delete',
  //   'contractors/list', 'contractors/create', 'contractors/edit',
  //   'documents/list', 'documents/upload', 'permits/list', 'permits/create',
  //   'tasks/list', 'tasks/create', 'checklists/list', 'checklists/create'
  // ];

  // const availableElementPatterns = [
  //   'USR_*_V_*',      // View all user elements
  //   'USR_*_B_E_*',    // Edit buttons in user pages
  //   'USR_*_B_D_*',    // Delete buttons in user pages
  //   'USR_*_I_*',      // Input fields in user pages
  //   'CNT_*_V_*',      // View all contractor elements
  //   'CNT_*_B_*',      // All contractor buttons
  //   'DOC_*_V_*',      // View all document elements
  //   'PRM_*_V_*',      // View all permit elements
  //   'TSK_*_V_*',      // View all task elements
  //   'CHK_*_V_*',      // View all checklist elements
  // ];

  const toggleServicePermission = (serviceName: string) => {
    setServicePermissions(prev => 
      prev.map(perm => 
        perm.serviceName === serviceName && perm.tenantId === selectedTenant
          ? { ...perm, isEnabled: !perm.isEnabled }
          : perm
      )
    );
  };

  const togglePagePermission = (roleId: number, pageRoute: string) => {
    setPagePermissions(prev => 
      prev.map(perm => 
        perm.tenantRoleId === roleId && perm.pageRoute === pageRoute && perm.tenantId === selectedTenant
          ? { ...perm, isGranted: !perm.isGranted }
          : perm
      )
    );
  };

  const toggleElementPermission = (roleId: number, elementPattern: string) => {
    setElementPermissions(prev => 
      prev.map(perm => 
        perm.tenantRoleId === roleId && perm.elementPattern === elementPattern && perm.tenantId === selectedTenant
          ? { ...perm, isGranted: !perm.isGranted }
          : perm
      )
    );
  };

  // Functions for adding new permissions (ready for future modal implementations)
  // const addNewPagePermission = (roleId: number, pageRoute: string, accessLevel: 'view' | 'edit' | 'admin') => {
  //   const role = tenantRoles.find(r => r.id === roleId);
  //   if (!role) return;

  //   const newPermission: TenantPagePermission = {
  //     tenantId: selectedTenant,
  //     tenantRoleId: roleId,
  //     roleName: role.name,
  //     pageRoute,
  //     accessLevel,
  //     isGranted: true
  //   };

  //   setPagePermissions(prev => [...prev, newPermission]);
  // };

  // const addNewElementPermission = (roleId: number, elementPattern: string, permissionType: 'view' | 'edit' | 'hide') => {
  //   const role = tenantRoles.find(r => r.id === roleId);
  //   if (!role) return;

  //   const newPermission: TenantElementPermission = {
  //     tenantId: selectedTenant,
  //     tenantRoleId: roleId,
  //     roleName: role.name,
  //     elementPattern,
  //     permissionType,
  //     isGranted: true
  //   };

  //   setElementPermissions(prev => [...prev, newPermission]);
  // };

  // User management helper functions
  const getUserStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'pending': return 'text-warning';
      case 'inactive': return 'text-error';
      default: return 'text-base-content';
    }
  };

  const toggleUserStatus = (userId: number) => {
    setTenantUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const changeUserRole = (userId: number, newRoleId: number) => {
    const role = tenantRoles.find(r => r.id === newRoleId);
    if (!role) return;
    
    setTenantUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, tenantRoleId: newRoleId, roleName: role.name }
        : user
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Organisation Permission Management</h1>
          <p className="text-base-content opacity-70">Manage users and 3-layer permissions within your organisation</p>
        </div>
        <LOCIButton elementId="PRM_MNG_B_S_SAV_001" className="btn btn-primary">
          Save All Changes
        </LOCIButton>
      </div>

      {/* Tenant Selector */}
      <div className="mb-6 p-4 bg-base-200 rounded-lg">
        <label className="label">
          <span className="label-text font-semibold">Organisation/Tenant:</span>
        </label>
        <select 
          className="select select-bordered w-full max-w-xs" 
          value={selectedTenant}
          onChange={(e) => setSelectedTenant(Number(e.target.value))}
        >
          <option value={1}>Demo Organisation (ID: 1)</option>
          <option value={2}>Acme Corp (ID: 2)</option>
          <option value={3}>TechCo Ltd (ID: 3)</option>
        </select>
      </div>

      {/* Tenant Admin Tab Navigation */}
      <div className="tabs tabs-boxed mb-6">
        <a 
          className={`tab ${activeTab === 'users' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 User Management
        </a>
        <a 
          className={`tab ${activeTab === 'services' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Layer 1: Services
        </a>
        <a 
          className={`tab ${activeTab === 'pages' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('pages')}
        >
          Layer 2: Pages  
        </a>
        <a 
          className={`tab ${activeTab === 'elements' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('elements')}
        >
          Layer 3: Elements (LOCI)
        </a>
      </div>

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* User Actions */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Organisation Users</h2>
            <LOCIButton 
              elementId="USR_MNG_B_C_NEW_001" 
              className="btn btn-primary"
              onClick={() => setShowCreateUser(true)}
            >
              + Invite User
            </LOCIButton>
          </div>

          {/* User Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-primary">{tenantUsers.length}</div>
              <div className="stat-desc">In organisation</div>
            </div>
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Active Users</div>
              <div className="stat-value text-success">{tenantUsers.filter(u => u.status === 'active').length}</div>
              <div className="stat-desc">Currently active</div>
            </div>
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Pending Users</div>
              <div className="stat-value text-warning">{tenantUsers.filter(u => u.status === 'pending').length}</div>
              <div className="stat-desc">Awaiting activation</div>
            </div>
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Admins</div>
              <div className="stat-value text-accent">{tenantUsers.filter(u => u.roleName === 'Admin').length}</div>
              <div className="stat-desc">Administrator users</div>
            </div>
          </div>

          {/* User List */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Status</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Last Login</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenantUsers.map((user) => (
                      <tr key={user.id} className={selectedUser === user.id ? 'bg-base-200' : ''}>
                        <td>
                          <div>
                            <div className="font-bold">{user.name}</div>
                            <div className="text-sm opacity-50">{user.email}</div>
                          </div>
                        </td>
                        <td>
                          <div className={`font-semibold ${getUserStatusColor(user.status)}`}>
                            {user.status.toUpperCase()}
                          </div>
                        </td>
                        <td>
                          <div className="form-control">
                            <select 
                              className="select select-sm select-bordered"
                              value={user.tenantRoleId}
                              onChange={(e) => changeUserRole(user.id, Number(e.target.value))}
                            >
                              {tenantRoles.map(role => (
                                <option key={role.id} value={role.id}>{role.displayName}</option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td>
                          <div className="text-sm">{user.createdDate}</div>
                        </td>
                        <td>
                          <div className="text-sm">{user.lastLogin}</div>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <LOCIButton 
                              elementId={`USR_LST_B_V_${user.id}`} 
                              className="btn btn-sm btn-ghost"
                              onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                            >
                              👁️
                            </LOCIButton>
                            <LOCIButton 
                              elementId={`USR_LST_B_E_${user.id}`} 
                              className="btn btn-sm btn-ghost"
                            >
                              ✏️
                            </LOCIButton>
                            <LOCIButton 
                              elementId={`USR_LST_B_T_${user.id}`} 
                              className={`btn btn-sm ${user.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              {user.status === 'active' ? '⏸️' : '▶️'}
                            </LOCIButton>
                            <LOCIButton 
                              elementId={`USR_LST_B_D_${user.id}`} 
                              className="btn btn-sm btn-error"
                            >
                              🗑️
                            </LOCIButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Selected User Permissions */}
          {selectedUser && (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">
                  User Permissions: {tenantUsers.find(u => u.id === selectedUser)?.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Service Access */}
                  <div>
                    <h4 className="font-semibold mb-3">Service Access</h4>
                    <div className="space-y-2">
                      {servicePermissions
                        .filter(perm => perm.tenantId === selectedTenant && perm.isEnabled)
                        .map(service => (
                        <div key={service.serviceName} className="flex items-center justify-between p-2 bg-base-200 rounded">
                          <span className="text-sm">{service.serviceName}</span>
                          <div className="badge badge-success">Enabled</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Page Access */}
                  <div>
                    <h4 className="font-semibold mb-3">Page Access</h4>
                    <div className="space-y-2">
                      {pagePermissions
                        .filter(perm => {
                          const user = tenantUsers.find(u => u.id === selectedUser);
                          return perm.tenantId === selectedTenant && 
                                 perm.tenantRoleId === user?.tenantRoleId && 
                                 perm.isGranted;
                        })
                        .slice(0, 5)
                        .map((perm, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-base-200 rounded">
                          <span className="text-sm">{perm.pageRoute}</span>
                          <div className={`badge ${
                            perm.accessLevel === 'admin' ? 'badge-error' :
                            perm.accessLevel === 'edit' ? 'badge-warning' : 'badge-success'
                          }`}>
                            {perm.accessLevel}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Element Access */}
                  <div>
                    <h4 className="font-semibold mb-3">Element Access (LOCI)</h4>
                    <div className="space-y-2">
                      {elementPermissions
                        .filter(perm => {
                          const user = tenantUsers.find(u => u.id === selectedUser);
                          return perm.tenantId === selectedTenant && 
                                 perm.tenantRoleId === user?.tenantRoleId && 
                                 perm.isGranted;
                        })
                        .slice(0, 5)
                        .map((perm, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-base-200 rounded">
                          <span className="text-xs font-mono">{perm.elementPattern}</span>
                          <div className={`badge ${
                            perm.permissionType === 'hide' ? 'badge-error' :
                            perm.permissionType === 'edit' ? 'badge-warning' : 'badge-success'
                          }`}>
                            {perm.permissionType}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <LOCIButton elementId={`USR_PRM_B_E_${selectedUser}`} className="btn btn-primary">
                    Edit User Permissions
                  </LOCIButton>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Layer 1: Service Permissions */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Microservice Access Control</h2>
              <p className="text-sm opacity-70">Control which microservices this organisation can access</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {availableServices.map(serviceName => {
                  const permission = servicePermissions.find(p => 
                    p.serviceName === serviceName && p.tenantId === selectedTenant
                  );
                  const isEnabled = permission?.isEnabled || false;
                  
                  return (
                    <div key={serviceName} className={`card bg-base-200 border-2 ${isEnabled ? 'border-success' : 'border-error'}`}>
                      <div className="card-body p-4">
                        <h3 className="font-semibold">{serviceName}</h3>
                        <div className="form-control">
                          <label className="label cursor-pointer">
                            <span className="label-text">Enabled</span>
                            <LOCIButton elementId={`SRV_PRM_CHK_${serviceName.toUpperCase()}_001`}>
                              <input 
                                type="checkbox" 
                                className="checkbox checkbox-success" 
                                checked={isEnabled}
                                onChange={() => toggleServicePermission(serviceName)}
                              />
                            </LOCIButton>
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layer 2: Page Permissions */}
      {activeTab === 'pages' && (
        <div className="space-y-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Page/Route Access Control</h2>
              <p className="text-sm opacity-70">Control which pages/routes each role can access within enabled services</p>
              
              {/* Role Selector */}
              <div className="form-control w-full max-w-xs mb-4">
                <label className="label">
                  <span className="label-text">Filter by Role:</span>
                </label>
                <select 
                  className="select select-bordered" 
                  value={selectedRole || ''}
                  onChange={(e) => setSelectedRole(e.target.value ? Number(e.target.value) : null)}
                >
                  <option value="">All Roles</option>
                  {tenantRoles.map(role => (
                    <option key={role.id} value={role.id}>{role.displayName}</option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Page Route</th>
                      <th>Access Level</th>
                      <th>Granted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagePermissions
                      .filter(perm => 
                        perm.tenantId === selectedTenant && 
                        (selectedRole === null || perm.tenantRoleId === selectedRole)
                      )
                      .map((perm, index) => (
                      <tr key={`${perm.tenantRoleId}-${perm.pageRoute}-${index}`}>
                        <td className="font-semibold">{perm.roleName}</td>
                        <td>
                          <code className="bg-base-200 px-2 py-1 rounded">{perm.pageRoute}</code>
                        </td>
                        <td>
                          <div className={`badge ${
                            perm.accessLevel === 'admin' ? 'badge-error' :
                            perm.accessLevel === 'edit' ? 'badge-warning' : 'badge-success'
                          }`}>
                            {perm.accessLevel}
                          </div>
                        </td>
                        <td>
                          <LOCIButton elementId={`PAG_PRM_CHK_${perm.roleName.toUpperCase()}_${index}`}>
                            <input 
                              type="checkbox" 
                              className={`checkbox ${perm.isGranted ? 'checkbox-success' : 'checkbox-error'}`}
                              checked={perm.isGranted}
                              onChange={() => togglePagePermission(perm.tenantRoleId, perm.pageRoute)}
                            />
                          </LOCIButton>
                        </td>
                        <td>
                          <LOCIButton elementId={`PAG_PRM_B_E_EDT_${index}`} className="btn btn-sm btn-ghost">
                            ✏️
                          </LOCIButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layer 3: Element Permissions (LOCI Integration) */}
      {activeTab === 'elements' && (
        <div className="space-y-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">UI Element Access Control (LOCI Integration)</h2>
              <p className="text-sm opacity-70">Control visibility and interaction with specific UI elements using LOCI patterns</p>
              
              {/* Role Selector */}
              <div className="form-control w-full max-w-xs mb-4">
                <label className="label">
                  <span className="label-text">Filter by Role:</span>
                </label>
                <select 
                  className="select select-bordered" 
                  value={selectedRole || ''}
                  onChange={(e) => setSelectedRole(e.target.value ? Number(e.target.value) : null)}
                >
                  <option value="">All Roles</option>
                  {tenantRoles.map(role => (
                    <option key={role.id} value={role.id}>{role.displayName}</option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>LOCI Element Pattern</th>
                      <th>Permission Type</th>
                      <th>Granted</th>
                      <th>Preview</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {elementPermissions
                      .filter(perm => 
                        perm.tenantId === selectedTenant && 
                        (selectedRole === null || perm.tenantRoleId === selectedRole)
                      )
                      .map((perm, index) => (
                      <tr key={`${perm.tenantRoleId}-${perm.elementPattern}-${index}`}>
                        <td className="font-semibold">{perm.roleName}</td>
                        <td>
                          <code className="bg-primary text-primary-content px-2 py-1 rounded font-mono text-sm">
                            {perm.elementPattern}
                          </code>
                        </td>
                        <td>
                          <div className={`badge ${
                            perm.permissionType === 'hide' ? 'badge-error' :
                            perm.permissionType === 'edit' ? 'badge-warning' : 'badge-success'
                          }`}>
                            {perm.permissionType}
                          </div>
                        </td>
                        <td>
                          <LOCIButton elementId={`ELM_PRM_CHK_${perm.roleName.toUpperCase()}_${index}`}>
                            <input 
                              type="checkbox" 
                              className={`checkbox ${perm.isGranted ? 'checkbox-success' : 'checkbox-error'}`}
                              checked={perm.isGranted}
                              onChange={() => toggleElementPermission(perm.tenantRoleId, perm.elementPattern)}
                            />
                          </LOCIButton>
                        </td>
                        <td>
                          <div className="tooltip" data-tip={`Affects elements matching: ${perm.elementPattern}`}>
                            <div className={`w-6 h-6 rounded border-2 ${
                              perm.isGranted && perm.permissionType === 'view' ? 'bg-success border-success' :
                              perm.isGranted && perm.permissionType === 'edit' ? 'bg-warning border-warning' :
                              'bg-error border-error'
                            }`}></div>
                          </div>
                        </td>
                        <td>
                          <LOCIButton elementId={`ELM_PRM_B_E_EDT_${index}`} className="btn btn-sm btn-ghost">
                            ✏️
                          </LOCIButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pattern Explanation */}
              <div className="mt-6 p-4 bg-info bg-opacity-10 rounded-lg">
                <h3 className="font-semibold mb-2">LOCI Pattern Guide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><code>USR_*_V_*</code> - All view elements in user pages</p>
                    <p><code>USR_*_B_E_*</code> - Edit buttons in user pages</p>
                    <p><code>USR_*_B_D_*</code> - Delete buttons in user pages</p>
                  </div>
                  <div>
                    <p><code>CNT_*_*</code> - All contractor elements</p>
                    <p><code>*_LST_*</code> - All list view elements</p>
                    <p><code>*_*_I_*</code> - All input fields</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Invite New User</h3>
            <div className="py-4 space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input type="text" className="input input-bordered" placeholder="e.g., John Smith" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input type="email" className="input input-bordered" placeholder="john.smith@organisation.com" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select className="select select-bordered">
                  {tenantRoles.map(role => (
                    <option key={role.id} value={role.id}>{role.displayName}</option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Send welcome email</span> 
                  <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                </label>
              </div>
            </div>
            <div className="modal-action">
              <LOCIButton 
                elementId="USR_CRT_B_C_CNC_001" 
                className="btn"
                onClick={() => setShowCreateUser(false)}
              >
                Cancel
              </LOCIButton>
              <LOCIButton 
                elementId="USR_CRT_B_C_SAV_001" 
                className="btn btn-primary"
                onClick={() => setShowCreateUser(false)}
              >
                Send Invitation
              </LOCIButton>
            </div>
          </div>
        </div>
      )}

      {/* Mock Data Display (Development Helper) */}
      <div className="mt-8 p-4 bg-base-200 rounded-lg">
        <details className="collapse">
          <summary className="collapse-title text-sm font-medium">
            Development: Current Permission Data (Mock)
          </summary>
          <div className="collapse-content">
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify({
                tenantUsers: tenantUsers.filter(u => u.id === selectedTenant),
                servicePermissions: servicePermissions.filter(p => p.tenantId === selectedTenant),
                pagePermissions: pagePermissions.filter(p => p.tenantId === selectedTenant),
                elementPermissions: elementPermissions.filter(p => p.tenantId === selectedTenant)
              }, null, 2)}
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
}