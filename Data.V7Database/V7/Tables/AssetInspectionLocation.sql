CREATE TABLE [V7].[AssetInspectionLocation] (
    [AssetInspectionLocationID] INT IDENTITY (1, 1) NOT NULL,
    [AssetInspectionID]         INT NOT NULL,
    [LocationID]                INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AssetInspectionLocationID] ASC)
);

