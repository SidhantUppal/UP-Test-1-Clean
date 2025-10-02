CREATE FUNCTION [V7].[udfCheckQuestionnaireExists]
(
	@OriginalQuestionnaireID int,
	@QuestionnaireMajorVersion int,
	@QuestionnaireMinorVersion int
)
RETURNS BIT
AS
BEGIN
	-- NOTE: This is a check constraint for the [V7].[RiskAssessmentFormatType] to ensure they are linking to an existing
	-- set (either just the questionnaire ID or all three columns (or none))

	DECLARE @result BIT
	SET @result = 0

	-- First check if there is any info to actually check
	IF (@OriginalQuestionnaireID IS NULL)
		RETURN 1
	-- If they have set the questionnaire ID but not the versions, make sure the questionnaire ID exists
	-- NOTE: Can't do this with an FK, as OriginalQuestionnaireID is non-unique
	IF (@OriginalQuestionnaireID IS NOT NULL AND (@QuestionnaireMajorVersion IS NULL AND @QuestionnaireMinorVersion IS NULL))
		IF EXISTS (SELECT * FROM [V7].[Questionnaire] q WHERE q.[OriginalQuestionnaireID] = @OriginalQuestionnaireID)
			RETURN 1
	-- If all columns are set, make sure the record exists
	IF EXISTS (SELECT * FROM [V7].[Questionnaire] q WHERE q.[OriginalQuestionnaireID] = @OriginalQuestionnaireID AND q.[MajorVersion] = @QuestionnaireMajorVersion AND q.[MinorVersion] = @QuestionnaireMinorVersion)
		SET @result = 1
	RETURN @result
END