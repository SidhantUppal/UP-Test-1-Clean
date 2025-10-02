CREATE TABLE [V7].[District] (
    [DistrictID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID] INT            NOT NULL,
    [Name]       NVARCHAR (512) NOT NULL,
    PRIMARY KEY CLUSTERED ([DistrictID] ASC)
);

