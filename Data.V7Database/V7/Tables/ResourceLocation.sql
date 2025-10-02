CREATE TABLE [V7].[ResourceLocation] (
    [ResourceLocationID] INT IDENTITY (1, 1) NOT NULL,
    [ResourceID]         INT NOT NULL,
    [LocationID]         INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ResourceLocationID] ASC),
    CONSTRAINT [FK_ResourceLocation_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_ResourceLocation_Resource] FOREIGN KEY ([ResourceID]) REFERENCES [V7].[Resource] ([ResourceID]),
    CONSTRAINT [CK_ResourceLocation_Unique] UNIQUE NONCLUSTERED ([ResourceID] ASC, [LocationID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_ResourceLocation_ResourceID_includes]
    ON [V7].[ResourceLocation]([ResourceID] ASC)
    INCLUDE([ResourceLocationID], [LocationID]);

