import { UserProfile, UserRole } from '@/contexts/UserContext';

const SYS_ADMIN_SERVICE_URL = process.env.SYS_ADMIN_SERVICE_URL || 'http://localhost:3012';

export interface V7UserResponse {
  UserID: number;
  GUID: string;
  MasterUserAreaID?: number;
  FullName: string;
  Email?: string;
  IsMobileAppUser: boolean;
  HasReadDisclaimer: boolean;
  IsLocked: boolean;
  LockedMessage?: string;
  LastLoginDate?: Date;
  CreatedByUserID?: number;
  CreatedDate: Date;
  ModifiedByUserID?: number;
  ModifiedDate?: Date;
  ArchivedByUserID?: number;
  ArchivedDate?: Date;
  AzureADObjectId?: string;
}

export interface CreateUserRequest {
  masterUserAreaId: number;
  fullName: string;
  email: string;
  isMobileAppUser?: boolean;
  azureADObjectId: string;
}

class UserService {
  /**
   * Find user by Azure AD Object ID
   */
  async findByAzureObjectId(objectId: string): Promise<V7UserResponse | null> {
    try {
      const response = await fetch(`${SYS_ADMIN_SERVICE_URL}/api/users/azuread/${objectId}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-userarea-id': '1', // Default to userarea 1 for now
        },
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data || result; // Extract data if it exists, otherwise return full result
    } catch (error) {
      console.error('Error finding user by Azure Object ID:', error);
      throw error;
    }
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<V7UserResponse | null> {
    try {
      const response = await fetch(`${SYS_ADMIN_SERVICE_URL}/api/users/email/${encodeURIComponent(email)}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-userarea-id': '1', // Default to userarea 1 for now
        },
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data || result; // Extract data if it exists, otherwise return full result
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  /**
   * Create new user
   */
  async createUser(userData: CreateUserRequest): Promise<V7UserResponse> {
    try {
      // Transform frontend data format to sys-admin service format
      const sysAdminUserData = {
        MasterUserAreaID: userData.masterUserAreaId,
        FullName: userData.fullName,
        Email: userData.email,
        IsMobileAppUser: userData.isMobileAppUser || false,
        AzureADObjectId: userData.azureADObjectId
      };

      const response = await fetch(`${SYS_ADMIN_SERVICE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-userarea-id': userData.masterUserAreaId.toString(),
          'x-user-id': '1', // System user for creation
        },
        body: JSON.stringify(sysAdminUserData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`HTTP ${response.status}: ${error.error || response.statusText}`);
      }

      const result = await response.json();
      return result.data || result; // Extract data if it exists, otherwise return full result
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Update user last login
   */
  async updateLastLogin(userId: number): Promise<void> {
    try {
      const response = await fetch(`${SYS_ADMIN_SERVICE_URL}/api/users/${userId}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-userarea-id': '1', // Default to userarea 1 for now
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating last login:', error);
      throw error;
    }
  }

  /**
   * Convert V7 user to UserProfile format
   */
  convertToUserProfile(v7User: V7UserResponse, defaultUserAreaId: number = 1): UserProfile {
    // Parse name
    const fullName = v7User.FullName || '';
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || 'User';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Default role assignment - in production this would come from user roles table
    const role: UserRole = 'employee'; // Default role, should be determined from user's actual role

    // Default permissions - in production these would come from role-permission mappings
    const permissions = [
      'dashboard.view',
      'tasks.my',
      'incidents.report',
      'documents.view',
    ];

    return {
      userId: v7User.UserID,
      email: v7User.Email || '',
      firstName,
      lastName,
      role,
      tenantId: v7User.MasterUserAreaID || defaultUserAreaId,
      tenantName: 'Company', // TODO: Get actual tenant name
      permissions,
      lastLogin: v7User.LastLoginDate ? new Date(v7User.LastLoginDate) : undefined,
      isActive: !v7User.IsLocked,
    };
  }

  /**
   * Get or create user from Azure AD token claims
   */
  async getOrCreateUserFromAzureAD(azureUser: any, defaultUserAreaId: number = 1): Promise<UserProfile> {
    const { oid: objectId, email, name, given_name, family_name } = azureUser;

    if (!objectId || !email || !name) {
      throw new Error('Missing required Azure AD user claims');
    }

    // First try to find by Azure AD Object ID
    let v7User = await this.findByAzureObjectId(objectId);

    // If not found, try to find by email
    if (!v7User) {
      v7User = await this.findByEmail(email);

      // If found by email but no Azure AD Object ID, update it
      if (v7User && !v7User.AzureADObjectId) {
        // TODO: Update user with Azure AD Object ID
        console.log('User found by email but missing Azure AD Object ID - should update');
      }
    }

    // If still not found, create new user
    if (!v7User) {
      console.log('Creating new user for Azure AD user:', { objectId, email, name });

      const createUserData: CreateUserRequest = {
        masterUserAreaId: defaultUserAreaId,
        fullName: name,
        email: email,
        isMobileAppUser: false,
        azureADObjectId: objectId,
      };

      v7User = await this.createUser(createUserData);
    }

    // Update last login
    await this.updateLastLogin(v7User.UserID);

    // Convert to UserProfile format
    return this.convertToUserProfile(v7User, defaultUserAreaId);
  }
}

export const userService = new UserService();