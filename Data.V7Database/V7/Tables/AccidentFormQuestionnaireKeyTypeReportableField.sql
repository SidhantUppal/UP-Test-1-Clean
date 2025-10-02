CREATE TABLE [V7].[AccidentFormQuestionnaireKeyTypeReportableField] (
    [AccidentFormQuestionnaireKeyTypeReportableFieldID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                                        INT NULL,
    [AccidentFormTypeID]                                INT NOT NULL,
    [QuestionnaireTypeKeyFieldID]                       INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AccidentFormQuestionnaireKeyTypeReportableFieldID] ASC),
    CONSTRAINT [FK_AccidentFormQuestionnaireKeyTypeReportableField_AccidentFormTypeID] FOREIGN KEY ([AccidentFormTypeID]) REFERENCES [V7].[AccidentFormType] ([AccidentFormTypeID]),
    CONSTRAINT [FK_AccidentFormQuestionnaireKeyTypeReportableField_QuestionnaireTypeKeyFieldID] FOREIGN KEY ([QuestionnaireTypeKeyFieldID]) REFERENCES [V7].[QuestionnaireTypeKeyField] ([QuestionnaireTypeKeyFieldID]),
    CONSTRAINT [FK_AccidentFormQuestionnaireKeyTypeReportableField_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

