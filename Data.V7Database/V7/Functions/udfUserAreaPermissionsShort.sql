
CREATE FUNCTION [V7].[udfUserAreaPermissionsShort]
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
    IF @UserAreaID IS NULL
    BEGIN
    INSERT INTO @returntable
    (
        PermissionID,
        ParentID
    )
    SELECT
        PermissionID,
        ParentID 
      FROM
        [V7].[udfUserAreaPermissionsShortVoid]()
    END
    ELSE
    BEGIN
    INSERT INTO @returntable
    (
        PermissionID,
        ParentID
    )
    SELECT
        PermissionID,
        ParentID 
      FROM
        [V7].[udfUserAreaPermissionsShortId](@UserAreaID)
    END
    RETURN
END