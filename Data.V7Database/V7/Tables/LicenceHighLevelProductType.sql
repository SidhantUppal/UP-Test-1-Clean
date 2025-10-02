CREATE TABLE [V7].[LicenceHighLevelProductType] (
    [LicenceProductTypeID]   INT IDENTITY (1, 1) NOT NULL,
    [LicenceID]              INT NOT NULL,
    [HighLevelProductTypeID] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([LicenceProductTypeID] ASC),
    CONSTRAINT [FK_LicenceProductType_HighLevelProductTypeID] FOREIGN KEY ([HighLevelProductTypeID]) REFERENCES [V7].[HighLevelProductType] ([HighLevelProductTypeID]),
    CONSTRAINT [FK_LicenceProductType_LicenceID] FOREIGN KEY ([LicenceID]) REFERENCES [V7].[Licence] ([LicenceID]),
    CONSTRAINT [CK_LicenceProductType_Unique] UNIQUE NONCLUSTERED ([LicenceID] ASC, [HighLevelProductTypeID] ASC)
);

