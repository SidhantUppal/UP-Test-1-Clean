CREATE TABLE [V7].[UserAreaTrainingSettings] (
    [UserAreaTrainingSettingsID]     INT IDENTITY (1, 1) NOT NULL,
    [TrainingManagerEmployeeID]      INT NULL,
    [AssessmentTaskDueDateLookAhead] INT DEFAULT ((7)) NULL,
    [UserAreaID]                     INT NOT NULL,
    [DefaultSendEmailDate]           INT NULL,
    [DefaultDueDate]                 INT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaTrainingSettingsID] ASC),
    CONSTRAINT [FK_UserAreaTrainingSettings_Employee] FOREIGN KEY ([TrainingManagerEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_UserAreaTrainingSettings_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [CK_UserAreaTrainingSettings_UserArea] UNIQUE NONCLUSTERED ([UserAreaID] ASC)
);

