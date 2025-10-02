CREATE TABLE [V7].[UserAreaRegion] (
    [UserAreaRegionID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]       INT NOT NULL,
    [RegionTypeID]     INT NOT NULL,
    [IsDefault]        BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaRegionID] ASC),
    CONSTRAINT [FK_UserAreaRegion_RegionType] FOREIGN KEY ([RegionTypeID]) REFERENCES [V7].[RegionType] ([RegionTypeID]),
    CONSTRAINT [FK_UserAreaRegion_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

