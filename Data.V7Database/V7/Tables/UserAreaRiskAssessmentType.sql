CREATE TABLE [V7].[UserAreaRiskAssessmentType] (
    [UserAreaRiskAssessmentTypeID] INT IDENTITY (1, 1) NOT NULL,
    [RiskAssessmentTypeID]         INT NOT NULL,
    [UserAreaID]                   INT NOT NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaRiskAssessmentTypeID] ASC),
    CONSTRAINT [FK_UserAreaRiskAssessmentType_RiskAssessmentType] FOREIGN KEY ([RiskAssessmentTypeID]) REFERENCES [V7].[RiskAssessmentType] ([RiskAssessmentTypeID]),
    CONSTRAINT [FK_UserAreaRiskAssessmentType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
,
    CONSTRAINT [FK_UserAreaRiskAssessmentType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaRiskAssessmentType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaRiskAssessmentType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


