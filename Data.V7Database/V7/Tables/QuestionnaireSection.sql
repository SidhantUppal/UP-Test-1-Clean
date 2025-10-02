CREATE TABLE [V7].[QuestionnaireSection] (
    [QuestionnaireSectionID]              INT          IDENTITY (1, 1) NOT NULL,
    [QuestionnaireID]                     INT          NOT NULL,
    [Reference]                           VARCHAR (50) NULL,
    [UserAreaID]                          INT          NULL,
    [OrderNum]                            INT          NOT NULL,
    [ShowByDefault]                       BIT          DEFAULT ((1)) NOT NULL,
    [ShowSlideTitle]                      BIT          DEFAULT ((1)) NOT NULL,
    [QuestionnaireTypeKeyFieldCategoryID] INT          NULL,
    [CreatedByUserID]                     INT          NOT NULL,
    [CreatedDate]                         DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]                INT          NULL,
    [ArchivedByUserID]                    INT          NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [HelpText] NVARCHAR (MAX) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([QuestionnaireSectionID] ASC),
    CONSTRAINT [FK_QuestionnaireSection_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionnaireSection_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionnaireSection_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionnaireSection_Questionnaire] FOREIGN KEY ([QuestionnaireID]) REFERENCES [V7].[Questionnaire] ([QuestionnaireID]),
    CONSTRAINT [FK_QuestionnaireSection_QuestionnaireTypeKeyFieldCategoryID] FOREIGN KEY ([QuestionnaireTypeKeyFieldCategoryID]) REFERENCES [V7].[QuestionnaireTypeKeyFieldCategory] ([QuestionnaireTypeKeyFieldCategoryID]),
    CONSTRAINT [FK_QuestionnaireSection_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_QuestionnaireSection_QuestionnaireID]
    ON [V7].[QuestionnaireSection]([QuestionnaireID] ASC, [ArchivedDate] ASC, [UserAreaID] ASC)
    INCLUDE([Reference], [OrderNum], [ShowByDefault], [ShowSlideTitle], [QuestionnaireTypeKeyFieldCategoryID]);

