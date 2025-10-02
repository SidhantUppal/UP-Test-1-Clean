import sql from 'mssql';

// SQL Server configuration
const config: sql.config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'T100@2024!',
  database: process.env.DB_NAME || 'V7',
  server: process.env.DB_SERVER || 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for Azure
    trustServerCertificate: true // for local dev
  }
};

// Connection pool
let pool: sql.ConnectionPool | null = null;

async function getConnection(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}

export interface UserArea {
  ID?: number;
  Name: string;
  Domain: string;
  AdminEmail: string;
  Settings?: Record<string, unknown>;
  Active?: boolean;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

export const userAreasDB = {
  // Get all user areas with pagination
  async getAll(page: number = 1, limit: number = 10, search?: string, activeOnly?: boolean) {
    try {
      const pool = await getConnection();
      const offset = (page - 1) * limit;
      
      let query = `
        SELECT 
          ID, Name, Domain, AdminEmail, Settings, Active, CreatedAt, UpdatedAt,
          COUNT(*) OVER() as TotalCount
        FROM UserAreas
        WHERE DeletedAt IS NULL
      `;
      
      const request = pool.request();
      
      if (activeOnly !== undefined) {
        query += ' AND Active = @active';
        request.input('active', sql.Bit, activeOnly);
      }
      
      if (search) {
        query += ' AND (Name LIKE @search OR Domain LIKE @search OR AdminEmail LIKE @search)';
        request.input('search', sql.NVarChar, `%${search}%`);
      }
      
      query += ' ORDER BY CreatedAt DESC';
      query += ' OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY';
      
      request.input('offset', sql.Int, offset);
      request.input('limit', sql.Int, limit);
      
      const result = await request.query(query);
      
      const totalCount = result.recordset[0]?.TotalCount || 0;
      const data = result.recordset.map(row => ({
        id: row.ID,
        name: row.Name,
        domain: row.Domain,
        adminEmail: row.AdminEmail,
        settings: row.Settings ? JSON.parse(row.Settings) : {},
        active: row.Active,
        createdAt: row.CreatedAt,
        updatedAt: row.UpdatedAt
      }));
      
      return {
        data,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit)
        }
      };
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  },

  // Get single user area by ID
  async getById(id: number) {
    try {
      const pool = await getConnection();
      const request = pool.request();
      
      request.input('id', sql.Int, id);
      
      const result = await request.query(`
        SELECT 
          ua.ID, ua.Name, ua.Domain, ua.AdminEmail, ua.Settings, 
          ua.Active, ua.CreatedAt, ua.UpdatedAt,
          (SELECT COUNT(*) FROM Users WHERE UserAreaID = ua.ID) AS TotalUsers,
          (SELECT COUNT(*) FROM Users WHERE UserAreaID = ua.ID AND LastLoginAt > DATEADD(day, -30, GETUTCDATE())) AS ActiveUsers
        FROM UserAreas ua
        WHERE ua.ID = @id AND ua.DeletedAt IS NULL
      `);
      
      if (result.recordset.length === 0) {
        return null;
      }
      
      const row = result.recordset[0];
      return {
        id: row.ID,
        name: row.Name,
        domain: row.Domain,
        adminEmail: row.AdminEmail,
        settings: row.Settings ? JSON.parse(row.Settings) : {},
        active: row.Active,
        createdAt: row.CreatedAt,
        updatedAt: row.UpdatedAt,
        stats: {
          totalUsers: row.TotalUsers,
          activeUsers: row.ActiveUsers,
          lastActivity: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  },

  // Create new user area
  async create(userArea: UserArea) {
    try {
      const pool = await getConnection();
      const request = pool.request();
      
      // Check if domain exists
      const checkResult = await request
        .input('domain', sql.NVarChar, userArea.Domain)
        .query('SELECT ID FROM UserAreas WHERE Domain = @domain AND DeletedAt IS NULL');
      
      if (checkResult.recordset.length > 0) {
        throw new Error('Domain already exists');
      }
      
      // Insert new user area
      request.input('name', sql.NVarChar, userArea.Name);
      request.input('adminEmail', sql.NVarChar, userArea.AdminEmail);
      request.input('settings', sql.NVarChar, JSON.stringify(userArea.Settings || {}));
      
      const result = await request.query(`
        INSERT INTO UserAreas (Name, Domain, AdminEmail, Settings)
        OUTPUT INSERTED.*
        VALUES (@name, @domain, @adminEmail, @settings)
      `);
      
      const row = result.recordset[0];
      return {
        id: row.ID,
        name: row.Name,
        domain: row.Domain,
        adminEmail: row.AdminEmail,
        settings: row.Settings ? JSON.parse(row.Settings) : {},
        active: row.Active,
        createdAt: row.CreatedAt,
        updatedAt: row.UpdatedAt
      };
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  },

  // Update user area
  async update(id: number, updates: Partial<UserArea>) {
    try {
      const pool = await getConnection();
      const request = pool.request();
      
      let query = 'UPDATE UserAreas SET ';
      const updateParts: string[] = [];
      
      request.input('id', sql.Int, id);
      
      if (updates.Name !== undefined) {
        updateParts.push('Name = @name');
        request.input('name', sql.NVarChar, updates.Name);
      }
      
      if (updates.AdminEmail !== undefined) {
        updateParts.push('AdminEmail = @adminEmail');
        request.input('adminEmail', sql.NVarChar, updates.AdminEmail);
      }
      
      if (updates.Settings !== undefined) {
        updateParts.push('Settings = @settings');
        request.input('settings', sql.NVarChar, JSON.stringify(updates.Settings));
      }
      
      if (updates.Active !== undefined) {
        updateParts.push('Active = @active');
        request.input('active', sql.Bit, updates.Active);
      }
      
      if (updateParts.length === 0) {
        return this.getById(id);
      }
      
      query += updateParts.join(', ');
      query += ', UpdatedAt = GETUTCDATE()';
      query += ' OUTPUT INSERTED.* WHERE ID = @id AND DeletedAt IS NULL';
      
      const result = await request.query(query);
      
      if (result.recordset.length === 0) {
        return null;
      }
      
      const row = result.recordset[0];
      return {
        id: row.ID,
        name: row.Name,
        domain: row.Domain,
        adminEmail: row.AdminEmail,
        settings: row.Settings ? JSON.parse(row.Settings) : {},
        active: row.Active,
        createdAt: row.CreatedAt,
        updatedAt: row.UpdatedAt
      };
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  },

  // Soft delete user area
  async delete(id: number) {
    try {
      const pool = await getConnection();
      const request = pool.request();
      
      request.input('id', sql.Int, id);
      
      const result = await request.query(`
        UPDATE UserAreas 
        SET Active = 0, DeletedAt = GETUTCDATE()
        WHERE ID = @id AND DeletedAt IS NULL;
        
        SELECT @@ROWCOUNT as affected;
      `);
      
      return result.recordset[0].affected > 0;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }
};