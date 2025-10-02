CREATE TABLE [V7].[ChecklistAssignment] (
    [ChecklistAssignmentID]    INT             IDENTITY (1, 1) NOT NULL,
    [ChecklistID]              INT             NOT NULL,
    [EmployeeID]               INT             NULL,
    [OrgGroupID]               INT             NULL,
    [UserAreaID]               INT             NOT NULL,
    [RenewalEnabled]           BIT             CONSTRAINT [DF__Checklist__Renew__703EA55A] DEFAULT ((1)) NOT NULL,
    [LastEnrollmentDate]       DATETIMEOFFSET (7) NULL,
    [DueDate]                  DATETIMEOFFSET (7) NULL,
    [TaskScheduleID]           INT             NULL,
    [CreatedByUserID]          INT             NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT             NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT             NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    [ManagerEmployeeID]        INT             NULL,
    [LocationID]               INT             NULL,
    [ContractorCompanyID]      INT             NULL,
    [JobRoleID]                INT             NULL,
    [Reference]                NVARCHAR (100)  NULL,
    [AdditionalEmployeeIDList] NVARCHAR (2000) NULL,
    CONSTRAINT [PK__Checklis__5311E87730F4B2F9] PRIMARY KEY CLUSTERED ([ChecklistAssignmentID] ASC),
    CONSTRAINT [FK_ChecklistAssignment_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ChecklistAssignment_ChecklistID] FOREIGN KEY ([ChecklistID]) REFERENCES [V7].[Checklist] ([ChecklistID]),
    CONSTRAINT [FK_ChecklistAssignment_ContractorCompanyID] FOREIGN KEY ([ContractorCompanyID]) REFERENCES [V7].[ContractorCompany] ([ContractorCompanyID]),
    CONSTRAINT [FK_ChecklistAssignment_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ChecklistAssignment_EmployeeID] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_ChecklistAssignment_JobRoleID] FOREIGN KEY ([JobRoleID]) REFERENCES [V7].[JobRole] ([JobRoleID]),
    CONSTRAINT [FK_ChecklistAssignment_LocationID] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_ChecklistAssignment_ManagerEmployeeID] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_ChecklistAssignment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ChecklistAssignment_OrgGroupID] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_ChecklistAssignment_TaskScheduleID] FOREIGN KEY ([TaskScheduleID]) REFERENCES [V7].[TaskSchedule] ([TaskScheduleID]),
    CONSTRAINT [FK_ChecklistAssignment_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ChecklistAssignment_ChecklistID_UserAreaID_ArchivedDate_DueDate]
    ON [V7].[ChecklistAssignment]([ChecklistID] ASC, [UserAreaID] ASC, [ArchivedDate] ASC, [DueDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_ChecklistAssignment_UserAreaID_ArchivedDate_DueDate]
    ON [V7].[ChecklistAssignment]([UserAreaID] ASC, [ArchivedDate] ASC, [DueDate] ASC);

