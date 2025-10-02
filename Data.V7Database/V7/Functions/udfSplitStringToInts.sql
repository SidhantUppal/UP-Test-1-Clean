CREATE FUNCTION [V7].[udfSplitStringToInts]
(
    @SourceString NVARCHAR(800), -- Can't be MAX, because CHARINDEX would return bigint instead of int
    @Delimiter NCHAR(1)
)
RETURNS @IntList TABLE
(
	intValue INT NOT NULL
)
AS
BEGIN 
	-- Only perform the CTE if we have values to search for
	IF (LEN(@SourceString) > 0)
	BEGIN
		;WITH cteSplit(stpos, endpos) 
		AS(
			SELECT
				0 AS stpos,
				CHARINDEX(@Delimiter, @SourceString) AS endpos
			UNION ALL
			SELECT
				endpos + 1,
				CHARINDEX(@Delimiter, @SourceString, endpos + 1)
			FROM
				cteSplit
			WHERE
				endpos > 0
		)
		INSERT INTO
			@IntList
		(
			intValue
		)
		SELECT
			CAST(SUBSTRING(@SourceString, stpos, COALESCE(NULLIF(endpos, 0), LEN(@SourceString) + 1) - stpos) AS INT)
		FROM
			cteSplit
	END
	RETURN
END