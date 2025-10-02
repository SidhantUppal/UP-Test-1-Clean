

CREATE PROCEDURE [dbo].[uspTFTAgetFusionThinkingAccount]
AS

	SELECT
		tfta.[BCARMUserAreaID] AS autTFTAid,
		tfta.[UserAreaID] AS intTUAid,
		tfta.[BCARMUserAreaInternalID] AS intTFTAaccountId,
		tfta.[CompanyName] AS txtTFTAcompanyName,
		tfta.[Address] AS txtTFTAaddress,
		tfta.[Postcode] AS txtTFTApostcode,
		tfta.[TelephoneNumber] AS txtTFTAtelephoneNumber,
		tfta.[BrokerName] AS txtTFTAbrokerName,
		tfta.[FusionBranch] AS txtTFTAfusionBranch,
		tfta.[AccountStatus] AS txtTFTAaccountStatus,
		tfta.[TransactionType] AS txtTFTAtransactionType,
		tfta.[CreatedDate] AS datTFTAcreated
	FROM
		[V7].[BCARMUserArea] tfta WITH (NOLOCK)

RETURN 0