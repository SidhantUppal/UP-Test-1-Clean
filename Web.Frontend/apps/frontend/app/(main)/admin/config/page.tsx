"use client";

import { useState } from 'react';

// Mock data interfaces for Configuration Management
interface ConfigurationItem {
  id: number;
  key: string;
  value: string;
  category: string;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'json' | 'array' | 'secret';
  environment: 'all' | 'production' | 'staging' | 'development';
  isEditable: boolean;
  isSecret: boolean;
  lastModified: string;
  modifiedBy: string;
  validationRules?: string;
  defaultValue?: string;
}

interface FeatureFlag {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  targetTenants: string[];
  conditions: string;
  createdAt: string;
  updatedAt: string;
  category: 'Feature' | 'Experiment' | 'Maintenance' | 'Beta';
}

interface ServiceSetting {
  id: number;
  service: string;
  settings: {
    name: string;
    value: any;
    type: string;
    description: string;
  }[];
  version: string;
  environment: string;
  lastSync: string;
}

interface ApiKey {
  id: number;
  name: string;
  key: string;
  service: string;
  permissions: string[];
  rateLimit: number;
  expiresAt?: string;
  createdAt: string;
  lastUsed?: string;
  status: 'Active' | 'Expired' | 'Revoked';
}

export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'features' | 'services' | 'api' | 'email' | 'integrations'>('general');
  const [selectedConfig, setSelectedConfig] = useState<number | null>(null);
  const [showAddConfig, setShowAddConfig] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock configuration items
  const [configurations, setConfigurations] = useState<ConfigurationItem[]>([
    {
      id: 1,
      key: 'app.max_upload_size',
      value: '10485760',
      category: 'Application',
      description: 'Maximum file upload size in bytes',
      type: 'number',
      environment: 'all',
      isEditable: true,
      isSecret: false,
      lastModified: '2024-07-15 10:30:00',
      modifiedBy: 'admin@system.com',
      validationRules: 'min:1048576,max:104857600',
      defaultValue: '10485760'
    },
    {
      id: 2,
      key: 'auth.session_timeout',
      value: '3600',
      category: 'Authentication',
      description: 'Session timeout in seconds',
      type: 'number',
      environment: 'all',
      isEditable: true,
      isSecret: false,
      lastModified: '2024-07-14 15:45:00',
      modifiedBy: 'security@system.com',
      validationRules: 'min:300,max:86400',
      defaultValue: '3600'
    },
    {
      id: 3,
      key: 'email.smtp_host',
      value: 'smtp.sendgrid.net',
      category: 'Email',
      description: 'SMTP server hostname',
      type: 'string',
      environment: 'production',
      isEditable: true,
      isSecret: false,
      lastModified: '2024-07-10 09:15:00',
      modifiedBy: 'admin@system.com'
    },
    {
      id: 4,
      key: 'email.smtp_password',
      value: '********',
      category: 'Email',
      description: 'SMTP server password',
      type: 'secret',
      environment: 'production',
      isEditable: true,
      isSecret: true,
      lastModified: '2024-07-10 09:15:00',
      modifiedBy: 'admin@system.com'
    },
    {
      id: 5,
      key: 'storage.s3_bucket',
      value: 't100-platform-storage',
      category: 'Storage',
      description: 'S3 bucket name for document storage',
      type: 'string',
      environment: 'production',
      isEditable: false,
      isSecret: false,
      lastModified: '2024-06-01 12:00:00',
      modifiedBy: 'infrastructure@system.com'
    }
  ]);

  // Mock feature flags
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([
    {
      id: 1,
      name: 'advanced_permissions',
      description: 'Enable advanced permission system with element-level controls',
      enabled: true,
      rolloutPercentage: 100,
      targetTenants: [],
      conditions: 'all',
      createdAt: '2024-06-15',
      updatedAt: '2024-07-15',
      category: 'Feature'
    },
    {
      id: 2,
      name: 'ai_document_processing',
      description: 'AI-powered document analysis and extraction',
      enabled: true,
      rolloutPercentage: 75,
      targetTenants: ['acme-corp', 'global-builders'],
      conditions: 'enterprise_tier',
      createdAt: '2024-07-01',
      updatedAt: '2024-07-14',
      category: 'Beta'
    },
    {
      id: 3,
      name: 'real_time_collaboration',
      description: 'Real-time collaborative editing for documents',
      enabled: false,
      rolloutPercentage: 0,
      targetTenants: [],
      conditions: 'none',
      createdAt: '2024-07-10',
      updatedAt: '2024-07-10',
      category: 'Experiment'
    },
    {
      id: 4,
      name: 'maintenance_mode',
      description: 'System maintenance mode for updates',
      enabled: false,
      rolloutPercentage: 0,
      targetTenants: [],
      conditions: 'manual',
      createdAt: '2024-05-01',
      updatedAt: '2024-07-01',
      category: 'Maintenance'
    }
  ]);

  // Mock service settings
  const [serviceSettings, setServiceSettings] = useState<ServiceSetting[]>([
    {
      id: 1,
      service: 'contractors-service',
      settings: [
        { name: 'max_contractors_per_tenant', value: 1000, type: 'number', description: 'Maximum contractors per tenant' },
        { name: 'compliance_check_interval', value: 86400, type: 'number', description: 'Compliance check interval in seconds' },
        { name: 'enable_auto_notifications', value: true, type: 'boolean', description: 'Enable automatic compliance notifications' }
      ],
      version: 'v1.2.0',
      environment: 'production',
      lastSync: '2024-07-15 14:30:00'
    },
    {
      id: 2,
      service: 'permits-service',
      settings: [
        { name: 'permit_expiry_days', value: 365, type: 'number', description: 'Default permit expiry in days' },
        { name: 'require_digital_signature', value: true, type: 'boolean', description: 'Require digital signatures' },
        { name: 'max_permit_attachments', value: 10, type: 'number', description: 'Maximum attachments per permit' }
      ],
      version: 'v1.0.0',
      environment: 'production',
      lastSync: '2024-07-15 14:25:00'
    }
  ]);

  // Mock API keys
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: 1,
      name: 'Mobile App API Key',
      key: 'sk_live_****************************7a9f',
      service: 'mobile-api',
      permissions: ['read:permits', 'read:contractors', 'read:documents'],
      rateLimit: 1000,
      createdAt: '2024-06-01',
      lastUsed: '2024-07-15 15:45:00',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Integration Partner Key',
      key: 'sk_live_****************************3b2c',
      service: 'partner-api',
      permissions: ['read:all', 'write:permits', 'write:contractors'],
      rateLimit: 5000,
      expiresAt: '2025-06-01',
      createdAt: '2024-06-01',
      lastUsed: '2024-07-15 12:30:00',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Legacy System Key',
      key: 'sk_live_****************************9d1e',
      service: 'legacy-api',
      permissions: ['read:all'],
      rateLimit: 100,
      createdAt: '2023-01-01',
      status: 'Expired'
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Application': return 'badge-primary';
      case 'Authentication': return 'badge-secondary';
      case 'Email': return 'badge-info';
      case 'Storage': return 'badge-success';
      case 'Security': return 'badge-warning';
      default: return 'badge-neutral';
    }
  };

  const getFeatureCategoryColor = (category: string) => {
    switch (category) {
      case 'Feature': return 'badge-primary';
      case 'Beta': return 'badge-info';
      case 'Experiment': return 'badge-warning';
      case 'Maintenance': return 'badge-error';
      default: return 'badge-neutral';
    }
  };

  const filteredConfigurations = configurations.filter(config =>
    config.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Configuration Management</h1>
          <p className="text-base-content opacity-70">Manage system configuration and settings</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn btn-primary">
            Export Config
          </button>
          <button className="btn btn-secondary">
            Import Config
          </button>
        </div>
      </div>

      {/* Configuration Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <a 
          className={`tab ${activeTab === 'general' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          ⚙️ General Settings
        </a>
        <a 
          className={`tab ${activeTab === 'features' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('features')}
        >
          🚀 Feature Flags
        </a>
        <a 
          className={`tab ${activeTab === 'services' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          🔧 Service Settings
        </a>
        <a 
          className={`tab ${activeTab === 'api' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('api')}
        >
          🔑 API Keys
        </a>
        <a 
          className={`tab ${activeTab === 'email' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('email')}
        >
          📧 Email Templates
        </a>
        <a 
          className={`tab ${activeTab === 'integrations' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('integrations')}
        >
          🔗 Integrations
        </a>
      </div>

      {/* General Settings Tab */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search configurations..."
              className="input input-bordered w-96"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddConfig(true)}
            >
              Add Configuration
            </button>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                      <th>Category</th>
                      <th>Environment</th>
                      <th>Last Modified</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConfigurations.map((config) => (
                      <tr key={config.id}>
                        <td>
                          <div>
                            <div className="font-mono font-bold">{config.key}</div>
                            <div className="text-sm opacity-70">{config.description}</div>
                          </div>
                        </td>
                        <td>
                          <div className="font-mono">
                            {config.isSecret ? '••••••••' : config.value}
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${getCategoryColor(config.category)}`}>
                            {config.category}
                          </div>
                        </td>
                        <td>
                          <div className="text-sm">{config.environment}</div>
                        </td>
                        <td>
                          <div>
                            <div className="text-sm">{config.lastModified}</div>
                            <div className="text-xs opacity-70">{config.modifiedBy}</div>
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            {config.isEditable && (
                              <button className="btn btn-sm btn-ghost">✏️ Edit</button>
                            )}
                            <button className="btn btn-sm btn-ghost">📋 History</button>
                          </div>
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

      {/* Feature Flags Tab */}
      {activeTab === 'features' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button className="btn btn-primary">Create Feature Flag</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureFlags.map((flag) => (
              <div key={flag.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="card-title">{flag.name}</h3>
                      <p className="text-sm opacity-70 mt-1">{flag.description}</p>
                    </div>
                    <div className={`badge ${getFeatureCategoryColor(flag.category)}`}>
                      {flag.category}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status</span>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-success" 
                        checked={flag.enabled}
                        onChange={() => {
                          const updated = featureFlags.map(f => 
                            f.id === flag.id ? { ...f, enabled: !f.enabled } : f
                          );
                          setFeatureFlags(updated);
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rollout</span>
                      <div className="flex items-center gap-2">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={flag.rolloutPercentage} 
                          className="range range-sm w-24"
                          disabled={!flag.enabled}
                        />
                        <span className="text-sm font-mono">{flag.rolloutPercentage}%</span>
                      </div>
                    </div>

                    {flag.targetTenants.length > 0 && (
                      <div>
                        <span className="text-sm">Target Tenants:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {flag.targetTenants.map((tenant, idx) => (
                            <div key={idx} className="badge badge-sm">{tenant}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-xs opacity-70">
                      Created: {flag.createdAt} | Updated: {flag.updatedAt}
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-sm btn-ghost">Configure</button>
                    <button className="btn btn-sm btn-ghost">History</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Settings Tab */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Service Configuration</h2>

          {serviceSettings.map((service) => (
            <div key={service.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="card-title">{service.service}</h3>
                    <div className="text-sm opacity-70">
                      Version: {service.version} | Environment: {service.environment} | Last Sync: {service.lastSync}
                    </div>
                  </div>
                  <button className="btn btn-sm btn-primary">Sync Settings</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="table table-compact">
                    <thead>
                      <tr>
                        <th>Setting</th>
                        <th>Value</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.settings.map((setting, idx) => (
                        <tr key={idx}>
                          <td className="font-mono">{setting.name}</td>
                          <td className="font-mono font-bold">{String(setting.value)}</td>
                          <td>
                            <div className="badge badge-sm">{setting.type}</div>
                          </td>
                          <td className="text-sm">{setting.description}</td>
                          <td>
                            <button className="btn btn-xs btn-ghost">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">API Key Management</h2>
            <button className="btn btn-primary">Generate New Key</button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="card-title">{apiKey.name}</h3>
                      <div className="font-mono text-sm mt-2">{apiKey.key}</div>
                    </div>
                    <div className={`badge ${apiKey.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
                      {apiKey.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <div className="text-sm opacity-70">Service</div>
                      <div className="font-medium">{apiKey.service}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-70">Rate Limit</div>
                      <div className="font-medium">{apiKey.rateLimit}/hour</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-70">Created</div>
                      <div className="font-medium">{apiKey.createdAt}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-70">Last Used</div>
                      <div className="font-medium">{apiKey.lastUsed || 'Never'}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm opacity-70">Permissions:</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {apiKey.permissions.map((perm, idx) => (
                        <div key={idx} className="badge badge-sm">{perm}</div>
                      ))}
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-sm btn-ghost">View Usage</button>
                    <button className="btn btn-sm btn-ghost">Regenerate</button>
                    {apiKey.status === 'Active' && (
                      <button className="btn btn-sm btn-error">Revoke</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Email Templates Tab */}
      {activeTab === 'email' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Email Template Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Welcome Email</h3>
                <p className="text-sm opacity-70">Sent to new users upon registration</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Subject:</span> Welcome to T100 Platform
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Last Modified:</span> 2024-07-10
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Variables:</span> {"{name}"}, {"{company}"}, {"{loginUrl}"}
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-ghost">Preview</button>
                  <button className="btn btn-sm btn-primary">Edit Template</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Permit Expiry Notification</h3>
                <p className="text-sm opacity-70">Sent when permits are nearing expiry</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Subject:</span> Permit Expiry Notice
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Last Modified:</span> 2024-07-05
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Variables:</span> {"{permitNumber}"}, {"{expiryDate}"}, {"{daysRemaining}"}
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-ghost">Preview</button>
                  <button className="btn btn-sm btn-primary">Edit Template</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Third-Party Integrations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    MS
                  </div>
                  <div>
                    <h3 className="font-semibold">Microsoft Entra ID</h3>
                    <div className="badge badge-success badge-sm">Connected</div>
                  </div>
                </div>
                <p className="text-sm opacity-70">Single sign-on and user provisioning</p>
                <div className="mt-4 text-sm space-y-1">
                  <div>Tenant ID: abc123-def456...</div>
                  <div>Last Sync: 2 hours ago</div>
                  <div>Users Synced: 1,247</div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-ghost">Configure</button>
                  <button className="btn btn-sm btn-primary">Test Connection</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                    SG
                  </div>
                  <div>
                    <h3 className="font-semibold">SendGrid</h3>
                    <div className="badge badge-success badge-sm">Connected</div>
                  </div>
                </div>
                <p className="text-sm opacity-70">Transactional email delivery</p>
                <div className="mt-4 text-sm space-y-1">
                  <div>API Key: ****7a9f</div>
                  <div>Emails Sent: 45,892</div>
                  <div>Delivery Rate: 98.7%</div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-ghost">Configure</button>
                  <button className="btn btn-sm btn-primary">View Stats</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
                    S3
                  </div>
                  <div>
                    <h3 className="font-semibold">AWS S3</h3>
                    <div className="badge badge-success badge-sm">Connected</div>
                  </div>
                </div>
                <p className="text-sm opacity-70">Document and file storage</p>
                <div className="mt-4 text-sm space-y-1">
                  <div>Bucket: t100-platform</div>
                  <div>Region: us-east-1</div>
                  <div>Storage Used: 2.4 TB</div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-ghost">Configure</button>
                  <button className="btn btn-sm btn-primary">Manage Storage</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl opacity-75">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600">
                    +
                  </div>
                  <div>
                    <h3 className="font-semibold">Slack</h3>
                    <div className="badge badge-neutral badge-sm">Not Connected</div>
                  </div>
                </div>
                <p className="text-sm opacity-70">Team notifications and alerts</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-primary">Connect</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}