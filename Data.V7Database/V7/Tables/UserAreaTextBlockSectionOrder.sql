CREATE TABLE [V7].[UserAreaTextBlockSectionOrder] (
    [UserAreaTextBlockSectionOrderID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                      INT NOT NULL,
    [TextBlockSectionID]              INT NOT NULL,
    [OrderNum]                        INT NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaTextBlockSectionOrderID] ASC),
    CONSTRAINT [FK_UserAreaTextBlockSectionOrder_TextBlockSection] FOREIGN KEY ([TextBlockSectionID]) REFERENCES [V7].[TextBlockSection] ([TextBlockSectionID]),
    CONSTRAINT [FK_UserAreaTextBlockSectionOrder_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [CK_UserAreaTextBlockSectionOrder_UserAreaTextBlockSection] UNIQUE NONCLUSTERED ([UserAreaID] ASC, [TextBlockSectionID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaTextBlockSectionOrder_UserAreaTextBlockSection]
    ON [V7].[UserAreaTextBlockSectionOrder]([UserAreaID] ASC, [TextBlockSectionID] ASC)
    INCLUDE([OrderNum]);

