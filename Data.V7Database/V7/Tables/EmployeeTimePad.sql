CREATE TABLE [V7].[EmployeeTimePad] (
    [EmployeeTimePadID] INT            IDENTITY (1, 1) NOT NULL,
    [EmployeeID]        INT            NOT NULL,
    [Description]       NVARCHAR (100) NOT NULL,
    [DateTimeFrom]      DATETIMEOFFSET (7) NULL,
    [DateTimeTo]        DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]   INT            NOT NULL,
    [CreatedDate]       DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([EmployeeTimePadID] ASC),
    CONSTRAINT [FK_EmployeeTimePad_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeTimePad_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID])
);

