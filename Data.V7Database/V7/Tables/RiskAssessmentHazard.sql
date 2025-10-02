CREATE TABLE [V7].[RiskAssessmentHazard] (
    [RiskAssessmentHazardID]  INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]              INT                NOT NULL,
    [RiskAssessmentID]        INT                NOT NULL,
    [HazardID]                INT                NULL,
    [CustomHazardName]        NVARCHAR (255)     NULL,
    [CustomHazardDescription] NVARCHAR (MAX)     NULL,
    [InherentLikelihood]      INT                NULL,
    [InherentConsequence]     INT                NULL,
    [InherentRiskScore]       INT                NULL,
    [ResidualLikelihood]      INT                NULL,
    [ResidualConsequence]     INT                NULL,
    [ResidualRiskScore]       INT                NULL,
    [HazardNotes]             NVARCHAR (MAX)     NULL,
    [SequenceOrder]           INT                DEFAULT ((0)) NULL,
    [CreatedByUserID]         INT                NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]    INT                NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT                NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentHazardID] ASC),
    CONSTRAINT [FK_RiskAssessmentHazard_Assessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentHazard_Hazard] FOREIGN KEY ([HazardID]) REFERENCES [V7].[Hazard] ([HazardID]),
    CONSTRAINT [FK_RiskAssessmentHazard_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessmentHazard_AssessmentID]
    ON [V7].[RiskAssessmentHazard]([RiskAssessmentID] ASC);

