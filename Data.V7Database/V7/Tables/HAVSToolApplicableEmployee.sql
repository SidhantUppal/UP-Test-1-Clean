CREATE TABLE [V7].[HAVSToolApplicableEmployee] (
    [HAVSToolApplicableEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                   INT NOT NULL,
    [EmployeeID]                   INT NOT NULL,
    [HAVSToolID]                   INT NOT NULL,
    [DailyLimitHours]              INT NULL,
    [DailyLimitMinutes]            INT NULL,
    [IsProhibited]                 BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([HAVSToolApplicableEmployeeID] ASC),
    CONSTRAINT [FK_HAVSToolApplicableEmploye_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_HAVSToolApplicableEmploye_HAVSTool] FOREIGN KEY ([HAVSToolID]) REFERENCES [V7].[HAVSTool] ([HAVSToolID]),
    CONSTRAINT [FK_HAVSToolApplicableEmploye_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

