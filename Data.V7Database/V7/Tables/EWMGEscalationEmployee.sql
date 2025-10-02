CREATE TABLE [V7].[EWMGEscalationEmployee] (
    [EWMGEscalationEmployeeID] INT      IDENTITY (1, 1) NOT NULL,
    [MasterLocationID]         INT      NOT NULL,
    [MasterOrgGroupID]         INT      NOT NULL,
    [TaskAssigneeEmployeeID]   INT      NOT NULL,
    [Tier1ManagerEmployeeID]   INT      NULL,
    [Tier2ManagerEmployeeID]   INT      NULL,
    [Tier3ManagerEmployeeID]   INT      NULL,
    [Tier4ManagerEmployeeID]   INT      NULL,
    [Tier5ManagerEmployeeID]   INT      NULL,
    [Tier6ManagerEmployeeID]   INT      NULL,
    [CreatedByUserID]          INT      NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT      NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT      NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([EWMGEscalationEmployeeID] ASC),
    CONSTRAINT [FK_EWMGEscalationEmployee_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EWMGEscalationEmployee_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EWMGEscalationEmployee_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EWMGEscalationEmployee_Location] FOREIGN KEY ([MasterLocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_EWMGEscalationEmployee_OrgGroup] FOREIGN KEY ([MasterOrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_EWMGEscalationEmployee_TaskAssigneeEmployee] FOREIGN KEY ([TaskAssigneeEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EWMGEscalationEmployee_Tier1ManagerEmployee] FOREIGN KEY ([Tier1ManagerEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EWMGEscalationEmployee_Tier2ManagerEmployee] FOREIGN KEY ([Tier2ManagerEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EWMGEscalationEmployee_Tier3ManagerEmployee] FOREIGN KEY ([Tier3ManagerEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EWMGEscalationEmployee_Tier4ManagerEmployee] FOREIGN KEY ([Tier4ManagerEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EWMGEscalationEmployee_Tier5ManagerEmployee] FOREIGN KEY ([Tier5ManagerEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EWMGEscalationEmployee_Tier6ManagerEmployee] FOREIGN KEY ([Tier6ManagerEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID])
);


GO
CREATE NONCLUSTERED INDEX [IX_EWMGEscalationEmployee_LocationOrgGroup]
    ON [V7].[EWMGEscalationEmployee]([MasterLocationID] ASC, [MasterOrgGroupID] ASC)
    INCLUDE([TaskAssigneeEmployeeID], [Tier1ManagerEmployeeID], [Tier2ManagerEmployeeID], [Tier3ManagerEmployeeID], [Tier4ManagerEmployeeID], [Tier5ManagerEmployeeID], [Tier6ManagerEmployeeID]);


GO
CREATE NONCLUSTERED INDEX [IX_EWMGEscalationEmployee_LocationOrgGroupEmployee]
    ON [V7].[EWMGEscalationEmployee]([MasterLocationID] ASC, [MasterOrgGroupID] ASC, [TaskAssigneeEmployeeID] ASC)
    INCLUDE([Tier1ManagerEmployeeID], [Tier2ManagerEmployeeID], [Tier3ManagerEmployeeID], [Tier4ManagerEmployeeID], [Tier5ManagerEmployeeID], [Tier6ManagerEmployeeID]);


GO
CREATE NONCLUSTERED INDEX [IX_EWMGEscalationEmployee_TaskAssignee]
    ON [V7].[EWMGEscalationEmployee]([TaskAssigneeEmployeeID] ASC)
    INCLUDE([Tier1ManagerEmployeeID], [Tier2ManagerEmployeeID], [Tier3ManagerEmployeeID], [Tier4ManagerEmployeeID], [Tier5ManagerEmployeeID], [Tier6ManagerEmployeeID]);

