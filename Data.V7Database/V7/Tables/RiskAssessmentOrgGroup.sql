CREATE TABLE [V7].[RiskAssessmentOrgGroup] (
    [RiskAssessmentOrgGroupID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]               INT                NOT NULL,
    [RiskAssessmentID]         INT                NOT NULL,
    [OrgGroupID]               INT                NOT NULL,
    [OrgGroupSpecificNotes]    NVARCHAR (MAX)     NULL,
    [CreatedByUserID]          INT                NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentOrgGroupID] ASC),
    CONSTRAINT [FK_RiskAssessmentOrgGroup_Assessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentOrgGroup_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_RiskAssessmentOrgGroup_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [UQ_RiskAssessmentOrgGroup] UNIQUE NONCLUSTERED ([RiskAssessmentID] ASC, [OrgGroupID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessmentOrgGroup_OrgGroupID]
    ON [V7].[RiskAssessmentOrgGroup]([OrgGroupID] ASC);

