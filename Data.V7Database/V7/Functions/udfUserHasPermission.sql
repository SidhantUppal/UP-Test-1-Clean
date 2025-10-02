CREATE FUNCTION [V7].[udfUserHasPermission]
(
    @UserID INT,
    @UserAreaID INT,
    @PermissionKey VARCHAR(50)
)
RETURNS BIT
AS
BEGIN
    -- First get the ID for the permission key being checked
    DECLARE @PermissionID INT
    SELECT
        @PermissionID = PermissionID
    FROM
        Portal.Permission p 
    WHERE
        [Key] = @PermissionKey
    AND
        p.IsNotArchived = 1;

    IF @PermissionID IS NULL
        RETURN CAST('Permission Key was not found in the database' AS INT) -- Hacky way to throw an error in a UDF

    -- Cache all the permissions for this user area - Should be refined to only relevant ones
    DECLARE @tblUserAreaPerms TABLE
    (
        PermissionID INT NOT NULL, 
        ParentID INT NULL,
        PRIMARY KEY (PermissionID)
    )

    INSERT INTO
        @tblUserAreaPerms
    (
        PermissionID,
        ParentID
    )
    SELECT
        PermissionID,
        ParentID
    FROM
        [V7].[udfUserAreaPermissionsShort](@UserAreaID) 
        
    -- Create a chain of permissions from the selected one going UP the tree
    DECLARE @tblPerms TABLE
    (
        PermissionID INT,
        Permit bit NOT NULL,    
        PRIMARY KEY (Permit, PermissionID) 
    )    
    ;WITH ctePerm (PermId, ParId) AS
    (
        SELECT
            p.PermissionID,
            p.ParentID
        FROM
            Portal.Permission p
        WHERE
            p.PermissionID = @PermissionID
        AND
            p.IsNotArchived = 1
        UNION ALL
        SELECT
            p.PermissionID,
            p.ParentID
        FROM
            Portal.Permission p
        INNER JOIN
            ctePerm c
            ON p.PermissionID = c.ParId
        WHERE
            p.IsNotArchived = 1
    )
    INSERT INTO
        @tblPerms
    (
        PermissionID,
        Permit
    )
    SELECT DISTINCT
        c.PermId,
        rp.Permit
    FROM
        ctePerm c
    INNER JOIN
        Portal.RolePermission rp
        ON c.PermId = rp.PermissionID
    INNER JOIN
        Portal.UserRole ur
        ON ur.RoleID = rp.RoleID
        AND ur.UserID = @UserID
        AND (ur.UserAreaID IS NULL OR ur.UserAreaID = @UserAreaID) -- If UA is null then they have system wide role access
    INNER JOIN
        @tblUserAreaPerms uap -- Ensure their user area permits this permission
        ON uap.[PermissionID] = c.PermId
    INNER JOIN
        Portal.[Role] r
        ON r.RoleID = rp.RoleID
        AND r.ArchivedDate is null

    DECLARE @return BIT

    IF (EXISTS(SELECT TOP 1 1 FROM @tblPerms WHERE (Permit != 0)) AND NOT EXISTS (SELECT TOP 1 1 FROM @tblPerms WHERE Permit = 0))
    BEGIN
        -- There is at least one granted permission up the tree, and there are no deny settings
        SET @return = 1
    END
    ELSE
    BEGIN
        -- There was a deny / revoke flag somewhere up the chain or no granted permissions found
        SET @return = 0
    END

    RETURN @return
END