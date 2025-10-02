CREATE TABLE [V7].[AttachmentChild] (
    [AttachmentChildID]  INT            IDENTITY (1, 1) NOT NULL,
    [FolderID]           INT            NOT NULL,
    [FileName]           NVARCHAR (255) NOT NULL,
    [FileSize]           INT            NOT NULL,
    [ParentAttachmentID] INT            NULL,
    PRIMARY KEY CLUSTERED ([AttachmentChildID] ASC),
    CONSTRAINT [FK_AttachmentChild_Attachment] FOREIGN KEY ([ParentAttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID])
);

