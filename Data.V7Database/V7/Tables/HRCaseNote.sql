CREATE TABLE [V7].[HRCaseNote] (
    [HRCaseNoteID]                  INT            IDENTITY (1, 1) NOT NULL,
    [Note]                          NVARCHAR (MAX) NOT NULL,
    [HRCaseID]                      INT            NOT NULL,
    [HRCaseStatusTypeID]            INT            NULL,
    [HRCategoryID]                  INT            NULL,
    [ImportanceGenericStatusTypeID] INT            NULL,
    [IsPrivate]                     BIT            DEFAULT ((0)) NOT NULL,
    [IsViewableByClient]            BIT            DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]               INT            NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]          INT            NULL,
    [ModifiedDate]              DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT            NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    [HRCaseMeetingID]               INT            NULL,
    [HRCaseEventID]                 INT            NULL,
    [HRCaseTemplateCategoryID]      INT            NULL,
    [RelatedUserIDList]             NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([HRCaseNoteID] ASC),
    CONSTRAINT [FK_HRCaseNote_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseNote_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseNote_HRCase] FOREIGN KEY ([HRCaseID]) REFERENCES [V7].[HRCase] ([HRCaseID]),
    CONSTRAINT [FK_HRCaseNote_HRCaseEvent] FOREIGN KEY ([HRCaseEventID]) REFERENCES [V7].[HRCaseEvent] ([HRCaseEventID]),
    CONSTRAINT [FK_HRCaseNote_HRCaseMeeting] FOREIGN KEY ([HRCaseMeetingID]) REFERENCES [V7].[HRCaseMeeting] ([HRCaseMeetingID]),
    CONSTRAINT [FK_HRCaseNote_HRCaseStatusType] FOREIGN KEY ([HRCaseStatusTypeID]) REFERENCES [V7].[HRCaseStatusType] ([HRCaseStatusTypeID]),
    CONSTRAINT [FK_HRCaseNote_HRCaseTemplateCategory] FOREIGN KEY ([HRCaseTemplateCategoryID]) REFERENCES [V7].[HRCaseTemplateCategory] ([HRCaseTemplateCategoryID]),
    CONSTRAINT [FK_HRCaseNote_HRCategory] FOREIGN KEY ([HRCategoryID]) REFERENCES [V7].[HRCategory] ([HRCategoryID]),
    CONSTRAINT [FK_HRCaseNote_ImportanceGenericStatusType] FOREIGN KEY ([ImportanceGenericStatusTypeID]) REFERENCES [V7].[GenericStatusType] ([GenericStatusTypeID]),
    CONSTRAINT [FK_HRCaseNote_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_HRCaseNote_HRCaseID_includes]
    ON [V7].[HRCaseNote]([HRCaseID] ASC)
    INCLUDE([HRCaseNoteID], [Note]);

