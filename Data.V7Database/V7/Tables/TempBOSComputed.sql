CREATE TABLE [V7].[TempBOSComputed] (
    [ID]                             INT            NOT NULL,
    [ParentID]                       INT            NULL,
    [TemplateID]                     INT            NOT NULL,
    [IsLatest]                       BIT            NULL,
    [Title]                          NVARCHAR (MAX) NULL,
    [HazardTitle]                    NVARCHAR (255) NULL,
    [PreControlConsequence]          INT            NULL,
    [PreControlLikelihood]           INT            NULL,
    [PostControlConsequence]         INT            NULL,
    [PostControlLikelihood]          INT            NULL,
    [ControlMeasureTitle]            NVARCHAR (255) NULL,
    [RiskAssessmentID]               INT            NULL,
    [HazardID]                       INT            NULL,
    [ControlMeasureID]               INT            NULL,
    [RiskAssessmentHazardID]         INT            NULL,
    [RiskAssessmentControlMeasureID] INT            NULL
);

