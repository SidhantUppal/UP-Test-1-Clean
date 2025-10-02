

create FUNCTION [V7].[udfGetBodyAndInjuryMappingDetails](@Title VARCHAR(300), @UserAreaID INT,@OutPutType INT)
RETURNS INT
AS
BEGIN
    DECLARE @Result INT
   IF(@OutPutType = 1)
	    SET @Result = (SELECT B.[BodyPartID] FROM [V7].[BodyPart] b JOIN [V7].[BodyPartTranslation] bt on b.[BodyPartID] = bt.[BodyPartID] WHERE bt.Title = @Title AND b.UserAreaID = @UserAreaID )
	ELSE IF (@OutPutType = 2)
	   SET @Result = (SELECT I.InjuryTypeID FROM [V7].[InjuryType] I JOIN [V7].[InjuryTypeTranslation] It on I.InjuryTypeID = It.InjuryTypeID WHERE [Title] = @Title AND UserAreaID = @UserAreaID )
	RETURN @Result
END