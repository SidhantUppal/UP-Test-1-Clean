
CREATE PROCEDURE [dbo].[uspTFTAsaveAccount]
	@pautTFTAid INT = 0 OUTPUT,
	@pintTUAid INT = NULL,
	@pintTFTAaccountId INT,
	@ptxtTFTAcompanyName VARCHAR(255),
	@ptxtTFTAaddress VARCHAR(255),
	@ptxtTFTApostcode VARCHAR(15),
	@ptxtTFTAtelephoneNumber VARCHAR(50),
	@ptxtTFTAbrokerName VARCHAR(255),
	@ptxtTFTAfusionBranch VARCHAR(50),
	@ptxtTFTAaccountStatus VARCHAR(50),
	@ptxtTFTAtransactionType VARCHAR(255),
	@pdatTFTAcreated DATETIME = NULL OUTPUT
AS
	-- See if we are updating or inserting
	IF @pautTFTAid = 0
	BEGIN
	
		SET @pdatTFTAcreated = GETDATE()
		-- Inserting a new record
		INSERT INTO
			[V7].[BCARMUserArea]
		(
			[UserAreaID],
			[BCARMUserAreaInternalID],
			[CompanyName],
			[Address],
			[Postcode],
			[TelephoneNumber],
			[BrokerName],
			[FusionBranch],
			[AccountStatus],
			[TransactionType],
			[CreatedDate]
		)
		SELECT
			@pintTUAid,
			@pintTFTAaccountId,
			@ptxtTFTAcompanyName,
			@ptxtTFTAaddress,
			@ptxtTFTApostcode,
			@ptxtTFTAtelephoneNumber,
			@ptxtTFTAbrokerName,
			@ptxtTFTAfusionBranch,
			@ptxtTFTAaccountStatus,
			@ptxtTFTAtransactionType,
			@pdatTFTAcreated
		
		-- Get the updated ID and created date
		SET	@pautTFTAid = SCOPE_IDENTITY()
	END
	ELSE
	BEGIN
		-- Update an existing record
		
		UPDATE
			[V7].[BCARMUserArea]
		SET
			[UserAreaID] = @pintTUAid,
			[BCARMUserAreaInternalID] = @pintTFTAaccountId,
			[CompanyName] = @ptxtTFTAcompanyName,
			[Address] = @ptxtTFTAaddress,
			[Postcode] = @ptxtTFTApostcode,
			[TelephoneNumber] = @ptxtTFTAtelephoneNumber,
			[BrokerName] = @ptxtTFTAbrokerName,
			[FusionBranch] = @ptxtTFTAfusionBranch,
			[AccountStatus] = @ptxtTFTAaccountStatus,
			[TransactionType] = @ptxtTFTAtransactionType
		WHERE
			[BCARMUserAreaID] = @pautTFTAid
			
		-- Populate the created datestamp, in case the
		-- calling code tries to use it
		SELECT
			@pdatTFTAcreated = [CreatedDate]
		FROM
			[V7].[BCARMUserArea] WITH (READUNCOMMITTED)
		WHERE
			[BCARMUserAreaID] = @pautTFTAid
	END
	
RETURN 0;