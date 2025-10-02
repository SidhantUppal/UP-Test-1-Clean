CREATE TABLE [V7].[AbsenceSetting] (
    [AbsenceSettingID]     INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT           NOT NULL,
    [EmployeeID]           INT           NULL,
    [SettingType]          INT           NOT NULL,
    [Type]                 NVARCHAR (50) NULL,
    [Value]                NVARCHAR (50) NULL,
    [CreatedByUserID]      INT           NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT           NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT           NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [OrgGroupID]           INT           NULL,
    PRIMARY KEY CLUSTERED ([AbsenceSettingID] ASC),
    CONSTRAINT [FK_AbsenceSetting_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceSetting_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceSetting_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_AbsenceSetting_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceSetting_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_AbsenceSetting_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

