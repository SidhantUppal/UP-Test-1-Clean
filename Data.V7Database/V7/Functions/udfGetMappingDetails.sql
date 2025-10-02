

CREATE FUNCTION [V7].[udfGetMappingDetails](@Name varchar(300), @UserAreaID INT,@OutPutType INT)
RETURNS VARCHAR(300)
AS
BEGIN
     DECLARE @Result varchar(300)
    IF(@OutPutType = 1)
	    SET @Result = (SELECT EmployeeID FROM [V7].[Employee] where NAME = @Name AND UserAreaID = @UserAreaID AND ArchivedDate IS NULL )
	ELSE IF (@OutPutType = 2)
	   SET @Result = (SELECT Email FROM [V7].[Employee] where NAME = @Name AND UserAreaID = @UserAreaID AND ArchivedDate IS NULL )
	ELSE IF (@OutPutType = 3)
	   SET @Result = (SELECT TOP (1) L.LocationID 
	                  FROM   [V7].[Location] AS L INNER JOIN [V7].[LocationTranslation] AS LT
	                  ON L.LocationID = LT.LocationID
					  where L.[UserAreaID] = @UserAreaID AND LT.Title = @Name
					  )
	ELSE IF (@OutPutType = 4)
	   SET @Result = (SELECT UserID FROM [V7].[User] where fullname = @Name AND MasterUserAreaID = @UserAreaID AND LastLoginDate IS NOT NULL )
	RETURN @Result
END