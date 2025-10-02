CREATE TABLE [V7].[TextBlockEmployee] (
    [TextBlockEmployeeID] INT      IDENTITY (1, 1) NOT NULL,
    [TextBlockID]         INT      NOT NULL,
    [EmployeeID]          INT      NOT NULL,
    [IssueDate]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TextBlockEmployeeID] ASC),
    CONSTRAINT [FK_TextBlockEmployee_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_TextBlockEmployee_TextBlock] FOREIGN KEY ([TextBlockID]) REFERENCES [V7].[TextBlock] ([TextBlockID])
);

