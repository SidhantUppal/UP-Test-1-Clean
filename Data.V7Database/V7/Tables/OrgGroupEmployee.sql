CREATE TABLE [V7].[OrgGroupEmployee] (
    [OrgGroupEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [OrgGroupID]         INT NOT NULL,
    [EmployeeID]         INT NOT NULL,
    PRIMARY KEY CLUSTERED ([OrgGroupEmployeeID] ASC),
    CONSTRAINT [FK_OrgGroupEmployee_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_OrgGroupEmployee_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [CK_OrgGroupEmployee_Unique] UNIQUE NONCLUSTERED ([OrgGroupID] ASC, [EmployeeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_OrgGroupEmployee_EmployeeID]
    ON [V7].[OrgGroupEmployee]([EmployeeID] ASC)
    INCLUDE([OrgGroupEmployeeID], [OrgGroupID]);


GO
CREATE NONCLUSTERED INDEX [IX_OrgGroupEmployee_OrgGroupID]
    ON [V7].[OrgGroupEmployee]([OrgGroupID] ASC)
    INCLUDE([OrgGroupEmployeeID], [EmployeeID]);

