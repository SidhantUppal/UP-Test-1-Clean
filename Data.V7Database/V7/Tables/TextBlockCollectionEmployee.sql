CREATE TABLE [V7].[TextBlockCollectionEmployee] (
    [TextBlockCollectionEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [TextBlockCollectionID]         INT NOT NULL,
    [EmployeeID]                    INT NOT NULL,
    PRIMARY KEY CLUSTERED ([TextBlockCollectionEmployeeID] ASC),
    CONSTRAINT [FK_TextBlockCollectionEmployee_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_TextBlockCollectionEmployee_TextBlockCollection] FOREIGN KEY ([TextBlockCollectionID]) REFERENCES [V7].[TextBlockCollection] ([TextBlockCollectionID])
);

