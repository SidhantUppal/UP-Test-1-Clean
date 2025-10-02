CREATE TABLE [V7].[EmailFrequencyType] (
    [EmailFrequencyTypeID] INT           NOT NULL,
    [Reference]            NVARCHAR (50) NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([EmailFrequencyTypeID] ASC)
);

