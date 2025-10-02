
CREATE FUNCTION [V7].[GetChecklistAnswer]
(
    @ResponseJSON NVARCHAR(MAX),
    @QuestionID NVARCHAR(50)
)
RETURNS NVARCHAR(MAX)
AS
BEGIN
    RETURN JSON_VALUE(@ResponseJSON, '$.answers.' + @QuestionID + '.value')
END