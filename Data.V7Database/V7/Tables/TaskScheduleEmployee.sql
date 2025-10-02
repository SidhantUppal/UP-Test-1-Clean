CREATE TABLE [V7].[TaskScheduleEmployee] (
    [TaskScheduleEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [TaskScheduleID]         INT NOT NULL,
    [EmployeeID]             INT NOT NULL,
    PRIMARY KEY CLUSTERED ([TaskScheduleEmployeeID] ASC),
    CONSTRAINT [FK_TaskScheduleEmployee_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_TaskScheduleEmployee_TaskSchedule] FOREIGN KEY ([TaskScheduleID]) REFERENCES [V7].[TaskSchedule] ([TaskScheduleID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskScheduleEmployee_EmployeeID]
    ON [V7].[TaskScheduleEmployee]([EmployeeID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_TaskScheduleEmployee_TaskScheduleID_includes]
    ON [V7].[TaskScheduleEmployee]([TaskScheduleID] ASC)
    INCLUDE([EmployeeID]);

