CREATE TABLE [V7].[Questionnaire] (
    [QuestionnaireID]               INT          IDENTITY (1, 1) NOT NULL,
    [OriginalQuestionnaireID]       INT          NULL,
    [QuestionnaireTypeID]           INT          NOT NULL,
    [UserAreaID]                    INT          NULL,
    [Reference]                     VARCHAR (50) NULL,
    [PermissionKey]                 VARCHAR (50) NULL,
    [MajorVersion]                  INT          DEFAULT ((1)) NOT NULL,
    [MinorVersion]                  INT          DEFAULT ((0)) NOT NULL,
    [MaxScore]                      INT          NULL,
    [PassScore]                     INT          NULL,
    [QuestionnaireStatusTypeID]     INT          NOT NULL,
    [QuestionnaireDisclaimerTypeID] INT          NULL,
    [CreatedByUserID]               INT          NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]          INT          NULL,
    [ArchivedByUserID]              INT          NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([QuestionnaireID] ASC),
    CONSTRAINT [CK_Questionnaire_QuestionnaireDisclaimer] FOREIGN KEY ([QuestionnaireDisclaimerTypeID]) REFERENCES [V7].[QuestionnaireDisclaimerType] ([QuestionnaireDisclaimerTypeID]),
    CONSTRAINT [FK_Questionnaire_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Questionnaire_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Questionnaire_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Questionnaire_OriginalID] FOREIGN KEY ([OriginalQuestionnaireID]) REFERENCES [V7].[Questionnaire] ([QuestionnaireID]),
    CONSTRAINT [FK_Questionnaire_QuestionnaireType] FOREIGN KEY ([QuestionnaireTypeID]) REFERENCES [V7].[QuestionnaireType] ([QuestionnaireTypeID]),
    CONSTRAINT [FK_Questionnaire_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_Questionnaire_OriginalQuestionnaireID]
    ON [V7].[Questionnaire]([OriginalQuestionnaireID] ASC, [MajorVersion] DESC, [MinorVersion] DESC, [UserAreaID] ASC)
    INCLUDE([QuestionnaireStatusTypeID], [QuestionnaireDisclaimerTypeID]);


GO
CREATE NONCLUSTERED INDEX [IX_Questionnaire_OriginalQuestionnaireID_Simple]
    ON [V7].[Questionnaire]([OriginalQuestionnaireID] ASC);

