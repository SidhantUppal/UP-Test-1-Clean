CREATE TABLE [V7].[JobRoleEmployee] (
    [JobRoleEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [JobRoleID]         INT NOT NULL,
    [EmployeeID]        INT NOT NULL,
    PRIMARY KEY CLUSTERED ([JobRoleEmployeeID] ASC),
    CONSTRAINT [FK_JobRoleEmployee_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_JobRoleEmployee_JobRole] FOREIGN KEY ([JobRoleID]) REFERENCES [V7].[JobRole] ([JobRoleID]),
    CONSTRAINT [CK_JobRoleEmployee_Unique] UNIQUE NONCLUSTERED ([JobRoleID] ASC, [EmployeeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_JobRoleEmployee_EmployeeID]
    ON [V7].[JobRoleEmployee]([EmployeeID] ASC)
    INCLUDE([JobRoleEmployeeID], [JobRoleID]);


GO
CREATE NONCLUSTERED INDEX [IX_JobRoleEmployee_JobRoleID]
    ON [V7].[JobRoleEmployee]([JobRoleID] ASC)
    INCLUDE([JobRoleEmployeeID], [EmployeeID]);

