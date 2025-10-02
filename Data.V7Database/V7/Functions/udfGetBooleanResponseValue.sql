
create FUNCTION [V7].[udfGetBooleanResponseValue](@Name varchar(3))
RETURNS	INT
AS
BEGIN
     DECLARE @Result varchar(3)
		SET @Result = (
						CASE @Name 
							WHEN 'yes' THEN 1
							WHEN 'no'  THEN 0
							WHEN 'n/a' THEN NULL
							WHEN '' THEN NULL
						END
					)
	RETURN @Result
END