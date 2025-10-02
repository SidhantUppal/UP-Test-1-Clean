CREATE TABLE [V7].[AnswerGrid] (
    [AnswerGridID]         INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT            NULL,
    [Reference]            NVARCHAR (255) NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [HideColumnHeadings]   BIT            DEFAULT ((0)) NOT NULL,
    [HideRowTitles]        BIT            DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([AnswerGridID] ASC),
    CONSTRAINT [FK_AnswerGrid_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AnswerGrid_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AnswerGrid_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AnswerGrid_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

