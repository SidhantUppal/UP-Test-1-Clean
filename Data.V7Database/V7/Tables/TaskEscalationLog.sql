CREATE TABLE [V7].[TaskEscalationLog] (
    [TaskEscalationLogID] INT      IDENTITY (1, 1) NOT NULL,
    [TaskID]              INT      NOT NULL,
    [EscalationType]      INT      NOT NULL,
    [DateTime]            DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([TaskEscalationLogID] ASC),
    CONSTRAINT [FK_TaskEscalationLog_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskEscalationLog_TaskID_includes]
    ON [V7].[TaskEscalationLog]([TaskID] ASC)
    INCLUDE([EscalationType], [DateTime]);

