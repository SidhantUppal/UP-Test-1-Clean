CREATE TABLE [V7].[AccidentCaseRIDDORData] (
    [AccidentCaseRIDDORDataID] INT            IDENTITY (1, 1) NOT NULL,
    [AccidentCaseID]           INT            NOT NULL,
    [LocationTypeID]           INT            NULL,
    [LocalAuthorityTypeID]     INT            NOT NULL,
    [MainIndustryTypeID]       INT            NULL,
    [MainActivityTypeID]       INT            NULL,
    [SubActivityTypeID]        INT            NOT NULL,
    [ReportingSeverity]        VARCHAR (10)   NOT NULL,
    [WorkProcessTypeID]        INT            NOT NULL,
    [MainFactorTypeID]         INT            NOT NULL,
    [IncidentKindID]           INT            NOT NULL,
    [InjuryTypeID]             INT            NOT NULL,
    [BodyPartID]               INT            NOT NULL,
    [FallFromHeightInMetres]   TINYINT        NULL,
    [FullData]                 NVARCHAR (MAX) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AccidentCaseRIDDORDataID] ASC),
    CONSTRAINT [FK_AccidentCaseRIDDORData_AccidentCase] FOREIGN KEY ([AccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_AccidentCaseRIDDORData_BodyPart] FOREIGN KEY ([BodyPartID]) REFERENCES [V7].[BodyPart] ([BodyPartID]),
    CONSTRAINT [FK_AccidentCaseRIDDORData_IncidentKind] FOREIGN KEY ([IncidentKindID]) REFERENCES [V7].[IncidentKind] ([IncidentKindID]),
    CONSTRAINT [FK_AccidentCaseRIDDORData_InjuryType] FOREIGN KEY ([InjuryTypeID]) REFERENCES [V7].[InjuryType] ([InjuryTypeID]),
    CONSTRAINT [FK_AccidentCaseRIDDORData_LocalAuthorityType] FOREIGN KEY ([LocalAuthorityTypeID]) REFERENCES [V7].[LocalAuthorityType] ([LocalAuthorityTypeID]),
    CONSTRAINT [FK_AccidentCaseRIDDORData_MainFactorType] FOREIGN KEY ([MainFactorTypeID]) REFERENCES [V7].[MainFactorType] ([MainFactorTypeID]),
    CONSTRAINT [FK_AccidentCaseRIDDORData_SubActivityType] FOREIGN KEY ([SubActivityTypeID]) REFERENCES [V7].[SubActivityType] ([SubActivityTypeID]),
    CONSTRAINT [FK_AccidentCaseRIDDORData_WorkProcessType] FOREIGN KEY ([WorkProcessTypeID]) REFERENCES [V7].[WorkProcessType] ([WorkProcessTypeID]),
    CONSTRAINT [FK_AccidentCaseRIDDORData_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseRIDDORData_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseRIDDORData_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AccidentCaseRIDDORData_Data]
    ON [V7].[AccidentCaseRIDDORData]([AccidentCaseID] ASC)
    INCLUDE([LocalAuthorityTypeID], [WorkProcessTypeID], [MainFactorTypeID], [SubActivityTypeID], [IncidentKindID], [InjuryTypeID], [BodyPartID], [FallFromHeightInMetres], [ReportingSeverity]);

