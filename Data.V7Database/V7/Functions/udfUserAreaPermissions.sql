
CREATE FUNCTION [V7].[udfUserAreaPermissions]
(
	@UserAreaID INT
)
/*
	SELECT * FROM [V7].[udfUserAreaPermissions](1)
*/
RETURNS @returntable TABLE
(
	[PermissionID] INT NOT NULL,
	[ParentID] INT NULL,
	[Description] VARCHAR(255) NOT NULL, 
    [Key] VARCHAR(50) NOT NULL,
	[ArchivedByUserID] INT NULL,
	[ArchivedDate] DATETIME NULL,
	[IsNotArchived] INT NOT NULL
)
AS
BEGIN
	IF @UserAreaID IS NULL
	BEGIN
		-- Just select out all the permissions, as they aren't constrained by user area
		-- NOTE: This is very dangerous if you are populating a list of available permissions
		-- and not passing in a user area. Only call this function in a select when either
		-- you are joining to it, or if you are selecting data out, always provide a user area ID
		;WITH ctePerm ([PermissionID], [ParentID], [Description], [Key], [ArchivedByUserID], [ArchivedDate], [IsNotArchived]) AS
		(
			SELECT
				p.[PermissionID],
				p.[ParentID],
				p.[Description],
				p.[Key],
				p.[ArchivedByUserID],
				p.[ArchivedDate],
				p.[IsNotArchived]
			FROM
				[V7].[Permission] p
			WHERE
				p.ParentID IS NULL
			AND
				p.ArchivedDate IS NULL
			UNION ALL
			SELECT
				p.[PermissionID],
				p.[ParentID],
				p.[Description],
				p.[Key],
				p.[ArchivedByUserID],
				p.[ArchivedDate],
				p.[IsNotArchived]
			FROM
				[V7].[Permission] p
			INNER JOIN
				ctePerm c
				ON p.ParentID = c.PermissionID
			WHERE
				p.ArchivedDate IS NULL
		)
		INSERT INTO
			@returntable
		(
			[PermissionID],
			[ParentID],
			[Description],
			[Key],
			[ArchivedByUserID],
			[ArchivedDate],
			[IsNotArchived]
		)
		SELECT
			[PermissionID],
			[ParentID],
			[Description],
			[Key],
			[ArchivedByUserID],
			[ArchivedDate],
			[IsNotArchived]
		FROM
			ctePerm
	END
	ELSE
	BEGIN
		;WITH ctePerm ([PermissionID], [ParentID], [Description], [Key], [ArchivedByUserID], [ArchivedDate], [IsNotArchived]) AS
		(
			/*
				Pull out the granted permissions and set them as top
				level to avoid users granting permissions higher up
			*/
			SELECT
				p.[PermissionID],
				NULL,
				p.[Description],
				p.[Key],
				p.[ArchivedByUserID],
				p.[ArchivedDate],
				p.[IsNotArchived]
			FROM
				[V7].[Permission] p
			INNER JOIN
				[V7].[ModuleType] mtp
				ON mtp.RootPermissionID = p.PermissionID AND p.ArchivedDate IS NULL AND mtp.ArchivedDate IS NULL
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
				AND (l.ExpiryDate IS NULL OR l.ExpiryDate > GETDATE())
			UNION ALL
			SELECT
				p.[PermissionID],
				p.[ParentID],
				p.[Description],
				p.[Key],
				p.[ArchivedByUserID],
				p.[ArchivedDate],
				p.[IsNotArchived]
			FROM
				[V7].[Permission] p
			INNER JOIN
				ctePerm c
				ON p.ParentID = c.PermissionID
			WHERE
				p.ArchivedDate IS NULL
		)
		INSERT INTO
			@returntable
		(
			[PermissionID],
			[ParentID],
			[Description],
			[Key],
			[ArchivedByUserID],
			[ArchivedDate],
			[IsNotArchived]
		)
		SELECT
			[PermissionID],
			[ParentID],
			[Description],
			[Key],
			[ArchivedByUserID],
			[ArchivedDate],
			[IsNotArchived]
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
				c.[Description],
				c.[Key],
				c.[ArchivedByUserID],
				c.[ArchivedDate],
				c.[IsNotArchived],
				ROW_NUMBER() OVER (PARTITION BY c.[PermissionID] ORDER BY c.[ParentID] DESC) AS RowNumber
			FROM
				ctePerm c
			LEFT JOIN
				[V7].[ModuleType] mtp
				ON mtp.RootPermissionID = c.PermissionID
			LEFT JOIN
				[V7].[ProductTypeModuleType] ptmt
				ON ptmt.ModuleTypeID = mtp.ModuleTypeID
			LEFT JOIN
				[V7].[ProductTypeHighLevelProductType] pthlpt
				ON ptmt.ProductTypeID = pthlpt.ProductTypeID
			LEFT JOIN
				[V7].[LicenceHighLevelProductType] lhlpt
				ON pthlpt.HighLevelProductTypeID = lhlpt.HighLevelProductTypeID
			LEFT JOIN
				[V7].[Licence] l
				ON lhlpt.LicenceID = l.LicenceID
				AND l.UserAreaID = @UserAreaID
		) AS
			cteDistinct
		WHERE
			RowNumber = 1
	END
	RETURN
END