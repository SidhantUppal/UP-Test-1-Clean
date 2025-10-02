CREATE TABLE [V7].[UserAreaAccidentQuestion] (
    [UserAreaAccidentQuestionID]         INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                         INT            NOT NULL,
    [AnswerTypeID]                       INT            NOT NULL,
    [AnswerTypeOptionsTable]             NVARCHAR (50)  NULL,
    [FieldName]                          VARCHAR (50)   NULL,
    [ChildFieldPrefix]                   VARCHAR (20)   NULL,
    [FieldOptions]                       NVARCHAR (255) NULL,
    [oldid]                              INT            NULL,
    [OriginalUserAreaAccidentQuestionID] INT            NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (255) NULL,
    [AnswerTypeOptionsList] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaAccidentQuestionID] ASC),
    CONSTRAINT [FK_UserAreaAccidentQuestion_AnswerType] FOREIGN KEY ([AnswerTypeID]) REFERENCES [V7].[AnswerType] ([AnswerTypeID]),
    CONSTRAINT [FK_UserAreaAccidentQuestion_OriginalID] FOREIGN KEY ([OriginalUserAreaAccidentQuestionID]) REFERENCES [V7].[UserAreaAccidentQuestion] ([UserAreaAccidentQuestionID]),
    CONSTRAINT [FK_UserAreaAccidentQuestion_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

