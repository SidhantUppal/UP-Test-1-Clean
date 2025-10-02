CREATE TABLE [V7].[RiskAssessmentSectionType] (
    [RiskAssessmentSectionTypeID] INT            NOT NULL,
    [RiskAssessmentTypeID]        INT            NOT NULL,
    [Version]                     DECIMAL (4, 1) NOT NULL,
    [OrderNum]                    INT            NOT NULL,
    [IsHidden]                    BIT            DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Notes] NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentSectionTypeID] ASC),
    CONSTRAINT [FK_RiskAssessmentSectionType_RiskAssessmentType] FOREIGN KEY ([RiskAssessmentTypeID]) REFERENCES [V7].[RiskAssessmentType] ([RiskAssessmentTypeID])
);

