CREATE TABLE [V7].[TribunalCaseAttachmentNote] (
    [TribunalCaseAttachmentNoteID] INT            IDENTITY (1, 1) NOT NULL,
    [TribunalCaseAttachmentID]     INT            NOT NULL,
    [Note]                         NVARCHAR (MAX) NOT NULL,
    [CreatedByUserID]              INT            NOT NULL,
    [CreatedDate]                  DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([TribunalCaseAttachmentNoteID] ASC),
    CONSTRAINT [FK_TribunalCaseAttachmentNote_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseAttachmentNote_TribunalCaseAttachment] FOREIGN KEY ([TribunalCaseAttachmentID]) REFERENCES [V7].[TribunalCaseAttachment] ([TribunalCaseAttachmentID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TribunalCaseAttachmentNote_TribunalCaseAttachment]
    ON [V7].[TribunalCaseAttachmentNote]([TribunalCaseAttachmentID] ASC)
    INCLUDE([Note], [CreatedByUserID], [CreatedDate]);

