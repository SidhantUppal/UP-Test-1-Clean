CREATE TABLE [V7].[SafeSystemOfWorkRiskAssessmentType] (
    [SafeSystemOfWorkRiskAssessmentTypeID] INT          NOT NULL,
    [Reference]                            VARCHAR (50) NULL,
    [HasRelatedRiskAssessments]            BIT          DEFAULT ((1)) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([SafeSystemOfWorkRiskAssessmentTypeID] ASC)
);

