CREATE TABLE [V7].[OrgGroupTaskSetting] (
    [OrgGroupTaskSettingID]      INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                 INT NOT NULL,
    [OrgGroupID]                 INT NOT NULL,
    [TaskOverdueAlertEmployeeID] INT NOT NULL,
    [TaskOverdueAlertMinDays]    INT NULL,
    [TaskOverdueAlertMaxDays]    INT NULL,
    PRIMARY KEY CLUSTERED ([OrgGroupTaskSettingID] ASC),
    CONSTRAINT [FK_OrgGroupTaskSetting_Employee] FOREIGN KEY ([TaskOverdueAlertEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_OrgGroupTaskSetting_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_OrgGroupTaskSetting_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

