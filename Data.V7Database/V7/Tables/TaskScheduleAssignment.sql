CREATE TABLE [V7].[TaskScheduleAssignment] (
    [TaskScheduleAssignmentID] INT IDENTITY (1, 1) NOT NULL,
    [TaskScheduleID]           INT NOT NULL,
    [EmployeeID]               INT NULL,
    [LocationID]               INT NULL,
    [OrgGroupID]               INT NULL,
    PRIMARY KEY CLUSTERED ([TaskScheduleAssignmentID] ASC),
    CONSTRAINT [FK_TaskScheduleAssignment_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_TaskScheduleAssignment_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_TaskScheduleAssignment_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_TaskScheduleAssignment_TaskSchedule] FOREIGN KEY ([TaskScheduleID]) REFERENCES [V7].[TaskSchedule] ([TaskScheduleID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskScheduleAssignment_TaskScheduleID]
    ON [V7].[TaskScheduleAssignment]([TaskScheduleID] ASC)
    INCLUDE([TaskScheduleAssignmentID], [EmployeeID], [LocationID], [OrgGroupID]);

