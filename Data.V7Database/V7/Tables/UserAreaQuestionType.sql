CREATE TABLE [V7].[UserAreaQuestionType] (
    [UserAreaQuestionTypeID] INT            NOT NULL,
    [UserAreaID]             INT            NOT NULL,
    [FieldName]              NVARCHAR (250) NOT NULL,
    [OptionListID]           INT            NULL,
    [AnswerTypeID]           INT            NOT NULL,
    [AccidentFormTypeID]     INT            DEFAULT ((6)) NOT NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaQuestionTypeID] ASC),
    CONSTRAINT [FK_UserAreaQuestionType_AccidentFormTypeID] FOREIGN KEY ([AccidentFormTypeID]) REFERENCES [V7].[AccidentFormType] ([AccidentFormTypeID]),
    CONSTRAINT [FK_UserAreaQuestionType_AnswerTypeID] FOREIGN KEY ([AnswerTypeID]) REFERENCES [V7].[AnswerType] ([AnswerTypeID]),
    CONSTRAINT [FK_UserAreaQuestionType_OptionListID] FOREIGN KEY ([OptionListID]) REFERENCES [V7].[OptionList] ([OptionListID]),
    CONSTRAINT [FK_UserAreaQuestionType_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

