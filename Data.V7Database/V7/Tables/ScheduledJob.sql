CREATE TABLE [V7].[ScheduledJob] (
    [ScheduledJobID]       INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [JobName]              NVARCHAR (255)     NOT NULL,
    [JobDescription]       NVARCHAR (1000)    NULL,
    [JobType]              NVARCHAR (100)     NOT NULL,
    [IsActive]             BIT                DEFAULT ((1)) NOT NULL,
    [IsPaused]             BIT                DEFAULT ((0)) NOT NULL,
    [CronExpression]       NVARCHAR (100)     NOT NULL,
    [TimeZone]             NVARCHAR (100)     DEFAULT ('UTC') NOT NULL,
    [NextRunTime]          DATETIMEOFFSET (7) NULL,
    [LastRunTime]          DATETIMEOFFSET (7) NULL,
    [TargetService]        NVARCHAR (100)     NOT NULL,
    [TargetEndpoint]       NVARCHAR (500)     NOT NULL,
    [HttpMethod]           NVARCHAR (10)      DEFAULT ('POST') NOT NULL,
    [RequestHeaders]       NVARCHAR (MAX)     NULL,
    [RequestPayload]       NVARCHAR (MAX)     NULL,
    [TimeoutSeconds]       INT                DEFAULT ((30)) NOT NULL,
    [MaxRetries]           INT                DEFAULT ((3)) NOT NULL,
    [RetryDelaySeconds]    INT                DEFAULT ((60)) NOT NULL,
    [OnFailureNotify]      NVARCHAR (500)     NULL,
    [MaxExecutionsPerHour] INT                NULL,
    [MaxExecutionsPerDay]  INT                NULL,
    [ExecutionStartDate]   DATETIMEOFFSET (7) NULL,
    [ExecutionEndDate]     DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_ScheduledJob] PRIMARY KEY CLUSTERED ([ScheduledJobID] ASC),
    CONSTRAINT [CK_ScheduledJob_HttpMethod] CHECK ([HttpMethod]='DELETE' OR [HttpMethod]='PATCH' OR [HttpMethod]='PUT' OR [HttpMethod]='POST' OR [HttpMethod]='GET'),
    CONSTRAINT [CK_ScheduledJob_JobType] CHECK ([JobType]='report_generation' OR [JobType]='compliance_check' OR [JobType]='system_maintenance' OR [JobType]='email_digest' OR [JobType]='http_call'),
    CONSTRAINT [CK_ScheduledJob_MaxRetries] CHECK ([MaxRetries]>=(0) AND [MaxRetries]<=(10)),
    CONSTRAINT [CK_ScheduledJob_TimeoutSeconds] CHECK ([TimeoutSeconds]>(0) AND [TimeoutSeconds]<=(300)),
    CONSTRAINT [FK_ScheduledJob_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ScheduledJob_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ScheduledJob_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ScheduledJob_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ScheduledJob_IsActive_NextRunTime]
    ON [V7].[ScheduledJob]([IsActive] ASC, [NextRunTime] ASC) WHERE ([ArchivedDate] IS NULL AND [IsActive]=(1));


GO
CREATE NONCLUSTERED INDEX [IX_ScheduledJob_UserAreaID_ArchivedDate]
    ON [V7].[ScheduledJob]([UserAreaID] ASC, [ArchivedDate] ASC) WHERE ([ArchivedDate] IS NULL);

