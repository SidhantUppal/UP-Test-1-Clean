CREATE TABLE [V7].[RiskAssessmentFieldTypeScore_TO_DELETE_] (
    [RiskAssessmentFieldTypeScoreID] INT IDENTITY (1, 1) NOT NULL,
    [RiskAssessmentMonitorEventID]   INT NOT NULL,
    [RiskAssessmentID]               INT NOT NULL,
    [RiskAssessmentFieldTypeID]      INT NOT NULL,
    [UserAreaID]                     INT NOT NULL,
    [Score]                          INT CONSTRAINT [DF__RiskAsses__Score__10AC4043] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK__RiskAsse__4962E8FE6ABEF4B4] PRIMARY KEY CLUSTERED ([RiskAssessmentFieldTypeScoreID] ASC)
);

