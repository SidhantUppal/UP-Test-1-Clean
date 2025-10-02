
CREATE PROCEDURE [dbo].[uspTFTUgetIdFromFusionUserId]
	@pintTFTUfusionId INT
AS
	SET NOCOUNT ON
	
	SELECT
		ISNULL(tftu.BCARMUserID, 0) AS autTFTUid
	FROM
		[V7].[BCARMUser] tftu
	WHERE
		tftu.BCARMUserInternalID = @pintTFTUfusionId
	
RETURN 0;