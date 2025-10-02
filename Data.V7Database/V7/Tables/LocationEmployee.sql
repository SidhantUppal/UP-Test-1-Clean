CREATE TABLE [V7].[LocationEmployee] (
    [LocationEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [LocationID]         INT NOT NULL,
    [EmployeeID]         INT NOT NULL,
    [IsPrimary]          BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([LocationEmployeeID] ASC),
    CONSTRAINT [FK_LocationEmployee_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_LocationEmployee_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [CK_LocationEmployee_Unique] UNIQUE NONCLUSTERED ([LocationID] ASC, [EmployeeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_LocationEmployee_EmployeeID]
    ON [V7].[LocationEmployee]([EmployeeID] ASC)
    INCLUDE([LocationEmployeeID], [LocationID]);


GO
CREATE NONCLUSTERED INDEX [IX_LocationEmployee_LocationID]
    ON [V7].[LocationEmployee]([LocationID] ASC)
    INCLUDE([LocationEmployeeID], [EmployeeID]);

