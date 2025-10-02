CREATE TABLE [V7].[TaskScheduleOrgGroup] (
    [TaskScheduleOrgGroupID] INT IDENTITY (1, 1) NOT NULL,
    [TaskScheduleID]         INT NOT NULL,
    [OrgGroupID]             INT NOT NULL,
    PRIMARY KEY CLUSTERED ([TaskScheduleOrgGroupID] ASC),
    CONSTRAINT [FK_TaskScheduleOrgGroup_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_TaskScheduleOrgGroup_TaskSchedule] FOREIGN KEY ([TaskScheduleID]) REFERENCES [V7].[TaskSchedule] ([TaskScheduleID])
);

