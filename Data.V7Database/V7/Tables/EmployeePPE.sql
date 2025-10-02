CREATE TABLE [V7].[EmployeePPE] (
    [EmployeePPEID]        INT            IDENTITY (1, 1) NOT NULL,
    [EmployeeID]           INT            NOT NULL,
    [PPETypeID]            INT            NOT NULL,
    [Comments]             NVARCHAR (255) NULL,
    [Issued]               DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([EmployeePPEID] ASC),
    CONSTRAINT [FK_EmployeePPE_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeePPE_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeePPE_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EmployeePPE_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeePPE_PPEType] FOREIGN KEY ([PPETypeID]) REFERENCES [V7].[PPEType] ([PPETypeID])
);

