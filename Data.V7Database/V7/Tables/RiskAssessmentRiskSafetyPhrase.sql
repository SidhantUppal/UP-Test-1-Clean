CREATE TABLE [V7].[RiskAssessmentRiskSafetyPhrase] (
    [RiskAssessmentRiskSafetyPhraseID] INT IDENTITY (1, 1) NOT NULL,
    [RiskAssessmentID]                 INT NOT NULL,
    [RiskSafetyPhraseID]               INT NOT NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentRiskSafetyPhraseID] ASC),
    CONSTRAINT [FK_RiskAssessmentRiskSafetyPhrase_RiskAssessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentRiskSafetyPhrase_RiskSafetyPhrase] FOREIGN KEY ([RiskSafetyPhraseID]) REFERENCES [V7].[RiskSafetyPhrase] ([RiskSafetyPhraseID])
);

