
CREATE FUNCTION [V7].[udfUserAreaPermissionsShortId]
(
    @UserAreaID INT
)
RETURNS @returntable TABLE
(
    [PermissionID] INT NOT NULL,
    [ParentID] INT NULL
)
AS
BEGIN
  DECLARE @CurrentDate DATE

  SET @CurrentDate=GETDATE();
 
 ;WITH ctePerm ([PermissionID], [ParentID]) AS
        (
            /*
                Pull out the granted permissions and set them as top
                level to avoid users granting permissions higher up
            */
            SELECT
                p.[PermissionID],
                NULL
            FROM
                [V7].[Permission] p
            INNER JOIN
                [V7].[ModuleType] mtp
                ON mtp.RootPermissionID = p.PermissionID 
                AND p.IsNotArchived=1
                AND mtp.IsNotArchived=1
            INNER JOIN
                [V7].[ProductTypeModuleType] ptmt
                ON ptmt.ModuleTypeID = mtp.ModuleTypeID
            INNER JOIN
                [V7].[ProductTypeHighLevelProductType] pthlpt
                ON ptmt.ProductTypeID = pthlpt.ProductTypeID
            INNER JOIN
                [V7].[LicenceHighLevelProductType] lhlpt
                ON pthlpt.HighLevelProductTypeID = lhlpt.HighLevelProductTypeID
            INNER JOIN
                [V7].[Licence] l
                ON lhlpt.LicenceID = l.LicenceID
                AND l.UserAreaID = @UserAreaID
                AND (l.ExpiryDate IS NULL OR l.ExpiryDate >  @CurrentDate)
            UNION ALL
            SELECT
                p.[PermissionID],
                p.[ParentID]
            FROM
                [V7].[Permission] p
            INNER JOIN
                ctePerm c
                ON p.ParentID = c.PermissionID
            WHERE
                p.IsNotArchived=1
        )
        INSERT INTO
            @returntable
        (
            [PermissionID],
            [ParentID]
        )
        SELECT
            [PermissionID],
            [ParentID]
        FROM
        (
            /*
                It's possible that one module grants the same permission directly as another module
                grants by inheritance, so this is effectively a DISTINCT, but uses the first value
                which isn't null to use the inherited one
            */
            SELECT
                c.[PermissionID],
                c.[ParentID],		
                ROW_NUMBER() OVER (PARTITION BY c.[PermissionID] ORDER BY c.[ParentID] DESC) AS RowNumber
            FROM
                ctePerm c
        ) AS
            cteDistinct
        WHERE
            RowNumber = 1           
    RETURN
END