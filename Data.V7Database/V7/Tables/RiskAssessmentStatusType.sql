CREATE TABLE [V7].[RiskAssessmentStatusType] (
    [RiskAssessmentStatusTypeID] INT                IDENTITY (1, 1) NOT NULL,
    [StatusName]                 NVARCHAR (50)      NOT NULL,
    [StatusDescription]          NVARCHAR (200)     NULL,
    [ColorCode]                  NVARCHAR (7)       NULL,
    [WorkflowOrder]              INT                NULL,
    [IsActive]                   BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]            INT                NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentStatusTypeID] ASC)
);

