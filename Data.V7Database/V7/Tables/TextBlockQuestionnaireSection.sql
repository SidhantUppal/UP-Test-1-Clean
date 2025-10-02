CREATE TABLE [V7].[TextBlockQuestionnaireSection] (
    [TextBlockQuestionnaireSectionID] INT      IDENTITY (1, 1) NOT NULL,
    [TextBlockID]                     INT      NOT NULL,
    [QuestionnaireSectionID]          INT      NOT NULL,
    [QuestionnaireResponseID]         INT      NULL,
    [OrderNum]                        INT      NOT NULL,
    [CreatedByUserID]                 INT      NOT NULL,
    [CreatedDate]                     DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]            INT      NULL,
    [ModifiedDate]                DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]                INT      NULL,
    [ArchivedDate]                    DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TextBlockQuestionnaireSectionID] ASC),
    CONSTRAINT [FK_TextBlockQuestionnaireSection_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TextBlockQuestionnaireSection_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TextBlockQuestionnaireSection_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TextBlockQuestionnaireSection_QuestionnaireResponse] FOREIGN KEY ([QuestionnaireResponseID]) REFERENCES [V7].[QuestionnaireResponse] ([QuestionnaireResponseID]),
    CONSTRAINT [FK_TextBlockQuestionnaireSection_QuestionnaireSection] FOREIGN KEY ([QuestionnaireSectionID]) REFERENCES [V7].[QuestionnaireSection] ([QuestionnaireSectionID]),
    CONSTRAINT [FK_TextBlockQuestionnaireSection_TextBlock] FOREIGN KEY ([TextBlockID]) REFERENCES [V7].[TextBlock] ([TextBlockID])
);

