CREATE TABLE [V7].[ProcessStepExecution] (
    [ProcessStepExecutionID] INT                IDENTITY (1, 1) NOT NULL,
    [ProcessExecutionID]     INT                NOT NULL,
    [ProcessStepID]          INT                NOT NULL,
    [ExecutionStatus]        NVARCHAR (50)      NOT NULL,
    [StartedDate]            DATETIMEOFFSET (7) NULL,
    [CompletedDate]          DATETIMEOFFSET (7) NULL,
    [InputData]              NVARCHAR (MAX)     NULL,
    [OutputData]             NVARCHAR (MAX)     NULL,
    [ErrorMessage]           NVARCHAR (MAX)     NULL,
    [RetryCount]             INT                DEFAULT ((0)) NULL,
    [GeneratedTaskID]        INT                NULL,
    [EvidenceData]           NVARCHAR (MAX)     NULL,
    [CompletedByUserID]      INT                NULL,
    [CompletionNotes]        NVARCHAR (MAX)     NULL,
    CONSTRAINT [PK_ProcessStepExecution] PRIMARY KEY CLUSTERED ([ProcessStepExecutionID] ASC),
    CONSTRAINT [CK_ProcessStepExecution_Status] CHECK ([ExecutionStatus]='Skipped' OR [ExecutionStatus]='Failed' OR [ExecutionStatus]='Completed' OR [ExecutionStatus]='Running' OR [ExecutionStatus]='Pending'),
    CONSTRAINT [FK_ProcessStepExecution_CompletedBy] FOREIGN KEY ([CompletedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ProcessStepExecution_ProcessExecution] FOREIGN KEY ([ProcessExecutionID]) REFERENCES [V7].[ProcessExecution] ([ProcessExecutionID]),
    CONSTRAINT [FK_ProcessStepExecution_ProcessStep] FOREIGN KEY ([ProcessStepID]) REFERENCES [V7].[ProcessStep] ([ProcessStepID]),
    CONSTRAINT [FK_ProcessStepExecution_Task] FOREIGN KEY ([GeneratedTaskID]) REFERENCES [V7].[BSSTask] ([TaskID])
);

