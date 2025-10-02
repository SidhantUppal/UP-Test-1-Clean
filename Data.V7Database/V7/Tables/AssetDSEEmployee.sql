CREATE TABLE [V7].[AssetDSEEmployee] (
    [AssetDSEEmployeeID]   INT            IDENTITY (1, 1) NOT NULL,
    [AssetID]              INT            NOT NULL,
    [EmployeeID]           INT            NOT NULL,
    [AssetStatusTypeID]    INT            NOT NULL,
    [AssignmentDate]       DATETIMEOFFSET (7) NOT NULL,
    [Comments]             NVARCHAR (255) NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AssetDSEEmployeeID] ASC),
    CONSTRAINT [FK_AssetDSEEmployee_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AssetDSEEmployee_Asset] FOREIGN KEY ([AssetID]) REFERENCES [V7].[Asset] ([AssetID]),
    CONSTRAINT [FK_AssetDSEEmployee_AssetStatusType] FOREIGN KEY ([AssetStatusTypeID]) REFERENCES [V7].[AssetStatusType] ([AssetStatusTypeID]),
    CONSTRAINT [FK_AssetDSEEmployee_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AssetDSEEmployee_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_AssetDSEEmployee_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AssetDSEEmployee_AssetEmployee]
    ON [V7].[AssetDSEEmployee]([AssetID] ASC, [EmployeeID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_AssetDSEEmployee_EmployeeID]
    ON [V7].[AssetDSEEmployee]([EmployeeID] ASC)
    INCLUDE([AssetDSEEmployeeID], [AssetID], [AssetStatusTypeID], [AssignmentDate], [Comments]);

