CREATE TABLE [V7].[TaskReassignmentLog] (
    [TaskReassignmentLogID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]            INT            NOT NULL,
    [TaskID]                INT            NULL,
    [TaskScheduleID]        INT            NULL,
    [PreviousEmployeeIDs]   NVARCHAR (256) NULL,
    [CurrentEmployeeIDs]    NVARCHAR (256) NULL,
    [ReassignmentNotes]     NVARCHAR (MAX) NOT NULL,
    [CreatedByUserID]       INT            NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([TaskReassignmentLogID] ASC),
    CONSTRAINT [FK_TaskReassignmentLog_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskReassignmentLog_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [FK_TaskReassignmentLog_TaskSchedule] FOREIGN KEY ([TaskScheduleID]) REFERENCES [V7].[TaskSchedule] ([TaskScheduleID]),
    CONSTRAINT [FK_TaskReassignmentLog_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskReassignmentLog_UserAreaTaskID]
    ON [V7].[TaskReassignmentLog]([UserAreaID] ASC, [TaskID] ASC)
    INCLUDE([TaskReassignmentLogID]);

