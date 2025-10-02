CREATE TABLE [V7].[EmployeeEntitlementLog] (
    [EmployeeEntitlementLogID] INT            IDENTITY (1, 1) NOT NULL,
    [EmployeeAbsenceConfigID]  INT            NOT NULL,
    [Added]                    DECIMAL (5, 2) NULL,
    [Subtracted]               DECIMAL (5, 2) NULL,
    [ValidFrom]                DATETIMEOFFSET (7) NOT NULL,
    [ValidTo]                  DATETIMEOFFSET (7) NOT NULL,
    [Comment]                  NVARCHAR (MAX) NULL,
    [CreatedByUserID]          INT            NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT            NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT            NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([EmployeeEntitlementLogID] ASC),
    CONSTRAINT [FK_EmployeeEntitlementLog_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeEntitlementLog_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeEntitlementLog_EmployeeAbsenceConfig] FOREIGN KEY ([EmployeeAbsenceConfigID]) REFERENCES [V7].[EmployeeAbsenceConfig] ([EmployeeAbsenceConfigID]),
    CONSTRAINT [FK_EmployeeEntitlementLog_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

