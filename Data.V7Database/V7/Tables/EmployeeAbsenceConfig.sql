CREATE TABLE [V7].[EmployeeAbsenceConfig] (
    [EmployeeAbsenceConfigID] INT            IDENTITY (1, 1) NOT NULL,
    [EmployeeID]              INT            NOT NULL,
    [UserAreaID]              INT            NOT NULL,
    [AnnualEntitlement]       DECIMAL (5, 2) NULL,
    [CanRequestBankHolidays]  BIT            NULL,
    [WorkDays]                NVARCHAR (50)  NULL,
    [CreatedByUserID]         INT            NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]    INT            NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT            NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([EmployeeAbsenceConfigID] ASC),
    CONSTRAINT [FK_EmployeeAbsenceConfig_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeAbsenceConfig_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeAbsenceConfig_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EmployeeAbsenceConfig_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeAbsenceConfig_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

