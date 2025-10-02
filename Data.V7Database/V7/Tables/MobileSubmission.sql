CREATE TABLE [V7].[MobileSubmission] (
    [MobileSubmissionID]           INT      IDENTITY (1, 1) NOT NULL,
    [QuestionnaireResponseID]      INT      NULL,
    [AccidentCaseID]               INT      NULL,
    [TaskID]                       INT      NULL,
    [AssetInspectionID]            INT      NULL,
    [UserAreaID]                   INT      NULL,
    [IsProcessed]                  BIT      CONSTRAINT [DF__MobileSub__IsPro__4A258018] DEFAULT ((0)) NOT NULL,
    [SubmissionDate]               DATETIMEOFFSET (7) NOT NULL,
    [ProcessedDate]                DATETIMEOFFSET (7) NULL,
    [RiskAssessmentID]             INT      NULL,
    [RiskAssessmentMonitorEventID] INT      NULL,
    CONSTRAINT [PK__MobileSu__9C2B7F1D4103FCEA] PRIMARY KEY CLUSTERED ([MobileSubmissionID] ASC),
    CONSTRAINT [FK_MobileSubmission_AccidentCase] FOREIGN KEY ([AccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_MobileSubmission_AssetInspection] FOREIGN KEY ([AssetInspectionID]) REFERENCES [V7].[AssetInspection] ([AssetInspectionID]),
    CONSTRAINT [FK_MobileSubmission_QuestionnaireResponse] FOREIGN KEY ([QuestionnaireResponseID]) REFERENCES [V7].[QuestionnaireResponse] ([QuestionnaireResponseID]),
    CONSTRAINT [FK_MobileSubmission_RiskAssessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_MobileSubmission_RiskAssessmentMonitorEvent] FOREIGN KEY ([RiskAssessmentMonitorEventID]) REFERENCES [V7].[RiskAssessmentMonitorEvent] ([RiskAssessmentMonitorEventID]),
    CONSTRAINT [FK_MobileSubmission_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [FK_MobileSubmission_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

