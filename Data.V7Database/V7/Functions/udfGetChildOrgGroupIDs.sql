CREATE FUNCTION [V7].[udfGetChildOrgGroupIDs]
(
	@UserAreaID INT,
    @ParentOrgGroupIDList VARCHAR(1000) = ''
)
RETURNS @ChildOrgGroupIDs TABLE(OrgGroupID INT NOT NULL)
AS
BEGIN 
	-- Only perform the CTE if we have values to search for
	IF (LEN(@ParentOrgGroupIDList) > 0)
	BEGIN
		-- Create a temporary table containing each parent org group ID specified
		DECLARE @ParentOrgGroupIDs TABLE (OrgGroupID INT);
		INSERT INTO @ParentOrgGroupIDs (OrgGroupID) SELECT * FROM Portal.udfSplitStringToInts(@ParentOrgGroupIDList, ',');

		-- Recursively find all child org group IDs of the specified parent org group IDs
		;WITH ChildOrgGroups (OrgGroupID, Level)
		AS
		(
			SELECT
				og.OrgGroupID, 0 AS Level
			FROM
				[V7].[OrgGroup] og
			INNER JOIN
				@ParentOrgGroupIDs pog ON pog.OrgGroupID = og.OrgGroupID
			WHERE
				og.UserAreaID = @UserAreaID AND og.ArchivedDate IS NULL

			UNION ALL

			SELECT
				og.OrgGroupID, Level + 1 AS Level
			FROM
				[V7].[OrgGroup] og
			INNER JOIN
				ChildOrgGroups cog ON cog.OrgGroupID = og.ParentID
			WHERE
				og.UserAreaID = @UserAreaID AND og.ArchivedDate IS NULL
		)

		-- Populate the return table with each org group ID
		INSERT INTO @ChildOrgGroupIDs SELECT OrgGroupID FROM ChildOrgGroups ORDER BY Level;
	END

	RETURN
END