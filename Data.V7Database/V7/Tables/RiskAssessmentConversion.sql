CREATE TABLE [V7].[RiskAssessmentConversion] (
    [RiskAssessmentConversionID] INT      IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                 INT      NOT NULL,
    [SourceRiskAssessmentID]     INT      NOT NULL,
    [NewRiskAssessmentID]        INT      NOT NULL,
    [CreatedByUserID]            INT      NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) NOT NULL,
    [ArchivedByUserID]           INT      NULL,
    [ArchivedDate]               DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentConversionID] ASC),
    CONSTRAINT [FK_RiskAssessmentConversion_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentConversion_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentConversion_RiskAssessment1] FOREIGN KEY ([SourceRiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentConversion_RiskAssessment2] FOREIGN KEY ([NewRiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentConversion_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

