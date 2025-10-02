
CREATE FUNCTION [V7].[udfUserAreaPermissionsShortVoid] ()
RETURNS @returntable TABLE
(
    [PermissionID] INT NOT NULL,
    [ParentID] INT NULL
)
AS
BEGIN
-- Just select out all the permissions, as they aren't constrained by user area
        -- NOTE: This is very dangerous if you are populating a list of available permissions
        -- and not passing in a user area. Only call this function in a select when either
        -- you are joining to it, or if you are selecting data out, always provide a user area ID
        ;WITH ctePerm ([PermissionID], [ParentID]) AS
        (
            SELECT
                p.[PermissionID],
                p.[ParentID]			
            FROM
                [V7].[Permission] p
            WHERE
                p.ParentID IS NULL
            AND
                p.IsNotArchived=1
               
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
            ctePerm
    RETURN
END