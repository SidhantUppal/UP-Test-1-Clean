CREATE TABLE [V7].[RiskAssessmentApprovalLog] (
    [RiskAssessmentApprovalLogID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                  INT                NOT NULL,
    [RiskAssessmentID]            INT                NOT NULL,
    [ApprovalAction]              NVARCHAR (50)      NOT NULL,
    [ApprovalLevel]               INT                DEFAULT ((1)) NULL,
    [ApproverUserID]              INT                NOT NULL,
    [ApprovalDate]                DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ApprovalComments]            NVARCHAR (MAX)     NULL,
    [CreatedByUserID]             INT                NOT NULL,
    [CreatedDate]                 DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentApprovalLogID] ASC),
    CONSTRAINT [FK_RiskAssessmentApprovalLog_Approver] FOREIGN KEY ([ApproverUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskAssessmentApprovalLog_Assessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentApprovalLog_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessmentApprovalLog_ApproverID]
    ON [V7].[RiskAssessmentApprovalLog]([ApproverUserID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_RiskAssessmentApprovalLog_AssessmentID]
    ON [V7].[RiskAssessmentApprovalLog]([RiskAssessmentID] ASC);

