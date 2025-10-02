CREATE TABLE [V7].[AnswerGridAnswer] (
    [AnswerGridAnswerID]   INT            IDENTITY (1, 1) NOT NULL,
    [AnswerGridID]         INT            NOT NULL,
    [AnswerTitle]          NVARCHAR (256) NULL,
    [OrderIndex]           INT            NOT NULL,
    [AnswerTypeID]         INT            NOT NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AnswerGridAnswerID] ASC),
    CONSTRAINT [FK_AnswerGridAnswer_AnswerGrid] FOREIGN KEY ([AnswerGridID]) REFERENCES [V7].[AnswerGrid] ([AnswerGridID]),
    CONSTRAINT [FK_AnswerGridAnswer_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AnswerGridAnswer_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AnswerGridAnswer_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

