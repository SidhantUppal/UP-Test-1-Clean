
CREATE PROCEDURE [dbo].[uspTFTAgetFusionThinkingUser]
	@pintTFTAid INT
AS

	SELECT
		tftu.[BCARMUserID] AS autTFTUid,
		tftu.[UserID] AS intTUid,
		tftu.[EmployeeID] AS intTEid,
		tftu.[BCARMUserAreaID] AS intTFTAid,
		tftu.[BCARMUserInternalID] AS intTFTUfusionId,
		tftu.[Name] AS txtTFTUname,
		tftu.[Email] AS txtTFTUemail,
		tftu.[Password] AS txtTFTUpassword,
		tftu.[UserStatus] AS txtTFTUuserStatus,
		tftu.[TransactionType] AS txtTFTUtransactionType,
		tftu.[CreatedDate] AS datTFTUcreated
	FROM
		[V7].[BCARMUser] tftu WITH (NOLOCK)
	WHERE
		tftu.[BCARMUserAreaID] = @pintTFTAid

RETURN 0