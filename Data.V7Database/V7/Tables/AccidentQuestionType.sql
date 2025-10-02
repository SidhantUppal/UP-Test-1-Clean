CREATE TABLE [V7].[AccidentQuestionType] (
    [AccidentQuestionTypeID] INT           IDENTITY (1, 1) NOT NULL,
    [AnswerTypeID]           INT           NOT NULL,
    [AnswerTypeOptionsTable] NVARCHAR (50) NULL,
    [Title]                  NVARCHAR (255) NULL,
    [FieldName]              VARCHAR (50)  NULL,
    [ChildFieldPrefix]       VARCHAR (20)  NULL,
    [FieldOptions]           NVARCHAR (50) NULL,
    [UserAreaID]             INT           NULL,
    [Description]            NVARCHAR (255) NULL,
    [AnswerTypeOptionsList]  NVARCHAR (MAX) NULL,
    CONSTRAINT [PK__Accident__5F40EA35A57623CD] PRIMARY KEY CLUSTERED ([AccidentQuestionTypeID] ASC),
    CONSTRAINT [FK_AccidentQuestionType_AnswerType] FOREIGN KEY ([AnswerTypeID]) REFERENCES [V7].[AnswerType] ([AnswerTypeID]),
    CONSTRAINT [FK_AccidentQuestionType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

