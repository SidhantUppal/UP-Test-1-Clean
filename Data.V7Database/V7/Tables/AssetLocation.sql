CREATE TABLE [V7].[AssetLocation] (
    [AssetLocationID] INT IDENTITY (1, 1) NOT NULL,
    [AssetID]         INT NOT NULL,
    [LocationID]      INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AssetLocationID] ASC)
);

