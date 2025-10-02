CREATE TABLE [V7].[RiskAssessmentPersonsAtRisk] (
    [RiskAssessmentPersonsAtRiskID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                    INT                NOT NULL,
    [RiskAssessmentID]              INT                NOT NULL,
    [PersonsAtRiskID]               INT                NULL,
    [CustomCategoryName]            NVARCHAR (255)     NULL,
    [CustomCategoryDescription]     NVARCHAR (500)     NULL,
    [NumberOfPeople]                INT                NULL,
    [VulnerabilityNotes]            NVARCHAR (MAX)     NULL,
    [SpecificPrecautions]           NVARCHAR (MAX)     NULL,
    [CreatedByUserID]               INT                NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]          INT                NULL,
    [ModifiedDate]              DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT                NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentPersonsAtRiskID] ASC),
    CONSTRAINT [FK_RiskAssessmentPersonsAtRisk_Assessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentPersonsAtRisk_Category] FOREIGN KEY ([PersonsAtRiskID]) REFERENCES [V7].[PersonsAtRisk] ([PersonsAtRiskID]),
    CONSTRAINT [FK_RiskAssessmentPersonsAtRisk_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

