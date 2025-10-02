import sql from 'mssql';

// SQL Server configuration for Azure
const config: sql.config = {
  user: process.env.DB_USER || 'YOUR_DB_USER',
  password: process.env.DB_PASSWORD || 'YOUR_DB_PASSWORD',
  database: process.env.DB_NAME || 'V7',
  server: process.env.DB_SERVER || 'YOUR_DATABASE_SERVER.database.windows.net',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for Azure
    trustServerCertificate: false // for Azure
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

export interface UserAreaV7 {
  UserAreaID?: number;
  ThemeTypeID: number;
  GUID?: string;
  Title: string;
  Description?: string;
  Prefix?: string;
  IsDemo: boolean;
  ExpiryDate?: Date;
  BaseURL?: string;
  SSOLoginURL?: string;
  MobileIdentityAPIInstanceID?: number;
  UploadedFileMBLimit?: number;
  CreatedByUserID: number;
  CreatedDate?: Date;
  ModifiedByUserID?: number;
  ModifiedDate?: Date;
  ArchivedByUserID?: number;
  ArchivedDate?: Date;
}

export const userAreasV7DB = {
  // Get all user areas with pagination
  async getAll(page: number = 1, limit: number = 10, search?: string, activeOnly?: boolean) {
    try {
      const pool = await getConnection();
      const offset = (page - 1) * limit;
      
      let query = `
        SELECT 
          UserAreaID, ThemeTypeID, GUID, Title, Description, Prefix, IsDemo,
          ExpiryDate, BaseURL, CreatedDate,
          (SELECT COUNT(*) FROM [V7].[User] WHERE MasterUserAreaID = ua.UserAreaID) AS TotalUsers
        FROM [V7].[UserArea] ua
        WHERE ArchivedDate IS NULL
      `;
      
      const conditions: string[] = [];
      
      if (search) {
        conditions.push(`(Title LIKE '%${search}%' OR Description LIKE '%${search}%')`);
      }
      
      if (activeOnly !== undefined) {
        conditions.push(`IsDemo = 0`);
      }
      
      if (conditions.length > 0) {
        query += ' AND ' + conditions.join(' AND ');
      }
      
      // Get total count
      const countQuery = `
        SELECT COUNT(*) as total 
        FROM [V7].[UserArea]
        WHERE ArchivedDate IS NULL
        ${conditions.length > 0 ? ' AND ' + conditions.join(' AND ') : ''}
      `;
      
      const countResult = await pool.request().query(countQuery);
      const totalCount = countResult.recordset[0].total;
      
      // Get paginated data
      query += ` ORDER BY CreatedDate DESC
                 OFFSET ${offset} ROWS
                 FETCH NEXT ${limit} ROWS ONLY`;
      
      const result = await pool.request().query(query);
      
      return {
        data: result.recordset,
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
          ua.*, 
          (SELECT COUNT(*) FROM [V7].[User] WHERE MasterUserAreaID = ua.UserAreaID) AS TotalUsers
        FROM [V7].[UserArea] ua
        WHERE ua.UserAreaID = @id AND ua.ArchivedDate IS NULL
      `);
      
      if (result.recordset.length === 0) {
        return null;
      }
      
      return result.recordset[0];
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  },

  // Create new user area
  async create(userArea: {
    Title: string;
    Description?: string;
    ThemeTypeID?: number;
    Prefix?: string;
    BaseURL?: string;
    UploadedFileMBLimit?: number;
  }) {
    try {
      const pool = await getConnection();
      const request = pool.request();
      
      // Check if title exists
      const checkResult = await request
        .input('title', sql.NVarChar, userArea.Title)
        .query('SELECT 1 FROM [V7].[UserArea] WHERE Title = @title AND ArchivedDate IS NULL');
      
      if (checkResult.recordset.length > 0) {
        throw new Error('Organization name already exists');
      }
      
      // Generate prefix from title if not provided
      const prefix = userArea.Prefix || userArea.Title.substring(0, 4).toUpperCase();
      
      // Insert new user area
      const insertRequest = pool.request();
      insertRequest.input('ThemeTypeID', sql.Int, userArea.ThemeTypeID || 1);
      insertRequest.input('GUID', sql.UniqueIdentifier, sql.UniqueIdentifier);
      insertRequest.input('Title', sql.NVarChar, userArea.Title);
      insertRequest.input('Description', sql.NVarChar, userArea.Description || null);
      insertRequest.input('Prefix', sql.NVarChar, prefix);
      insertRequest.input('IsDemo', sql.Bit, false);
      insertRequest.input('BaseURL', sql.NVarChar, userArea.BaseURL || `https://${userArea.Title.toLowerCase().replace(/\s+/g, '-')}.t100platform.com`);
      insertRequest.input('UploadedFileMBLimit', sql.Int, userArea.UploadedFileMBLimit || 100);
      insertRequest.input('CreatedByUserID', sql.Int, 1); // Admin user
      
      const insertResult = await insertRequest.query(`
        INSERT INTO [V7].[UserArea] (
          ThemeTypeID, GUID, Title, Description, Prefix, IsDemo,
          BaseURL, UploadedFileMBLimit, CreatedByUserID, CreatedDate
        )
        OUTPUT INSERTED.*
        VALUES (
          @ThemeTypeID, NEWID(), @Title, @Description, @Prefix, @IsDemo,
          @BaseURL, @UploadedFileMBLimit, @CreatedByUserID, SYSDATETIMEOFFSET()
        )
      `);
      
      return insertResult.recordset[0];
    } catch (error: unknown) {
      console.error('Database error:', error);
      if (error instanceof Error && error.message === 'Organization name already exists') {
        throw error;
      }
      throw new Error('Failed to create organization');
    }
  },

  // Update user area
  async update(id: number, updates: Partial<UserAreaV7>) {
    try {
      const pool = await getConnection();
      const request = pool.request();
      
      let query = 'UPDATE [V7].[UserArea] SET ';
      const updateParts: string[] = [];
      
      request.input('id', sql.Int, id);
      
      if (updates.Title !== undefined) {
        updateParts.push('Title = @Title');
        request.input('Title', sql.NVarChar, updates.Title);
      }
      
      if (updates.Description !== undefined) {
        updateParts.push('Description = @Description');
        request.input('Description', sql.NVarChar, updates.Description);
      }
      
      if (updates.ThemeTypeID !== undefined) {
        updateParts.push('ThemeTypeID = @ThemeTypeID');
        request.input('ThemeTypeID', sql.Int, updates.ThemeTypeID);
      }
      
      if (updates.UploadedFileMBLimit !== undefined) {
        updateParts.push('UploadedFileMBLimit = @UploadedFileMBLimit');
        request.input('UploadedFileMBLimit', sql.Int, updates.UploadedFileMBLimit);
      }
      
      if (updateParts.length === 0) {
        return await this.getById(id);
      }
      
      updateParts.push('ModifiedByUserID = @ModifiedBy');
      updateParts.push('ModifiedDate = SYSDATETIMEOFFSET()');
      request.input('ModifiedBy', sql.Int, 1); // Admin user
      
      query += updateParts.join(', ');
      query += ' OUTPUT INSERTED.* WHERE UserAreaID = @id AND ArchivedDate IS NULL';
      
      const result = await request.query(query);
      
      if (result.recordset.length === 0) {
        return null;
      }
      
      return result.recordset[0];
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
      request.input('ArchivedByUserID', sql.Int, 1); // Admin user
      
      const result = await request.query(`
        UPDATE [V7].[UserArea]
        SET ArchivedDate = SYSDATETIMEOFFSET(),
            ArchivedByUserID = @ArchivedByUserID
        WHERE UserAreaID = @id AND ArchivedDate IS NULL
      `);
      
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }
};