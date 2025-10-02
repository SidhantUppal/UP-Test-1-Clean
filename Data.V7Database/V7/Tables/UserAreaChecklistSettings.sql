CREATE TABLE [V7].[UserAreaChecklistSettings] (
    [UserAreaChecklistSettingsID]        INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                         INT           NOT NULL,
    [ManagerEmployeeID]                  INT           NULL,
    [AssessmentTaskDueDateLookAhead]     INT           CONSTRAINT [DF__UserAreaC__Asses__09FE775D] DEFAULT ((7)) NULL,
    [DisableSectorTypes]                 BIT           CONSTRAINT [DF_UserAreaChecklistSettings_DisableSectorTypes] DEFAULT ((0)) NOT NULL,
    [DisableColouredChecklistAnswers]    BIT           CONSTRAINT [DF__UserAreaC__Disab__3573B09E] DEFAULT ((0)) NOT NULL,
    [MaxCompleteNowChecklist]            TINYINT       DEFAULT ((0)) NULL,
    [DisplayIncorrectAnswersAtTheTop]    BIT           DEFAULT ((0)) NOT NULL,
    [UserTaskSeverityLookAheadPeriod]    NVARCHAR (50) NULL,
    [ManagerTaskSeverityLookAheadPeriod] NVARCHAR (50) NULL,
    CONSTRAINT [PK__UserArea__0F200C79F7658D16] PRIMARY KEY CLUSTERED ([UserAreaChecklistSettingsID] ASC),
    CONSTRAINT [FK_UserAreaChecklistSettings_Employee] FOREIGN KEY ([ManagerEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_UserAreaChecklistSettings_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [CK_UserAreaChecklistSettings_UserArea] UNIQUE NONCLUSTERED ([UserAreaID] ASC)
);

