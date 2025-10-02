CREATE TABLE [V7].[QuestionnaireResponseSignOff] (
    [QuestionnaireResponseSignOffID] INT     IDENTITY (1, 1) NOT NULL,
    [PrimaryQuestionnaireResponseID] INT     NOT NULL,
    [SignOffQuestionnaireResponseID] INT     NOT NULL,
    [OrderNum]                       TINYINT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([QuestionnaireResponseSignOffID] ASC),
    CONSTRAINT [FK_QuestionnaireResponseSignOff_PrimaryQuestionnaireResponse] FOREIGN KEY ([PrimaryQuestionnaireResponseID]) REFERENCES [V7].[QuestionnaireResponse] ([QuestionnaireResponseID]),
    CONSTRAINT [FK_QuestionnaireResponseSignOff_SignOffQuestionnaireResponse] FOREIGN KEY ([SignOffQuestionnaireResponseID]) REFERENCES [V7].[QuestionnaireResponse] ([QuestionnaireResponseID])
);


GO
CREATE NONCLUSTERED INDEX [IX_QuestionnaireResponseSignOff_SignOff]
    ON [V7].[QuestionnaireResponseSignOff]([PrimaryQuestionnaireResponseID] ASC)
    INCLUDE([SignOffQuestionnaireResponseID], [OrderNum]);

