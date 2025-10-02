CREATE FUNCTION [V7].[udfGetChildOrgGroupsForEmployee]
(
	@UserAreaID INT,
    @EmployeeID INT
)

RETURNS @OrgGroupList TABLE
(
	OrgGroupID INT
)
AS
BEGIN 

	DECLARE @OrgGroups TABLE
	(
		Id INT NOT NULL identity(1,1),
		[OrgGroupID] INT
	)

	DECLARE @EmployeeOrgGroupList TABLE
	(
		Id INT NOT NULL identity(1,1),
		[OrgGroupID] INT
	)
	INSERT INTO @EmployeeOrgGroupList
	SELECT OrgGroupID FROM Portal.OrgGroupEmployee WHERE EmployeeID = @EmployeeID

	DECLARE @EmployeeOrgGroupCount INT = 0
	SET @EmployeeOrgGroupCount = (SELECT COUNT(*) FROM @EmployeeOrgGroupList)
	DECLARE @EmployeeOrgGroupCountIncrementer INT = 1

	WHILE @EmployeeOrgGroupCountIncrementer <= @EmployeeOrgGroupCount
	BEGIN

		WITH ChildOrgGroups as
		(
			SELECT OG.OrgGroupID, OG.ParentID, CAST(OG.OrgGroupID AS VarChar(Max)) as Level
			FROM Portal.OrgGroup OG
			WHERE OG.OrgGroupID = (SELECT OrgGroupID FROM @EmployeeOrgGroupList WHERE Id = @EmployeeOrgGroupCountIncrementer)
			AND UserAreaID = @UserAreaID
			AND ArchivedDate IS NULL

			UNION ALL

			SELECT OG.OrgGroupID, OG.ParentID, CAST(OG.OrgGroupID AS VarChar(Max)) + ', ' + COG.Level
			FROM Portal.OrgGroup OG
			INNER JOIN ChildOrgGroups COG
			ON COG.OrgGroupID = OG.ParentID
			)
			INSERT INTO @OrgGroupList
			(
			OrgGroupID
			)
		SELECT OrgGroupID From ChildOrgGroups

		SET @EmployeeOrgGroupCountIncrementer = @EmployeeOrgGroupCountIncrementer+1
	END

	RETURN

END