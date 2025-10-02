
CREATE PROCEDURE [dbo].[uspTFTAgetIdFromFusionAccountId]
	@pintTFTAaccountId INT
AS
	
	SET NOCOUNT ON
	
	SELECT
		ISNULL(tfta.BCARMUserAreaID, 0) AS autTFTAid
	FROM
		[V7].[BCARMUserArea] tfta
	WHERE
		tfta.BCARMUserAreaInternalID = @pintTFTAaccountId
	
RETURN 0;