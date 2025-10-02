CREATE TABLE [V7].[TextBlockAttachment] (
    [TextBlockAttachmentID]   INT IDENTITY (1, 1) NOT NULL,
    [AttachmentID]            INT NOT NULL,
    [TextBlockCollectionID]   INT NULL,
    [TextBlockID]             INT NULL,
    [IsPolicyLevelAttachment] BIT DEFAULT ((0)) NULL,
    PRIMARY KEY CLUSTERED ([TextBlockAttachmentID] ASC),
    CONSTRAINT [FK_TextBlock_TextBlock] FOREIGN KEY ([TextBlockID]) REFERENCES [V7].[TextBlock] ([TextBlockID]),
    CONSTRAINT [FK_TextBlockAttachment_Attachment (AttachmentID)] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_TextBlockAttachment_TextBlockCollection] FOREIGN KEY ([TextBlockCollectionID]) REFERENCES [V7].[TextBlockCollection] ([TextBlockCollectionID])
);

