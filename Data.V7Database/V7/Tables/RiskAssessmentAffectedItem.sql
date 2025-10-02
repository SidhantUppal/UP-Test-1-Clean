CREATE TABLE [V7].[RiskAssessmentAffectedItem] (
    [RiskAssessmentAffectedItemID] INT      IDENTITY (1, 1) NOT NULL,
    [AffectedItemID]               INT      NOT NULL,
    [RiskAssessmentID]             INT      NOT NULL,
    [RiskAssessmentHazardID]       INT      NULL,
    [PositionIndex]                INT      NULL,
    [CreatedByUserID]              INT      NULL,
    [CreatedDate]                  DATETIMEOFFSET (7) NULL,
    [ModifiedByUserID]         INT      NULL,
    [ModifiedDate]             DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]             INT      NULL,
    [ArchivedDate]                 DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__RiskAsse__16565ABE19CE2275] PRIMARY KEY CLUSTERED ([RiskAssessmentAffectedItemID] ASC),
    CONSTRAINT [FK_RiskAssessmentAffectedItem_AffectedItem] FOREIGN KEY ([AffectedItemID]) REFERENCES [V7].[AffectedItem] ([AffectedItemID]),
    CONSTRAINT [FK_RiskAssessmentAffectedItem_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentAffectedItem_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentAffectedItem_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentAffectedItem_RiskAssessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentAffectedItem_RiskAssessmentHazard] FOREIGN KEY ([RiskAssessmentHazardID]) REFERENCES [V7].[RiskAssessmentHazard] ([RiskAssessmentHazardID])
);


GO
CREATE NONCLUSTERED INDEX [Risk_Assesment_Hazard_ID]
    ON [V7].[RiskAssessmentAffectedItem]([RiskAssessmentHazardID] ASC);

