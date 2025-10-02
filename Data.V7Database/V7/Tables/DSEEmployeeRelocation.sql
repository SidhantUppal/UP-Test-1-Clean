CREATE TABLE [V7].[DSEEmployeeRelocation] (
    [DSEEmployeeRelocationID] INT             IDENTITY (1, 1) NOT NULL,
    [EmployeeID]              INT             NULL,
    [RelocationDate]          DATETIMEOFFSET (7) NOT NULL,
    [OldSeatNumber]           NVARCHAR (128)  NULL,
    [NewSeatNumber]           NVARCHAR (128)  NULL,
    [RelocationReason]        NVARCHAR (1024) NULL,
    [CreatedByUserID]         INT             NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]        INT             NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT             NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([DSEEmployeeRelocationID] ASC),
    CONSTRAINT [FK_DSEEmployeeRelocation_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DSEEmployeeRelocation_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DSEEmployeeRelocation_EmployeeID] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_DSEEmployeeRelocation_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

