CREATE TABLE [V7].[TaskAttachment] (
    [TaskAttachmentID] INT      IDENTITY (1, 1) NOT NULL,
    [TaskID]           INT      NOT NULL,
    [AttachmentID]     INT      NOT NULL,
    [CreatedByUserID]  INT      NOT NULL,
    [CreatedDate]      DATETIMEOFFSET (7) NOT NULL,
    [ArchivedByUserID] INT      NULL,
    [ArchivedDate]     DATETIMEOFFSET (7) NULL,
    [TaskActivityID]   INT      NULL,
    PRIMARY KEY CLUSTERED ([TaskAttachmentID] ASC),
    CONSTRAINT [FK_TaskAttachment_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_TaskAttachment_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskAttachment_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [FK_TaskAttachment_TaskActivity] FOREIGN KEY ([TaskActivityID]) REFERENCES [V7].[TaskActivity] ([TaskActivityID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskAttachment_TaskIDAttachmentID]
    ON [V7].[TaskAttachment]([TaskID] ASC, [AttachmentID] ASC);

