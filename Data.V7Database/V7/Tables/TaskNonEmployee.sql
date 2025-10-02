CREATE TABLE [V7].[TaskNonEmployee] (
    [TaskNonEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [TaskID]            INT NOT NULL,
    [OrgGroupID]        INT NULL,
    [LocationID]        INT NULL,
    [JobRoleID]         INT NULL,
    PRIMARY KEY CLUSTERED ([TaskNonEmployeeID] ASC),
    CONSTRAINT [FK_TaskNonEmployee_JobRole] FOREIGN KEY ([JobRoleID]) REFERENCES [V7].[JobRole] ([JobRoleID]),
    CONSTRAINT [FK_TaskNonEmployee_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_TaskNonEmployee_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_TaskNonEmployee_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID])
);

