CREATE FUNCTION [V7].[udfUserAreaHasPermission]
(
	@PermissionID INT,
	@UserAreaID INT
)

RETURNS BIT
AS
BEGIN
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
		AND
			p.ArchivedDate IS NULL
		UNION ALL
		SELECT
			p.PermissionID,
			p.ParentID
		FROM
			Portal.Permission p
		INNER JOIN
			ctePerm c
			ON p.PermissionID = c.ParentID
		WHERE
			p.ArchivedDate IS NULL
	)
	INSERT INTO
		@tblPerms
	(
		PermissionID,
		Permit
	)
	SELECT
		p.PermissionId,
		1
	FROM
		ctePerm p
	INNER JOIN
		[V7].[ModuleType] mt
		ON mt.RootPermissionID = p.PermissionID
	INNER JOIN
		[V7].[ProductTypeModuleType] ptmt
		ON ptmt.ModuleTypeID = mt.ModuleTypeID
	INNER JOIN
		[V7].[ProductTypeHighLevelProductType] pthlpt
		ON ptmt.ProductTypeID = pthlpt.ProductTypeID
	INNER JOIN
		[V7].[LicenceHighLevelProductType] lhlpt
		ON lhlpt.HighLevelProductTypeID = pthlpt.HighLevelProductTypeID
	INNER JOIN
		[V7].[Licence] l
		ON l.LicenceID = lhlpt.LicenceID
		AND l.UserAreaID = @UserAreaID

	DECLARE @return BIT

	IF (SELECT COUNT(*) FROM @tblPerms) > 0 AND NOT EXISTS (SELECT * FROM @tblPerms WHERE Permit = 0)
	BEGIN
		SET @return = 1
	END
	ELSE
	BEGIN
		SET @return = 0
	END

	RETURN @return
END