CREATE TABLE [V7].[QuestionnaireTypeKeyFieldCategory] (
    [QuestionnaireTypeKeyFieldCategoryID] INT           NOT NULL,
    [ParentID]                            INT           NULL,
    [Reference]                           NVARCHAR (50) NULL,
    [QuestionnaireTypeKeyFieldCategoryTranslation] INT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([QuestionnaireTypeKeyFieldCategoryID] ASC)
);

