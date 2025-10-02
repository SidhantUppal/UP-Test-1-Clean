CREATE TABLE [V7].[HRTemplateCategory] (
    [HRTemplateCategoryID] INT      IDENTITY (1, 1) NOT NULL,
    [HRTemplateID]         INT      NOT NULL,
    [HRCategoryID]         INT      NOT NULL,
    [OrderNum]             TINYINT  NOT NULL,
    [IsMandatory]          BIT      DEFAULT ((0)) NOT NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HRTemplateCategoryID] ASC),
    CONSTRAINT [FK_HRTemplateCategory_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRTemplateCategory_HRCategory] FOREIGN KEY ([HRCategoryID]) REFERENCES [V7].[HRCategory] ([HRCategoryID]),
    CONSTRAINT [FK_HRTemplateCategory_HRTemplate] FOREIGN KEY ([HRTemplateID]) REFERENCES [V7].[HRTemplate] ([HRTemplateID]),
    CONSTRAINT [CK_HRTemplateCategory_Unique] UNIQUE NONCLUSTERED ([HRTemplateID] ASC, [HRCategoryID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_HRTemplateCategory_HRTemplateID_includes]
    ON [V7].[HRTemplateCategory]([HRTemplateID] ASC)
    INCLUDE([HRTemplateCategoryID], [HRCategoryID], [OrderNum], [IsMandatory]);

