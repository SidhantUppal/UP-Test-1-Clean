CREATE TABLE [V7].[AnswerGridAnswerItem] (
    [AnswerGridAnswerItemID] INT            IDENTITY (1, 1) NOT NULL,
    [AnswerGridID]           INT            NOT NULL,
    [AnswerGridAnswerID]     INT            NOT NULL,
    [AnswerGridQuestionID]   INT            NOT NULL,
    [Value]                  NVARCHAR (256) NULL,
    [Score]                  INT            NULL,
    [AnswerSeverity]         INT            DEFAULT ((0)) NOT NULL,
    [AnswerTypeID]           INT            DEFAULT ((3)) NOT NULL,
    [CreatedByUserID]        INT            NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]   INT            NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT            NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AnswerGridAnswerItemID] ASC),
    CONSTRAINT [FK_AnswerGridAnswerItem_AnswerGrid] FOREIGN KEY ([AnswerGridID]) REFERENCES [V7].[AnswerGrid] ([AnswerGridID]),
    CONSTRAINT [FK_AnswerGridAnswerItem_AnswerGridAnswer] FOREIGN KEY ([AnswerGridAnswerID]) REFERENCES [V7].[AnswerGridAnswer] ([AnswerGridAnswerID]),
    CONSTRAINT [FK_AnswerGridAnswerItem_AnswerGridQuestion] FOREIGN KEY ([AnswerGridQuestionID]) REFERENCES [V7].[AnswerGridQuestion] ([AnswerGridQuestionID]),
    CONSTRAINT [FK_AnswerGridAnswerItem_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AnswerGridAnswerItem_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AnswerGridAnswerItem_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

