CREATE TABLE [V7].[DocumentRegisterEmployee] (
    [DocumentRegisterEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [DocumentRegisterID]         INT NOT NULL,
    [EmployeeID]                 INT NOT NULL,
    PRIMARY KEY CLUSTERED ([DocumentRegisterEmployeeID] ASC),
    CONSTRAINT [FK_DocumentRegisterEmployee_DocumentRegister] FOREIGN KEY ([DocumentRegisterID]) REFERENCES [V7].[DocumentRegister] ([DocumentRegisterID]),
    CONSTRAINT [FK_DocumentRegisterEmployee_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [CK_DocumentRegisterEmployee_Unique] UNIQUE NONCLUSTERED ([DocumentRegisterID] ASC, [EmployeeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentRegisterEmployee_DocumentRegisterID_includes]
    ON [V7].[DocumentRegisterEmployee]([DocumentRegisterID] ASC)
    INCLUDE([DocumentRegisterEmployeeID], [EmployeeID]);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentRegisterEmployee_DocumentRegisterIDEmployeeID]
    ON [V7].[DocumentRegisterEmployee]([DocumentRegisterID] ASC, [EmployeeID] ASC)
    INCLUDE([DocumentRegisterEmployeeID]);

