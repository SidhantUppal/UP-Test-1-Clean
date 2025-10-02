CREATE TABLE [V7].[TaskEmployee] (
    [TaskEmployeeID]       INT                IDENTITY (1, 1) NOT NULL,
    [TaskID]               INT                NOT NULL,
    [EmployeeID]           INT                NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [AssignmentDate]       DATETIMEOFFSET (7) NOT NULL,
    [AssignmentType]       NVARCHAR (20)      NOT NULL,
    [StartDateTime]        DATETIMEOFFSET (7) NULL,
    [TimeSpentMinutes]     INT                DEFAULT ((0)) NULL,
    [NotificationSent]     BIT                DEFAULT ((0)) NULL,
    [NotificationSentDate] DATETIMEOFFSET (7) NULL,
    [AcknowledgedDate]     DATETIMEOFFSET (7) NULL,
    [CompletedByThisUser]  BIT                DEFAULT ((0)) NULL,
    [CompletionDate]       DATETIMEOFFSET (7) NULL,
    [Notes]                NVARCHAR (1024)    NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([TaskEmployeeID] ASC),
    CONSTRAINT [CK_TaskEmployee_AssignmentType] CHECK ([AssignmentType]='OpenClaimed' OR [AssignmentType]='Pool' OR [AssignmentType]='Single'),
    CONSTRAINT [CK_TaskEmployee_Notes] CHECK (len([Notes])<=(1024)),
    CONSTRAINT [CK_TaskEmployee_TimeSpent] CHECK ([TimeSpentMinutes]>=(0)),
    CONSTRAINT [FK_TaskEmployee_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskEmployee_EmployeeID]
    ON [V7].[TaskEmployee]([EmployeeID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_TaskEmployee_TaskID]
    ON [V7].[TaskEmployee]([TaskID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_TaskEmployee_UserAreaID]
    ON [V7].[TaskEmployee]([UserAreaID] ASC);

