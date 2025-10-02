
CREATE PROCEDURE [dbo].[uspTFTEloadError]
	@pautTFTEid INT
AS

	SELECT
		[BCARMErrorID] AS autTFTEid,
		[BCARMUserInternalID] AS intTFTEfusionid,
		[BCARMUserAreaInternalID] AS intTFTEaccountid,
		[PersonalMessage] AS txtTFTEpersonalMessage,
		[ExceptionType] AS txtTFTEexceptionType,
		[ExceptionMessage] AS txtTFTEexceptionMessage,
		[Exception] AS txtTFTEexception,
		[CreatedDate] AS datTFTEcreated
	FROM
		[V7].[BCARMError]
	WHERE
		[BCARMErrorID] = @pautTFTEid
		
RETURN 0;