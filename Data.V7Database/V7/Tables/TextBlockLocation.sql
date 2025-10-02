CREATE TABLE [V7].[TextBlockLocation] (
    [TextBlockLocationID] INT IDENTITY (1, 1) NOT NULL,
    [TextBlockID]         INT NOT NULL,
    [LocationID]          INT NOT NULL,
    PRIMARY KEY CLUSTERED ([TextBlockLocationID] ASC),
    CONSTRAINT [FK_TextBlockLocation_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_TextBlockLocation_TextBlock] FOREIGN KEY ([TextBlockID]) REFERENCES [V7].[TextBlock] ([TextBlockID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TextBlockLocation_TextBlockID_includes]
    ON [V7].[TextBlockLocation]([TextBlockID] ASC)
    INCLUDE([TextBlockLocationID], [LocationID]);

