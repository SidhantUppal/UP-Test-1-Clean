CREATE TABLE [V7].[UserAreaTaskSettings] (
    [TaskSettingsID]                         INT IDENTITY (1, 1) NOT NULL,
    [TaskDueAlertPeriod]                     INT CONSTRAINT [DF_UserAreaTaskSettings_TaskDueAlertPeriod] DEFAULT ((0)) NULL,
    [TaskScheduleLookUpaheadPeriod]          INT NOT NULL,
    [TaskDueAlertFrequencyID]                INT DEFAULT ((1)) NOT NULL,
    [AssignerOverDueFrequencyID]             INT DEFAULT ((1)) NOT NULL,
    [UserAreaID]                             INT NOT NULL,
    [FurtherActionsDueWithinPeriod]          INT NULL,
    [FurtherActionsDueWithinFrequencyTypeID] INT NULL,
    [DefaultManagerEmployeeID]               INT NULL,
    PRIMARY KEY CLUSTERED ([TaskSettingsID] ASC),
    CONSTRAINT [FK_UserAreaTaskSettings_AssignerOverDueFrequencyID] FOREIGN KEY ([AssignerOverDueFrequencyID]) REFERENCES [V7].[EmailFrequencyType] ([EmailFrequencyTypeID]),
    CONSTRAINT [FK_UserAreaTaskSettings_FrequencyType] FOREIGN KEY ([FurtherActionsDueWithinFrequencyTypeID]) REFERENCES [V7].[FrequencyType] ([FrequencyTypeID]),
    CONSTRAINT [FK_UserAreaTaskSettings_ManagerEmployee] FOREIGN KEY ([DefaultManagerEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_UserAreaTaskSettings_TaskDueAlertFrequencyID] FOREIGN KEY ([TaskDueAlertFrequencyID]) REFERENCES [V7].[EmailFrequencyType] ([EmailFrequencyTypeID]),
    CONSTRAINT [FK_UserAreaTaskSettings_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [CK_UserAreaTaskSettings_UserArea] UNIQUE NONCLUSTERED ([UserAreaID] ASC)
);

