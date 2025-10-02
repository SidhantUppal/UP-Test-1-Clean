CREATE TABLE [V7].[RiskAssessmentExternalLink] (
    [RiskAssessmentExternalLinkID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                   INT                NOT NULL,
    [RiskAssessmentID]             INT                NOT NULL,
    [LinkTitle]                    NVARCHAR (255)     NOT NULL,
    [LinkURL]                      NVARCHAR (500)     NOT NULL,
    [LinkDescription]              NVARCHAR (500)     NULL,
    [LinkType]                     NVARCHAR (50)      DEFAULT ('Reference') NULL,
    [CreatedByUserID]              INT                NOT NULL,
    [CreatedDate]                  DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]         INT                NULL,
    [ModifiedDate]             DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]             INT                NULL,
    [ArchivedDate]                 DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentExternalLinkID] ASC),
    CONSTRAINT [FK_RiskAssessmentExternalLink_Assessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentExternalLink_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

