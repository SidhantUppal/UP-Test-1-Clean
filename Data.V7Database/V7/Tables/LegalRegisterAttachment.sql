CREATE TABLE [V7].[LegalRegisterAttachment] (
    [LegalRegisterAttachmentID] INT                IDENTITY (1, 1) NOT NULL,
    [LegalRegisterID]           INT                NOT NULL,
    [AttachmentID]              INT                NOT NULL,
    [CreatedByUserID]           INT                NOT NULL,
    [CreatedDate]               DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]      INT                NULL,
    [ModifiedDate]          DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]          INT                NULL,
    [ArchivedDate]              DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_LegalRegisterAttachment] PRIMARY KEY CLUSTERED ([LegalRegisterAttachmentID] ASC),
    CONSTRAINT [FK_LegalRegisterAttachment_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_LegalRegisterAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_LegalRegisterAttachment_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_LegalRegisterAttachment_LegalRegister] FOREIGN KEY ([LegalRegisterID]) REFERENCES [V7].[LegalRegister] ([LegalRegisterID]),
    CONSTRAINT [FK_LegalRegisterAttachment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_LegalRegisterAttachment_LegalRegisterID]
    ON [V7].[LegalRegisterAttachment]([LegalRegisterID] ASC) WHERE ([ArchivedDate] IS NULL);

