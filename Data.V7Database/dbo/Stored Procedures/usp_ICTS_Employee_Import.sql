
-- SET QUOTED_IDENTIFIER ON
CREATE PROCEDURE [dbo].[usp_ICTS_Employee_Import]
    @FilePath NVARCHAR(255),
    --@Delimiter CHAR(1),
	@IsDebugOnly BIT
AS
BEGIN
	
	IF OBJECT_ID(N'[dbo].[_ICTS_Import_Staging]', 'U') IS NOT NULL
	BEGIN
		Drop Table [dbo].[_ICTS_Import_Staging]
	END


	IF OBJECT_ID(N'[dbo].[_ICTS_Import]', 'U') IS NOT NULL
	BEGIN
		Drop Table [dbo].[_ICTS_Import]
	END

	-- If the tables don't exists
	IF OBJECT_ID(N'[dbo].[_ICTS_Import_Staging]', 'U') IS NULL
	BEGIN
		CREATE TABLE [dbo].[_ICTS_Import_Staging](
			[Employee_Name] [nvarchar](255) NOT NULL,
			[Employee_Reference] [nvarchar](255) NOT NULL,
			[Email] [nvarchar](255) NOT NULL,
			[Company_StartDate] [nvarchar](50) NOT NULL,
			[Reporting_Unit] [nvarchar] (255)
		) ON [PRIMARY]
	END;
	
	IF OBJECT_ID(N'[dbo].[_ICTS_Import]', 'U') IS NULL
	BEGIN
		CREATE TABLE [dbo].[_ICTS_Import](
			 [ID] [int] IDENTITY(1,1) NOT NULL,
			 [Employee_Name] [nvarchar](255) NOT NULL,
			 [Employee_Reference] [nvarchar](255) NOT NULL,	
			 [Email] [nvarchar](255) NOT NULL,
			 [Company_StartDate] DateTime NOT NULL, 
			 [UserID] int null,
			 [Action] int null
		  CONSTRAINT [PK__ICTS_Import] PRIMARY KEY CLUSTERED 
		 (
			 [ID] ASC
		 )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
		 ) ON [PRIMARY]
	END
	
    DECLARE @SQL NVARCHAR(MAX);

	Truncate table [dbo].[_ICTS_Import]
	Truncate table [dbo].[_ICTS_Import_Staging]

    -- Construct the dynamic SQL statement
    SET @SQL = N'
	SET DATEFORMAT dmy;

    BULK INSERT [Portal-V7].[dbo].[_ICTS_Import_Staging]
    FROM ''' + @FilePath + '''
    WITH
    (
        FIELDTERMINATOR = '',''
        ,ROWTERMINATOR = ''\n''
        ,FIRSTROW = 5
		,CODEPAGE = ''65001'' -- UTF-8 encoding
    );';

	-- Empty the tables for the next go.
	Truncate table [dbo].[_ICTS_Import_Staging]
	Truncate table [dbo].[_ICTS_Import]

	if(@IsDebugOnly = 1)
	begin
		PRINT 'Debug mode is ON';
		Print 'SQL = ' + @SQL
	end
	else
	BEGIN
		PRINT 'Debug mode is OFF';
		-- Execute the dynamic SQL
		Print 'Starting Import creation'
			
		--Load the data into staging table
		EXEC sp_executesql @SQL;
			
		-- Move the data to the main table
		INSERT INTO [dbo].[_ICTS_Import] ([Employee_Reference], [Employee_Name], [Email], [Company_StartDate])
		SELECT
		[Employee_Reference],
		[Employee_Name],
		[Email],
		TRY_CONVERT(DATETIME, [Company_StartDate], 103) AS Company_StartDate
		FROM [dbo].[_ICTS_Import_Staging];

	END	

END