CREATE TABLE [V7].[RiskAssessmentControlMeasurePersonsInCharge] (
    [RiskAssessmentControlMeasurePersonsInChargeID] INT IDENTITY (1, 1) NOT NULL,
    [RiskAssessmentControlMeasureID]                INT NOT NULL,
    [PersonsInChargeID]                             INT NOT NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentControlMeasurePersonsInChargeID] ASC)
);

