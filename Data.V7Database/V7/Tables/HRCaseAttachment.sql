CREATE TABLE [V7].[HRCaseAttachment] (
    [HRCaseAttachmentID]       INT            IDENTITY (1, 1) NOT NULL,
    [HRCaseID]                 INT            NOT NULL,
    [AttachmentID]             INT            NOT NULL,
    [Reference]                NVARCHAR (50)  NULL,
    [Title]                    NVARCHAR (255) NULL,
    [BundleOrderNum]           INT            NULL,
    [CreatedByUserID]          INT            NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT            NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT            NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    [HRCaseAttachmentTypeID]   INT            NOT NULL,
    [HRCaseStatusTypeID]       INT            NULL,
    [HRCaseTaskID]             INT            NULL,
    [HRCaseMeetingID]          INT            NULL,
    [HRCaseEventID]            INT            NULL,
    [HRCaseTemplateCategoryID] INT            NULL,
    [AddedToBundleDate]        DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HRCaseAttachmentID] ASC),
    CONSTRAINT [FK_HRCaseAttachment_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_HRCaseAttachment_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseAttachment_HRCase] FOREIGN KEY ([HRCaseID]) REFERENCES [V7].[HRCase] ([HRCaseID]),
    CONSTRAINT [FK_HRCaseAttachment_HRCaseAttachmentType] FOREIGN KEY ([HRCaseAttachmentTypeID]) REFERENCES [V7].[HRCaseAttachmentType] ([HRCaseAttachmentTypeID]),
    CONSTRAINT [FK_HRCaseAttachment_HRCaseEvent] FOREIGN KEY ([HRCaseEventID]) REFERENCES [V7].[HRCaseEvent] ([HRCaseEventID]),
    CONSTRAINT [FK_HRCaseAttachment_HRCaseMeeting] FOREIGN KEY ([HRCaseMeetingID]) REFERENCES [V7].[HRCaseMeeting] ([HRCaseMeetingID]),
    CONSTRAINT [FK_HRCaseAttachment_HRCaseStatusType] FOREIGN KEY ([HRCaseStatusTypeID]) REFERENCES [V7].[HRCaseStatusType] ([HRCaseStatusTypeID]),
    CONSTRAINT [FK_HRCaseAttachment_HRCaseTask] FOREIGN KEY ([HRCaseTaskID]) REFERENCES [V7].[HRCaseTask] ([HRCaseTaskID]),
    CONSTRAINT [FK_HRCaseAttachment_HRCaseTemplateCategory] FOREIGN KEY ([HRCaseTemplateCategoryID]) REFERENCES [V7].[HRCaseTemplateCategory] ([HRCaseTemplateCategoryID]),
    CONSTRAINT [FK_HRCaseAttachment_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_HRCaseAttachment_HRCaseID_includes]
    ON [V7].[HRCaseAttachment]([HRCaseID] ASC)
    INCLUDE([HRCaseAttachmentID], [AttachmentID]);

