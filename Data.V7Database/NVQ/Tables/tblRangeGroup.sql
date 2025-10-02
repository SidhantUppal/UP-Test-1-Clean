CREATE TABLE [NVQ].[tblRangeGroup] (
    [RangeGroupId] INT            IDENTITY (1, 1) NOT NULL,
    [GroupName]    NVARCHAR (100) NOT NULL,
    [Description]  NVARCHAR (500) NULL,
    [IsActive]     BIT            DEFAULT ((1)) NULL,
    [CreatedDate]  DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([RangeGroupId] ASC)
);

