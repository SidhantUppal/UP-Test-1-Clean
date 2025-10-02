CREATE TABLE [V7].[AttachmentUserArea] (
    [AttachmentUserAreaID] INT IDENTITY (1, 1) NOT NULL,
    [AttachmentID]         INT NOT NULL,
    [UserAreaID]           INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AttachmentUserAreaID] ASC),
    CONSTRAINT [FK_AttachmentUserArea_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_AttachmentUserArea_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [CK_AttachmentUserArea_Unique] UNIQUE NONCLUSTERED ([AttachmentID] ASC, [UserAreaID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_AttachmentUserArea_AttachmentID]
    ON [V7].[AttachmentUserArea]([AttachmentID] ASC)
    INCLUDE([AttachmentUserAreaID], [UserAreaID]);


GO
CREATE NONCLUSTERED INDEX [IX_AttachmentUserArea_UserAreaID]
    ON [V7].[AttachmentUserArea]([UserAreaID] ASC)
    INCLUDE([AttachmentUserAreaID], [AttachmentID]);

