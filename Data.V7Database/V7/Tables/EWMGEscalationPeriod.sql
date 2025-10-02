CREATE TABLE [V7].[EWMGEscalationPeriod] (
    [EWMGEscalationPeriodID] INT      IDENTITY (1, 1) NOT NULL,
    [TaskTypeID]             INT      NOT NULL,
    [TaskSeverityID]         INT      NULL,
    [Tier1AlertDaysOverdue]  INT      NULL,
    [Tier2AlertDaysOverdue]  INT      NULL,
    [Tier3AlertDaysOverdue]  INT      NULL,
    [Tier4AlertDaysOverdue]  INT      NULL,
    [Tier5AlertDaysOverdue]  INT      NULL,
    [Tier6AlertDaysOverdue]  INT      NULL,
    [CreatedByUserID]        INT      NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]   INT      NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT      NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([EWMGEscalationPeriodID] ASC),
    CONSTRAINT [FK_EWMGEscalationPeriod_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EWMGEscalationPeriod_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EWMGEscalationPeriod_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EWMGEscalationPeriod_TaskSeverity] FOREIGN KEY ([TaskSeverityID]) REFERENCES [V7].[TaskSeverity] ([TaskSeverityID]),
    CONSTRAINT [FK_EWMGEscalationPeriod_TaskType] FOREIGN KEY ([TaskTypeID]) REFERENCES [V7].[TaskType] ([TaskTypeID])
);


GO
CREATE NONCLUSTERED INDEX [IX_EWMGEscalationPeriod_EscalationPeriod]
    ON [V7].[EWMGEscalationPeriod]([TaskTypeID] ASC, [TaskSeverityID] ASC)
    INCLUDE([Tier1AlertDaysOverdue], [Tier2AlertDaysOverdue], [Tier3AlertDaysOverdue], [Tier4AlertDaysOverdue], [Tier5AlertDaysOverdue], [Tier6AlertDaysOverdue]);

