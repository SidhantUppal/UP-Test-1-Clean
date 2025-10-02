CREATE TABLE [V7].[AbsenceAttachment] (
    [AbsenceAttachmentID]     INT            IDENTITY (1, 1) NOT NULL,
    [AbsenceID]               INT            NOT NULL,
    [AttachmentID]            INT            NOT NULL,
    [AbsenceAttachmentTypeID] INT            NOT NULL,
    [AbsenceTaskID]           INT            NULL,
    [Reference]               NVARCHAR (50)  NULL,
    [Title]                   NVARCHAR (255) NULL,
    [IsVerified]              BIT            NULL,
    [CreatedByUserID]         INT            NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]        INT            NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT            NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AbsenceAttachmentID] ASC),
    CONSTRAINT [FK_AbsenceAttachment_Absence] FOREIGN KEY ([AbsenceID]) REFERENCES [V7].[Absence] ([AbsenceID]),
    CONSTRAINT [FK_AbsenceAttachment_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_AbsenceAttachment_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceAttachment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AbsenceAttachment_AbsenceID_includes]
    ON [V7].[AbsenceAttachment]([AbsenceID] ASC)
    INCLUDE([AbsenceAttachmentID], [AttachmentID]);

