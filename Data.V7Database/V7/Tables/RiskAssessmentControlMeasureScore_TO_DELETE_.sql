CREATE TABLE [V7].[RiskAssessmentControlMeasureScore_TO_DELETE_] (
    [RiskAssessmentControlMeasureScoreID] INT IDENTITY (1, 1) NOT NULL,
    [RiskAssessmentControlMeasureID]      INT NOT NULL,
    [RiskAssessmentMonitorEventID]        INT NOT NULL,
    [Score]                               INT NULL,
    CONSTRAINT [PK__RiskAsse__4E7139B976510263] PRIMARY KEY CLUSTERED ([RiskAssessmentControlMeasureScoreID] ASC)
);

