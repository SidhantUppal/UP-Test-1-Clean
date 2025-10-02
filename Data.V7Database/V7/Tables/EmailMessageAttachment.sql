CREATE TABLE [V7].[EmailMessageAttachment] (
    [EmailMessageAttachmentID] INT             IDENTITY (1, 1) NOT NULL,
    [EmailMessageID]           INT             NOT NULL,
    [ContentType]              NVARCHAR (100)  NOT NULL,
    [FileName]                 NVARCHAR (255)  NOT NULL,
    [FileSize]                 INT             NOT NULL,
    [FileBytes]                VARBINARY (MAX) NOT NULL,
    PRIMARY KEY CLUSTERED ([EmailMessageAttachmentID] ASC),
    CONSTRAINT [FK_EmailMessageAttachment_EmailMessage] FOREIGN KEY ([EmailMessageID]) REFERENCES [V7].[EmailMessage] ([EmailMessageID])
);

