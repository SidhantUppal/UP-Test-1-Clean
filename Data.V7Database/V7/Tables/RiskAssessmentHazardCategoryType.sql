CREATE TABLE [V7].[RiskAssessmentHazardCategoryType] (
    [RiskAssessmentHazardCategoryTypeID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]         INT           NULL,
    [RiskAssessmentID]                   INT NOT NULL,
    [HazardCategoryTypeID]               INT NOT NULL,
    [HasSharedRiskLevel]                 BIT DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentHazardCategoryTypeID] ASC),
    CONSTRAINT [FK_RiskAssessmentHazardCategoryType_HazardCategoryType] FOREIGN KEY ([HazardCategoryTypeID]) REFERENCES [V7].[HazardCategoryType] ([HazardCategoryTypeID]),
    CONSTRAINT [FK_RiskAssessmentHazardCategoryType_RiskAssessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID])
,
    CONSTRAINT [FK_RiskAssessmentHazardCategoryType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentHazardCategoryType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentHazardCategoryType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentHazardCategoryType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


