CREATE TABLE [V7].[RiskAssessmentMonitorEventScore] (
    [RiskAssessmentMonitorEventScoreID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                        INT NOT NULL,
    [RiskAssessmentMonitorEventID]      INT NOT NULL,
    [RiskAssessmentID]                  INT NOT NULL,
    [RiskAssessmentFieldTypeID]         INT NULL,
    [RiskAssessmentControlMeasureID]    INT NULL,
    [Score]                             INT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentMonitorEventScoreID] ASC),
    CONSTRAINT [FK_RiskAssessmentMonitorEventScore_RiskAssessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEventScore_RiskAssessmentControlMeasure] FOREIGN KEY ([RiskAssessmentControlMeasureID]) REFERENCES [V7].[RiskAssessmentControlMeasure] ([RiskAssessmentControlMeasureID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEventScore_RiskAssessmentFieldType] FOREIGN KEY ([RiskAssessmentFieldTypeID]) REFERENCES [V7].[RiskAssessmentFieldType] ([RiskAssessmentFieldTypeID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEventScore_RiskAssessmentMonitorEvent] FOREIGN KEY ([RiskAssessmentMonitorEventID]) REFERENCES [V7].[RiskAssessmentMonitorEvent] ([RiskAssessmentMonitorEventID]),
    CONSTRAINT [FK_RiskAssessmentMonitorEventScore_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessmentMonitorEventScore_UserAreaRiskAssessment]
    ON [V7].[RiskAssessmentMonitorEventScore]([UserAreaID] ASC, [RiskAssessmentID] ASC)
    INCLUDE([RiskAssessmentMonitorEventScoreID], [RiskAssessmentMonitorEventID], [RiskAssessmentFieldTypeID], [RiskAssessmentControlMeasureID], [Score]);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessmentMonitorEventScore_UserAreaRiskAssessmentMonitorEvent]
    ON [V7].[RiskAssessmentMonitorEventScore]([UserAreaID] ASC, [RiskAssessmentID] ASC, [RiskAssessmentMonitorEventID] ASC)
    INCLUDE([RiskAssessmentMonitorEventScoreID], [RiskAssessmentFieldTypeID], [RiskAssessmentControlMeasureID], [Score]);

