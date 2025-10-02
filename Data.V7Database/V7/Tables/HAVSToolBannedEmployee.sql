CREATE TABLE [V7].[HAVSToolBannedEmployee] (
    [HAVSToolBannedEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]               INT NOT NULL,
    [EmployeeID]               INT NOT NULL,
    [HAVSToolID]               INT NOT NULL,
    PRIMARY KEY CLUSTERED ([HAVSToolBannedEmployeeID] ASC),
    CONSTRAINT [FK_HAVSToolBannedEmploye_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_HAVSToolBannedEmploye_HAVSTool] FOREIGN KEY ([HAVSToolID]) REFERENCES [V7].[HAVSTool] ([HAVSToolID]),
    CONSTRAINT [FK_HAVSToolBannedEmploye_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

