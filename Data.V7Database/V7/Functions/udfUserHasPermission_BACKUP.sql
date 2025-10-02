CREATE FUNCTION [V7].[udfUserHasPermission_BACKUP]
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
		Portal.Permission
	WHERE
		[Key] = @PermissionKey

	IF @PermissionID IS NULL
		RETURN CAST('Permission Key was not found in the database' AS INT) -- Hacky way to throw an error in a UDF

	-- Cache the user area permissions
	DECLARE @tblUserAreaPerms TABLE
	(
		PermissionID INT NOT NULL,
		ParentID INT NULL,
		[Description] VARCHAR(255) NOT NULL,
		[Key] VARCHAR(50) NOT NULL
	)
	INSERT INTO
		@tblUserAreaPerms
	(
		PermissionID,
		ParentID,
		[Description],
		[Key]
	)
	SELECT
		PermissionID,
		ParentID,
		[Description],
		[Key]
	FROM
		[V7].[udfUserAreaPermissions](@UserAreaID)

	-- Create a chain of permissions from the selected one going UP the tree
	DECLARE @tblPerms TABLE
	(
		PermissionID int not null,
		Permit bit NOT NULL
	)

	;WITH ctePerm (PermissionID, ParentID) AS
	(
		SELECT
			p.PermissionID,
			p.ParentID
		FROM
			Portal.Permission p
		WHERE
			p.PermissionID = @PermissionID
		UNION ALL
		SELECT
			p.PermissionID,
			p.ParentID
		FROM
			Portal.Permission p
		INNER JOIN
			ctePerm c
			ON p.PermissionID = c.ParentID
	)
	INSERT INTO
		@tblPerms
	(
		PermissionID,
		Permit
	)
	SELECT
		c.PermissionId,
		rp.Permit
	FROM
		ctePerm c
	INNER JOIN
		Portal.RolePermission rp
		ON c.PermissionID = rp.PermissionID
	INNER JOIN
		Portal.UserRole ur
		ON ur.RoleID = rp.RoleID
		AND ur.UserID = @UserID
		AND (ur.UserAreaID IS NULL OR ur.UserAreaID = @UserAreaID) -- If UA is null then they have system wide role access
	INNER JOIN
		@tblUserAreaPerms uap -- Ensure their user area permits this permission
		ON uap.[PermissionID] = c.[PermissionID]

	DECLARE @return BIT

	IF (SELECT COUNT(*) FROM @tblPerms) > 0 AND NOT EXISTS (SELECT * FROM @tblPerms WHERE Permit = 0)
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