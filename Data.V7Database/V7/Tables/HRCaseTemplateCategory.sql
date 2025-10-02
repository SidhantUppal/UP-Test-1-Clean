CREATE TABLE [V7].[HRCaseTemplateCategory] (
    [HRCaseTemplateCategoryID] INT      IDENTITY (1, 1) NOT NULL,
    [HRCaseID]                 INT      NOT NULL,
    [HRTemplateCategoryID]     INT      NOT NULL,
    [IsSkipped]                BIT      DEFAULT ((0)) NOT NULL,
    [CompletedDate]            DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]          INT      NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT      NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT      NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HRCaseTemplateCategoryID] ASC),
    CONSTRAINT [FK_HRCaseTemplateCategory_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseTemplateCategory_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseTemplateCategory_HRCase] FOREIGN KEY ([HRCaseID]) REFERENCES [V7].[HRCase] ([HRCaseID]),
    CONSTRAINT [FK_HRCaseTemplateCategory_HRTemplateCategory] FOREIGN KEY ([HRTemplateCategoryID]) REFERENCES [V7].[HRTemplateCategory] ([HRTemplateCategoryID]),
    CONSTRAINT [FK_HRCaseTemplateCategory_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_HRCaseTemplateCategory_includes]
    ON [V7].[HRCaseTemplateCategory]([HRCaseID] ASC, [HRTemplateCategoryID] ASC)
    INCLUDE([HRCaseTemplateCategoryID], [CompletedDate]);

