
CREATE PROCEDURE [dbo].[uspTFTAloadAccount]
	@pautTFTAid INT
AS
	SELECT
		[BCARMUserAreaID] AS autTFTAid,
		[UserAreaID] AS intTUAid,
		[BCARMUserAreaInternalID] AS intTFTAaccountId,
		[CompanyName] AS txtTFTAcompanyName,
		[Address] AS txtTFTAaddress,
		[Postcode] AS txtTFTApostcode,
		[TelephoneNumber] AS txtTFTAtelephoneNumber,
		[BrokerName] AS txtTFTAbrokerName,
		[FusionBranch] AS txtTFTAfusionBranch,
		[AccountStatus] AS txtTFTAaccountStatus,
		[TransactionType] AS txtTFTAtransactionType,
		[CreatedDate] AS datTFTAcreated
	FROM
		[V7].[BCARMUserArea]
	WHERE
		[BCARMUserAreaID] = @pautTFTAid

RETURN 0