CREATE TABLE [V7].[UserAreaSetting] (
    [UserAreaSettingID]                       INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                              INT            NOT NULL,
    [IncidentInvestigationDueInDays]          INT            DEFAULT ((7)) NOT NULL,
    [DefaultManagerEmployeeID]                INT            NOT NULL,
    [IncidentFormDisabledLocationIDList]      VARCHAR (255)  NULL,
    [IncidentFormDisabledOrgGroupIDList]      VARCHAR (255)  NULL,
    [DisabledEmailTypeIDList]                 VARCHAR (255)  NULL,
    [DefaultManagerEmail]                     NVARCHAR (255) NULL,
    [DefaultSignOffEmployeeID]                INT            NULL,
    [IncidentFormAlternativeSourceUserAreaID] INT            NULL,
    PRIMARY KEY CLUSTERED ([UserAreaSettingID] ASC),
    CONSTRAINT [FK_UserAreaSetting_DefaultManagerEmployee] FOREIGN KEY ([DefaultManagerEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_UserAreaSetting_DefaultSignOffEmployee] FOREIGN KEY ([DefaultSignOffEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_UserAreaSetting_IncidentFormAlternativeSourceUserArea] FOREIGN KEY ([IncidentFormAlternativeSourceUserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_UserAreaSetting_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [CK_UserAreaSetting_UserArea] UNIQUE NONCLUSTERED ([UserAreaID] ASC)
);

