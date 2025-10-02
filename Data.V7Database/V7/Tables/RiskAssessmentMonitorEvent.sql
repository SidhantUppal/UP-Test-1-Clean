CREATE TABLE [V7].[RiskAssessmentMonitorEvent] (
    [RiskAssessmentMonitorEventID] INT            IDENTITY (1, 1) NOT NULL,
    [RiskAssessmentID]             INT            NOT NULL,
    [OriginalRiskAssessmentID]     INT            NOT NULL,
    [MonitorEmployeeID]            INT            NOT NULL,
    [MonitorEmployeeName]          NVARCHAR (255) NULL,
    [CheckedByEmployeeID]          INT            NULL,
    [CheckedByEmployeeName]        NVARCHAR (255) NULL,
    [OrgGroupID]                   INT            NULL,
    [LocationID]                   INT            NULL,
    [ComplianceScore]              INT            NULL,
    [ComplianceColour]             VARCHAR (10)   NULL,
    [MonitoredDate]                DATETIMEOFFSET (7) NOT NULL,
    [UserAreaID]                   INT            NOT NULL,
    [UserAreaDivisionID]           INT            NULL,
    [Notes]                        VARCHAR (MAX)  NULL,
    [CreatedByUserID]              INT            NOT NULL,
    [CreatedDate]                  DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]         INT            NULL,
    [ModifiedDate]             DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]             INT            NULL,
    [ArchivedDate]                 DATETIMEOFFSET (7) NULL,
    [UseYesNoNAMode]               BIT            DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK__RiskAsse__4A5CCDAEB4C951EC] PRIMARY KEY CLUSTERED ([RiskAssessmentMonitorEventID] ASC),
    CONSTRAINT [FK_RiskAssessmentMonitorEvent_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEvent_CheckedByEmployeeID] FOREIGN KEY ([CheckedByEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEvent_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEvent_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEvent_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEvent_MonitorEmployeeID] FOREIGN KEY ([MonitorEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEvent_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEvent_OriginalRiskAssessment] FOREIGN KEY ([OriginalRiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEvent_RiskAssessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEvent_UserAreaDivision] FOREIGN KEY ([UserAreaDivisionID]) REFERENCES [V7].[UserAreaDivision] ([UserAreaDivisionID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEvent_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessment_OriginalVersion]
    ON [V7].[RiskAssessmentMonitorEvent]([OriginalRiskAssessmentID] ASC, [ArchivedDate] ASC);


GO
CREATE NONCLUSTERED INDEX [Org_Group_ID]
    ON [V7].[RiskAssessmentMonitorEvent]([OrgGroupID] ASC);

