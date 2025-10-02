CREATE TABLE [V7].[DocRegisterEmployee] (
    [DocRegisterEmployeeID]   INT      IDENTITY (1, 1) NOT NULL,
    [UserAreaID]              INT      NOT NULL,
    [DocumentLinkTableTypeID] INT      NOT NULL,
    [OriginalDocumentID]      INT      NOT NULL,
    [EmployeeID]              INT      NOT NULL,
    [AssignmentDate]          DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([DocRegisterEmployeeID] ASC),
    CONSTRAINT [FK_DocRegisterEmployee_DocumentLinkTableType] FOREIGN KEY ([DocumentLinkTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_DocRegisterEmployee_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_DocRegisterEmployee_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocRegisterEmployee_Document_includes]
    ON [V7].[DocRegisterEmployee]([UserAreaID] ASC, [DocumentLinkTableTypeID] ASC, [OriginalDocumentID] ASC)
    INCLUDE([DocRegisterEmployeeID], [EmployeeID], [AssignmentDate]);


GO
CREATE NONCLUSTERED INDEX [IX_DocRegisterEmployee_Employee_includes]
    ON [V7].[DocRegisterEmployee]([UserAreaID] ASC, [DocumentLinkTableTypeID] ASC, [OriginalDocumentID] ASC, [EmployeeID] ASC)
    INCLUDE([DocRegisterEmployeeID], [AssignmentDate]);

