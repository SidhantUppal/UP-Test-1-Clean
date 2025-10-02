CREATE TABLE [NVQ].[tblAssessmentDiaryLogType] (
    [LogTypeId]   INT            IDENTITY (1, 1) NOT NULL,
    [LogTypeName] NVARCHAR (50)  NOT NULL,
    [Description] NVARCHAR (200) NULL,
    [IsActive]    BIT            DEFAULT ((1)) NULL,
    PRIMARY KEY CLUSTERED ([LogTypeId] ASC)
);

