CREATE TABLE [V7].[JobExecution] (
    [JobExecutionID]       INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [ScheduledJobID]       INT                NOT NULL,
    [ExecutionStartTime]   DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ExecutionEndTime]     DATETIMEOFFSET (7) NULL,
    [ExecutionDurationMs]  INT                NULL,
    [ExecutionStatus]      NVARCHAR (50)      DEFAULT ('running') NOT NULL,
    [AttemptNumber]        INT                DEFAULT ((1)) NOT NULL,
    [IsRetry]              BIT                DEFAULT ((0)) NOT NULL,
    [RequestUrl]           NVARCHAR (1000)    NOT NULL,
    [RequestMethod]        NVARCHAR (10)      NOT NULL,
    [RequestHeaders]       NVARCHAR (MAX)     NULL,
    [RequestPayload]       NVARCHAR (MAX)     NULL,
    [ResponseStatusCode]   INT                NULL,
    [ResponseHeaders]      NVARCHAR (MAX)     NULL,
    [ResponseBody]         NVARCHAR (MAX)     NULL,
    [ResponseTimeMs]       INT                NULL,
    [ErrorMessage]         NVARCHAR (2000)    NULL,
    [ErrorStackTrace]      NVARCHAR (MAX)     NULL,
    [ErrorCode]            NVARCHAR (100)     NULL,
    [MemoryUsageMB]        DECIMAL (10, 2)    NULL,
    [CpuUsagePercent]      DECIMAL (5, 2)     NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_JobExecution] PRIMARY KEY CLUSTERED ([JobExecutionID] ASC),
    CONSTRAINT [CK_JobExecution_AttemptNumber] CHECK ([AttemptNumber]>=(1) AND [AttemptNumber]<=(10)),
    CONSTRAINT [CK_JobExecution_ExecutionStatus] CHECK ([ExecutionStatus]='skipped' OR [ExecutionStatus]='cancelled' OR [ExecutionStatus]='timeout' OR [ExecutionStatus]='failed' OR [ExecutionStatus]='completed' OR [ExecutionStatus]='running'),
    CONSTRAINT [FK_JobExecution_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_JobExecution_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_JobExecution_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_JobExecution_ScheduledJob] FOREIGN KEY ([ScheduledJobID]) REFERENCES [V7].[ScheduledJob] ([ScheduledJobID]),
    CONSTRAINT [FK_JobExecution_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_JobExecution_ScheduledJobID_ExecutionStartTime]
    ON [V7].[JobExecution]([ScheduledJobID] ASC, [ExecutionStartTime] DESC);


GO
CREATE NONCLUSTERED INDEX [IX_JobExecution_UserAreaID_ExecutionStatus]
    ON [V7].[JobExecution]([UserAreaID] ASC, [ExecutionStatus] ASC) WHERE ([ArchivedDate] IS NULL);

