CREATE TABLE [dbo].[EmailAttachments] (
    [Id]          UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [EmailId]     UNIQUEIDENTIFIER NOT NULL,
    [FileName]    NVARCHAR (255)   NOT NULL,
    [ContentType] NVARCHAR (100)   NULL,
    [Size]        BIGINT           NULL,
    [FilePath]    NVARCHAR (500)   NULL,
    [BlobUrl]     NVARCHAR (500)   NULL,
    [CreatedAt]   DATETIME2 (7)    DEFAULT (getutcdate()) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([EmailId]) REFERENCES [dbo].[InboundEmails] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_EmailAttachments_EmailId]
    ON [dbo].[EmailAttachments]([EmailId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_EmailAttachments_FileName]
    ON [dbo].[EmailAttachments]([FileName] ASC);

