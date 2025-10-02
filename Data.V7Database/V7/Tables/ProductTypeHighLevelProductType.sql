CREATE TABLE [V7].[ProductTypeHighLevelProductType] (
    [ProductTypeHighLevelProductTypeID] INT IDENTITY (1, 1) NOT NULL,
    [HighLevelProductTypeID]            INT NOT NULL,
    [ProductTypeID]                     INT NOT NULL,
    CONSTRAINT [PK__ProductT__9A67BD90E83139A3] PRIMARY KEY CLUSTERED ([ProductTypeHighLevelProductTypeID] ASC),
    CONSTRAINT [FK_ProductTypeHighLevelProductType_HighLevelProductType] FOREIGN KEY ([HighLevelProductTypeID]) REFERENCES [V7].[HighLevelProductType] ([HighLevelProductTypeID]),
    CONSTRAINT [FK_ProductTypeHighLevelProductType_ProductType] FOREIGN KEY ([ProductTypeID]) REFERENCES [V7].[ProductType] ([ProductTypeID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ProductTypeHighLevelProductType_ProductType]
    ON [V7].[ProductTypeHighLevelProductType]([HighLevelProductTypeID] ASC, [ProductTypeID] ASC);

