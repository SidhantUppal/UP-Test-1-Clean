CREATE TABLE [V7].[TribunalCaseEvent] (
    [TribunalCaseEventID]     INT      IDENTITY (1, 1) NOT NULL,
    [TribunalCaseID]          INT      NOT NULL,
    [TribunalCaseEventTypeID] INT      NOT NULL,
    [OrderNum]                INT      NULL,
    [EventDate]               DATETIMEOFFSET (7) NULL,
    [CompletedDate]           DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]         INT      NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]    INT      NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT      NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TribunalCaseEventID] ASC),
    CONSTRAINT [FK_TribunalCaseEvent_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseEvent_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseEvent_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseEvent_TribunalCase] FOREIGN KEY ([TribunalCaseID]) REFERENCES [V7].[TribunalCase] ([TribunalCaseID]),
    CONSTRAINT [FK_TribunalCaseEvent_TribunalCaseEventType] FOREIGN KEY ([TribunalCaseEventTypeID]) REFERENCES [V7].[TribunalCaseEventType] ([TribunalCaseEventTypeID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TribunalCaseEvent_TribunalCase]
    ON [V7].[TribunalCaseEvent]([TribunalCaseID] ASC)
    INCLUDE([TribunalCaseEventTypeID], [OrderNum], [EventDate], [CompletedDate]);

