CREATE TABLE [V7].[RiskAssessmentXML] (
    [RiskAssessmentXMLID]   INT            IDENTITY (1, 1) NOT NULL,
    [RiskAssessmentID]      INT            NOT NULL,
    [V5ChecklistCacheID]    INT            NOT NULL,
    [V5ChecklistTemplateID] INT            NULL,
    [IsLatest]              BIT            NOT NULL,
    [Version]               DECIMAL (4, 1) NOT NULL,
    [XMLResponse]           XML            NOT NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentXMLID] ASC),
    CONSTRAINT [FK_RiskAssessmentXML_RiskAssessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID])
);

