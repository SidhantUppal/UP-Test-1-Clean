
CREATE PROCEDURE [dbo].[uspTFTUloadUser]
	@pautTFTUid INT
AS

	SELECT
		[BCARMUserID] AS autTFTUid,
		[UserID] AS intTUid,
		[EmployeeID] AS intTEid,
		[BCARMUserAreaID] AS intTFTAid,
		[BCARMUserInternalID] AS intTFTUfusionId,
		[Name] AS txtTFTUname,
		[Email] AS txtTFTUemail,
		[Password] AS txtTFTUpassword,
		[UserStatus] AS txtTFTUuserStatus,
		[TransactionType] AS txtTFTUtransactionType,
		[CreatedDate] AS datTFTUcreated
	FROM
		[V7].[BCARMUser]
	WHERE
		[BCARMUserID] = @pautTFTUid

RETURN 0;