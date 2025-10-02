CREATE TABLE [V7].[CaseAttachment] (
    [CaseAttachmentID] INT      IDENTITY (1, 1) NOT NULL,
    [CaseID]           INT      NOT NULL,
    [AttachmentID]     INT      NOT NULL,
    [CreatedByUserID]  INT      NOT NULL,
    [CreatedDate]      DATETIMEOFFSET (7) NOT NULL,
    [ArchivedByUserID] INT      NULL,
    [ArchivedDate]     DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CaseAttachmentID] ASC),
    CONSTRAINT [FK_CaseAttachment_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CaseAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_CaseAttachment_Case] FOREIGN KEY ([CaseID]) REFERENCES [V7].[Case] ([CaseID]),
    CONSTRAINT [FK_CaseAttachment_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_CaseAttachment_CaseIDAttachmentID]
    ON [V7].[CaseAttachment]([CaseID] ASC, [AttachmentID] ASC);

