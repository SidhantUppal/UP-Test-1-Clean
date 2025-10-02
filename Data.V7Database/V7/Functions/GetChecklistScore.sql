
CREATE FUNCTION [V7].[GetChecklistScore]
(
    @ResponseJSON NVARCHAR(MAX),
    @QuestionID NVARCHAR(50)
)
RETURNS INT
AS
BEGIN
    RETURN CAST(JSON_VALUE(@ResponseJSON, '$.answers.' + @QuestionID + '.score') AS INT)
END