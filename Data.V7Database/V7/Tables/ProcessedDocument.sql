CREATE TABLE [V7].[ProcessedDocument] (
    [ProcessedDocumentID]  INT             IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT             NOT NULL,
    [Title]                NVARCHAR (1024) NULL,
    [PlainText]            NVARCHAR (MAX)  NULL,
    [DocumentAttachmentID] INT             NULL,
    [DocumentURL]          NVARCHAR (2048) NULL,
    [CreatedByUserID]      INT             NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT             NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT             NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ProcessedDocumentID] ASC),
    CONSTRAINT [FK_ConvertedDocument_DocumentAttachment] FOREIGN KEY ([DocumentAttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_ProcessedDocument_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ProcessedDocument_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ProcessedDocument_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ProcessedDocument_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

