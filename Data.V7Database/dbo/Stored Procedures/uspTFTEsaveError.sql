
CREATE PROCEDURE [dbo].[uspTFTEsaveError]
	@pautTFTEid INT = 0 OUTPUT,
	@pintTFTEfusionid INT = NULL,
	@pintTFTEaccountid INT = NULL,
	@ptxtTFTEpersonalMessage VARCHAR(MAX),
	@ptxtTFTEexceptionType VARCHAR(MAX),
	@ptxtTFTEexceptionMessage VARCHAR(MAX),
	@ptxtTFTEexception VARCHAR(MAX),
	@pdatTFTEcreated DATETIME = NULL OUTPUT
AS

	-- See if we are updating or inserting
	IF @pautTFTEid = 0
	BEGIN
	
		SET @pdatTFTEcreated = GETDATE()
		-- Inserting a new record
		INSERT INTO
			[V7].[BCARMError]
		(
			[BCARMUserInternalID],
			[BCARMUserAreaInternalID],
			[PersonalMessage],
			[ExceptionType],
			[ExceptionMessage],
			[Exception],
			[CreatedDate]
		)
		SELECT
			@pintTFTEfusionid,
			@pintTFTEaccountid,
			@ptxtTFTEpersonalMessage,
			@ptxtTFTEexceptionType,
			@ptxtTFTEexceptionMessage,
			@ptxtTFTEexception,
			@pdatTFTEcreated
		
		-- Get the updated ID and created date
		SET	@pautTFTEid = SCOPE_IDENTITY()
	END
	ELSE
	BEGIN
		-- Update an existing record
		
		UPDATE
			[V7].[BCARMError]
		SET
			[BCARMUserInternalID] = @pintTFTEfusionid,
			[BCARMUserAreaInternalID] = @pintTFTEaccountid,
			[PersonalMessage] = @ptxtTFTEpersonalMessage,
			[ExceptionType] = @ptxtTFTEexceptionType,
			[ExceptionMessage] = @ptxtTFTEexceptionMessage,
			[Exception] = @ptxtTFTEexception
		WHERE
			[BCARMErrorID] = @pautTFTEid
			
		-- Populate the created datestamp, in case the
		-- calling code tries to use it
		SELECT
			@pdatTFTEcreated = [CreatedDate]
		FROM
			[V7].[BCARMError] WITH (READUNCOMMITTED)
		WHERE
			[BCARMErrorID] = @pautTFTEid
	END
	
RETURN 0;