CREATE TABLE [V7].[AnswerGridQuestion] (
    [AnswerGridQuestionID] INT            IDENTITY (1, 1) NOT NULL,
    [AnswerGridID]         INT            NOT NULL,
    [QuestionTitle]        NVARCHAR (256) NULL,
    [OrderIndex]           INT            NOT NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AnswerGridQuestionID] ASC),
    CONSTRAINT [FK_AnswerGridQuestion_AnswerGrid] FOREIGN KEY ([AnswerGridID]) REFERENCES [V7].[AnswerGrid] ([AnswerGridID]),
    CONSTRAINT [FK_AnswerGridQuestion_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AnswerGridQuestion_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AnswerGridQuestion_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

