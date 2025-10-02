-- T100 Database Schema Analysis Queries
-- Run these manually in SQL Server Management Studio or Azure Data Studio

-- =====================================================
-- 1. GET ALL TABLES WITH ROW COUNTS
-- =====================================================
SELECT 
    s.name AS SchemaName,
    t.name AS TableName,
    p.rows as RowCount,
    CASE 
        WHEN LOWER(t.name) LIKE '%permission%' OR LOWER(t.name) LIKE '%role%' 
             OR LOWER(t.name) LIKE '%user%' OR LOWER(t.name) LIKE '%auth%' 
             OR LOWER(t.name) LIKE '%access%' THEN 'PERMISSION_RELATED'
        ELSE 'REGULAR'
    END AS TableType
FROM sys.tables t
INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
LEFT JOIN sys.dm_db_partition_stats p ON t.object_id = p.object_id AND p.index_id < 2
ORDER BY SchemaName, TableName;

-- =====================================================
-- 2. GET ALL PERMISSION-RELATED TABLES WITH DETAILS
-- =====================================================
SELECT 
    s.name AS SchemaName,
    t.name AS TableName,
    p.rows as RowCount,
    t.create_date,
    t.modify_date
FROM sys.tables t
INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
LEFT JOIN sys.dm_db_partition_stats p ON t.object_id = p.object_id AND p.index_id < 2
WHERE LOWER(t.name) LIKE '%permission%' 
   OR LOWER(t.name) LIKE '%role%' 
   OR LOWER(t.name) LIKE '%user%' 
   OR LOWER(t.name) LIKE '%auth%'
   OR LOWER(t.name) LIKE '%access%'
   OR LOWER(t.name) LIKE '%right%'
ORDER BY SchemaName, TableName;

-- =====================================================
-- 3. GET COLUMNS FOR PERMISSION TABLES
-- =====================================================
SELECT 
    s.name AS SchemaName,
    t.name AS TableName,
    c.name AS ColumnName,
    ty.name AS DataType,
    c.max_length,
    c.is_nullable,
    c.is_identity,
    CASE WHEN pk.column_id IS NOT NULL THEN 'YES' ELSE 'NO' END AS IsPrimaryKey,
    c.column_id AS ColumnOrder
FROM sys.tables t
INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
INNER JOIN sys.columns c ON t.object_id = c.object_id
INNER JOIN sys.types ty ON c.user_type_id = ty.user_type_id
LEFT JOIN sys.indexes pk ON t.object_id = pk.object_id AND pk.is_primary_key = 1
LEFT JOIN sys.index_columns pc ON pk.object_id = pc.object_id 
    AND pk.index_id = pc.index_id AND c.column_id = pc.column_id
WHERE LOWER(t.name) LIKE '%permission%' 
   OR LOWER(t.name) LIKE '%role%' 
   OR LOWER(t.name) LIKE '%user%' 
   OR LOWER(t.name) LIKE '%auth%'
   OR LOWER(t.name) LIKE '%access%'
ORDER BY SchemaName, TableName, c.column_id;

-- =====================================================
-- 4. GET FOREIGN KEY RELATIONSHIPS
-- =====================================================
SELECT 
    fk.name AS ForeignKeyName,
    OBJECT_SCHEMA_NAME(fk.parent_object_id) AS ParentSchema,
    OBJECT_NAME(fk.parent_object_id) AS ParentTable,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS ParentColumn,
    OBJECT_SCHEMA_NAME(fk.referenced_object_id) AS ReferencedSchema,
    OBJECT_NAME(fk.referenced_object_id) AS ReferencedTable,
    COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS ReferencedColumn
FROM sys.foreign_keys AS fk
INNER JOIN sys.foreign_key_columns AS fkc ON fk.object_id = fkc.constraint_object_id
WHERE OBJECT_NAME(fk.parent_object_id) LIKE '%permission%' 
   OR OBJECT_NAME(fk.parent_object_id) LIKE '%role%' 
   OR OBJECT_NAME(fk.parent_object_id) LIKE '%user%' 
   OR OBJECT_NAME(fk.parent_object_id) LIKE '%auth%'
   OR OBJECT_NAME(fk.referenced_object_id) LIKE '%permission%' 
   OR OBJECT_NAME(fk.referenced_object_id) LIKE '%role%' 
   OR OBJECT_NAME(fk.referenced_object_id) LIKE '%user%' 
   OR OBJECT_NAME(fk.referenced_object_id) LIKE '%auth%'
ORDER BY ParentSchema, ParentTable;

-- =====================================================
-- 5. FIND PERMISSION COLUMNS IN ALL TABLES
-- =====================================================
SELECT 
    s.name AS SchemaName,
    t.name AS TableName,
    c.name AS ColumnName,
    ty.name AS DataType,
    c.is_nullable
FROM sys.tables t
INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
INNER JOIN sys.columns c ON t.object_id = c.object_id
INNER JOIN sys.types ty ON c.user_type_id = ty.user_type_id
WHERE LOWER(c.name) LIKE '%permission%' 
   OR LOWER(c.name) LIKE '%role%' 
   OR LOWER(c.name) LIKE '%access%'
   OR LOWER(c.name) LIKE '%auth%'
   OR LOWER(c.name) LIKE '%right%'
ORDER BY SchemaName, TableName, c.name;

-- =====================================================
-- 6. GET SAMPLE DATA FROM PERMISSION TABLES
-- =====================================================
-- Run these individually, replacing [TableName] with actual table names

-- Example - replace with your actual permission table names:
-- SELECT TOP 5 * FROM [dbo].[Users];
-- SELECT TOP 5 * FROM [dbo].[Roles];
-- SELECT TOP 5 * FROM [dbo].[Permissions];
-- SELECT TOP 5 * FROM [dbo].[UserRoles];
-- SELECT TOP 5 * FROM [dbo].[RolePermissions];

-- =====================================================
-- 7. GET INDEX INFORMATION
-- =====================================================
SELECT 
    s.name AS SchemaName,
    t.name AS TableName,
    i.name AS IndexName,
    i.type_desc AS IndexType,
    i.is_primary_key,
    i.is_unique,
    COL_NAME(ic.object_id, ic.column_id) AS ColumnName
FROM sys.tables t
INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
INNER JOIN sys.indexes i ON t.object_id = i.object_id
INNER JOIN sys.index_columns ic ON i.object_id = ic.object_id AND i.index_id = ic.index_id
WHERE LOWER(t.name) LIKE '%permission%' 
   OR LOWER(t.name) LIKE '%role%' 
   OR LOWER(t.name) LIKE '%user%' 
   OR LOWER(t.name) LIKE '%auth%'
ORDER BY SchemaName, TableName, IndexName, ic.key_ordinal;

-- =====================================================
-- 8. CHECK FOR NAMING PATTERNS
-- =====================================================
SELECT 
    'Table Naming Pattern' AS AnalysisType,
    CASE 
        WHEN name LIKE '%_%' THEN 'snake_case'
        WHEN name COLLATE Latin1_General_CS_AS != LOWER(name) THEN 'PascalCase/camelCase'
        ELSE 'lowercase'
    END AS Pattern,
    COUNT(*) AS Count
FROM sys.tables 
WHERE LOWER(name) LIKE '%permission%' 
   OR LOWER(name) LIKE '%role%' 
   OR LOWER(name) LIKE '%user%' 
   OR LOWER(name) LIKE '%auth%'
GROUP BY 
    CASE 
        WHEN name LIKE '%_%' THEN 'snake_case'
        WHEN name COLLATE Latin1_General_CS_AS != LOWER(name) THEN 'PascalCase/camelCase'
        ELSE 'lowercase'
    END

UNION ALL

SELECT 
    'Column Naming Pattern' AS AnalysisType,
    CASE 
        WHEN c.name LIKE '%_%' THEN 'snake_case'
        WHEN c.name COLLATE Latin1_General_CS_AS != LOWER(c.name) THEN 'PascalCase/camelCase'
        ELSE 'lowercase'
    END AS Pattern,
    COUNT(*) AS Count
FROM sys.tables t
INNER JOIN sys.columns c ON t.object_id = c.object_id
WHERE (LOWER(t.name) LIKE '%permission%' 
    OR LOWER(t.name) LIKE '%role%' 
    OR LOWER(t.name) LIKE '%user%' 
    OR LOWER(t.name) LIKE '%auth%')
   OR (LOWER(c.name) LIKE '%permission%' 
    OR LOWER(c.name) LIKE '%role%' 
    OR LOWER(c.name) LIKE '%access%'
    OR LOWER(c.name) LIKE '%auth%')
GROUP BY 
    CASE 
        WHEN c.name LIKE '%_%' THEN 'snake_case'
        WHEN c.name COLLATE Latin1_General_CS_AS != LOWER(c.name) THEN 'PascalCase/camelCase'
        ELSE 'lowercase'
    END
ORDER BY AnalysisType, Pattern;