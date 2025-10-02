CREATE TABLE [V7].[ProcessExecution] (
    [ProcessExecutionID] INT                IDENTITY (1, 1) NOT NULL,
    [ProcessID]          INT                NOT NULL,
    [UserAreaID]         INT                NOT NULL,
    [ExecutionStatus]    NVARCHAR (50)      NOT NULL,
    [StartedByUserID]    INT                NOT NULL,
    [StartedDate]        DATETIMEOFFSET (7) NOT NULL,
    [CompletedDate]      DATETIMEOFFSET (7) NULL,
    [CurrentNodeID]      NVARCHAR (100)     NULL,
    [ExecutionData]      NVARCHAR (MAX)     NULL,
    [InputData]          NVARCHAR (MAX)     NULL,
    [OutputData]         NVARCHAR (MAX)     NULL,
    [ErrorMessage]       NVARCHAR (MAX)     NULL,
    [CreatedByUserID]    INT                NOT NULL,
    [CreatedDate]        DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    CONSTRAINT [PK_ProcessExecution] PRIMARY KEY CLUSTERED ([ProcessExecutionID] ASC),
    CONSTRAINT [CK_ProcessExecution_Status] CHECK ([ExecutionStatus]='Cancelled' OR [ExecutionStatus]='Paused' OR [ExecutionStatus]='Failed' OR [ExecutionStatus]='Completed' OR [ExecutionStatus]='Running'),
    CONSTRAINT [FK_ProcessExecution_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ProcessExecution_Process] FOREIGN KEY ([ProcessID]) REFERENCES [V7].[Process] ([ProcessID]),
    CONSTRAINT [FK_ProcessExecution_StartedBy] FOREIGN KEY ([StartedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ProcessExecution_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

