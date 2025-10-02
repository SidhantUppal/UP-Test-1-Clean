CREATE TABLE [V7].[TaskScheduleNonEmployee] (
    [TaskScheduleNonEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [TaskScheduleID]            INT NOT NULL,
    [OrgGroupID]                INT NULL,
    [LocationID]                INT NULL,
    [JobRoleID]                 INT NULL,
    PRIMARY KEY CLUSTERED ([TaskScheduleNonEmployeeID] ASC),
    CONSTRAINT [FK_TaskScheduleNonEmployee_JobRole] FOREIGN KEY ([JobRoleID]) REFERENCES [V7].[JobRole] ([JobRoleID]),
    CONSTRAINT [FK_TaskScheduleNonEmployee_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_TaskScheduleNonEmployee_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_TaskScheduleNonEmployee_TaskSchedule] FOREIGN KEY ([TaskScheduleID]) REFERENCES [V7].[TaskSchedule] ([TaskScheduleID])
);

