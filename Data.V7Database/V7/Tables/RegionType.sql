CREATE TABLE [V7].[RegionType] (
    [RegionTypeID] INT            NOT NULL,
    [Title]        NVARCHAR (50)  NULL,
    [Description]  NVARCHAR (MAX) NULL,
    [Code]         NVARCHAR (10)  NULL,
    PRIMARY KEY CLUSTERED ([RegionTypeID] ASC)
);

