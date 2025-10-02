CREATE TABLE [V7].[HRCaseEmail] (
    [HRCaseEmailID]                 INT      IDENTITY (1, 1) NOT NULL,
    [HRCaseID]                      INT      NOT NULL,
    [EmailMessageID]                INT      NOT NULL,
    [HRCategoryID]                  INT      NULL,
    [ImportanceGenericStatusTypeID] INT      NULL,
    [IsViewableByClient]            BIT      DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]               INT      NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]          INT      NULL,
    [ModifiedDate]              DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT      NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HRCaseEmailID] ASC),
    CONSTRAINT [FK_HRCaseEmail_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseEmail_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseEmail_EmailMessage] FOREIGN KEY ([EmailMessageID]) REFERENCES [V7].[EmailMessage] ([EmailMessageID]),
    CONSTRAINT [FK_HRCaseEmail_HRCase] FOREIGN KEY ([HRCaseID]) REFERENCES [V7].[HRCase] ([HRCaseID]),
    CONSTRAINT [FK_HRCaseEmail_HRCategory] FOREIGN KEY ([HRCategoryID]) REFERENCES [V7].[HRCategory] ([HRCategoryID]),
    CONSTRAINT [FK_HRCaseEmail_ImportanceGenericStatusType] FOREIGN KEY ([ImportanceGenericStatusTypeID]) REFERENCES [V7].[GenericStatusType] ([GenericStatusTypeID]),
    CONSTRAINT [FK_HRCaseEmail_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_HRCaseEmail_HRCaseID_includes]
    ON [V7].[HRCaseEmail]([HRCaseID] ASC)
    INCLUDE([HRCaseEmailID], [EmailMessageID]);

