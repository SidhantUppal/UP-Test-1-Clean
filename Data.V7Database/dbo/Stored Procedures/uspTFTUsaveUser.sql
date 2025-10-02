
CREATE PROCEDURE [dbo].[uspTFTUsaveUser]
	@pautTFTUid INT = 0 OUTPUT,
	@pintTUid INT = NULL,
	@pintTEid INT = NULL,
	@pintTFTAid INT = NULL,
	@pintTFTUfusionId INT,
	@ptxtTFTUname VARCHAR(100),
	@ptxtTFTUemail VARCHAR(50),
	@ptxtTFTUpassword VARCHAR(50),
	@ptxtTFTUuserStatus VARCHAR(50),
	@ptxtTFTUtransactionType VARCHAR(255),
	@pdatTFTUcreated DATETIME = NULL OUTPUT
AS

	-- See if we are updating or inserting
	IF @pautTFTUid = 0
	BEGIN
	
		SET @pdatTFTUcreated = GETDATE()
		-- Inserting a new record
		INSERT INTO
			[V7].[BCARMUser]
		(
			[UserID],
			[EmployeeID],
			[BCARMUserAreaID],
			[BCARMUserInternalID],
			[Name],
			[Email],
			[Password],
			[UserStatus],
			[TransactionType],
			[CreatedDate]
		)
		SELECT
			@pintTUid,
			@pintTEid,
			@pintTFTAid,
			@pintTFTUfusionId,
			@ptxtTFTUname,
			@ptxtTFTUemail,
			@ptxtTFTUpassword,
			@ptxtTFTUuserStatus,
			@ptxtTFTUtransactionType,
			@pdatTFTUcreated
		
		-- Get the updated ID and created date
		SET	@pautTFTUid = SCOPE_IDENTITY()
	END
	ELSE
	BEGIN
		-- Update an existing record
		
		UPDATE
			[V7].[BCARMUser]
		SET
			[UserID] = @pintTUid,
			[EmployeeID] = @pintTEid,
			[BCARMUserAreaID] = @pintTFTAid,
			[BCARMUserInternalID] = @pintTFTUfusionId,
			[Name] = @ptxtTFTUname,
			[Email] = @ptxtTFTUemail,
			[Password] = @ptxtTFTUpassword,
			[UserStatus] = @ptxtTFTUuserStatus,
			[TransactionType] = @ptxtTFTUtransactionType
		WHERE
			[BCARMUserID] = @pautTFTUid
			
		-- Populate the created datestamp, in case the
		-- calling code tries to use it
		SELECT
			@pdatTFTUcreated = [CreatedDate]
		FROM
			[V7].[BCARMUser] WITH (READUNCOMMITTED)
		WHERE
			[BCARMUserID] = @pautTFTUid
	END
	
RETURN 0;