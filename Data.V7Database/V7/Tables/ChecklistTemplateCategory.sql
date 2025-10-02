CREATE TABLE [V7].[ChecklistTemplateCategory] (
    [ChecklistTemplateCategoryID] INT IDENTITY (1, 1) NOT NULL,
    [ChecklistTemplateID]         INT NOT NULL,
    [CategoryTypeID]              INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ChecklistTemplateCategoryID] ASC),
    CONSTRAINT [FK_ChecklistTemplateCategory_Category] FOREIGN KEY ([CategoryTypeID]) REFERENCES [V7].[CategoryType] ([CategoryTypeID]),
    CONSTRAINT [FK_ChecklistTemplateCategory_ChecklistTemplate] FOREIGN KEY ([ChecklistTemplateID]) REFERENCES [V7].[ChecklistTemplate] ([ChecklistTemplateID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ChecklistTemplateCategory_CategoryTypeID]
    ON [V7].[ChecklistTemplateCategory]([CategoryTypeID] ASC)
    INCLUDE([ChecklistTemplateCategoryID], [ChecklistTemplateID]);


GO
CREATE NONCLUSTERED INDEX [IX_ChecklistTemplateCategory_ChecklistTemplateID]
    ON [V7].[ChecklistTemplateCategory]([ChecklistTemplateID] ASC)
    INCLUDE([ChecklistTemplateCategoryID], [CategoryTypeID]);

