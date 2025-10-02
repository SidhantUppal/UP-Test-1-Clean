CREATE TABLE [V7].[HRCaseAttachmentNote] (
    [HRCaseAttachmentNoteID] INT            IDENTITY (1, 1) NOT NULL,
    [HRCaseAttachmentID]     INT            NOT NULL,
    [Note]                   NVARCHAR (MAX) NOT NULL,
    [CreatedByUserID]        INT            NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([HRCaseAttachmentNoteID] ASC),
    CONSTRAINT [FK_HRCaseAttachmentNote_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseAttachmentNote_HRCaseAttachment] FOREIGN KEY ([HRCaseAttachmentID]) REFERENCES [V7].[HRCaseAttachment] ([HRCaseAttachmentID])
);


GO
CREATE NONCLUSTERED INDEX [IX_HRCaseAttachmentNote_HRCaseAttachment]
    ON [V7].[HRCaseAttachmentNote]([HRCaseAttachmentID] ASC)
    INCLUDE([Note], [CreatedByUserID], [CreatedDate]);

