CREATE TABLE [V7].[RiskAssessmentMonitorEventXML] (
    [RiskAssessmentMonitorEventXMLID] INT            IDENTITY (1, 1) NOT NULL,
    [RiskAssessmentMonitorEventID]    INT            NOT NULL,
    [RiskAssessmentID]                INT            NOT NULL,
    [V5ChecklistCacheID]              INT            NOT NULL,
    [V5ChecklistResponseID]           INT            NULL,
    [IsLatest]                        BIT            NOT NULL,
    [Version]                         DECIMAL (4, 1) NOT NULL,
    [XMLResponse]                     XML            NOT NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentMonitorEventXMLID] ASC),
    CONSTRAINT [FK_RiskAssessmentMonitorEventXML_RiskAssessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEventXML_RiskAssessmentMonitorEvent] FOREIGN KEY ([RiskAssessmentMonitorEventID]) REFERENCES [V7].[RiskAssessmentMonitorEvent] ([RiskAssessmentMonitorEventID])
);

