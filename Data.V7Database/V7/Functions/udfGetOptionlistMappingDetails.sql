create FUNCTION [V7].[udfGetOptionlistMappingDetails](@Title varchar(300),@questionnaireID int)
RETURNS INT
AS
BEGIN
     DECLARE @Result INT
   
	   SET @Result = (SELECT TOP (1) O.OptionListItemID
	                  FROM   [V7].[OptionListItemTranslation] AS OT 
					  INNER JOIN [V7].[OptionListItem] AS O  ON OT.OptionListItemID = O.OptionListItemID
					  join t100.OptionList m ON o.OptionListID = m.OptionListID
					  WHERE OT.[Text] = @Title and m.QuestionnaireID = @questionnaireID
					  )
	
	RETURN @Result
END