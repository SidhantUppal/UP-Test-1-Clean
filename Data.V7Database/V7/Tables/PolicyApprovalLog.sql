CREATE TABLE [V7].[PolicyApprovalLog] (
    [PolicyApprovalLogID]  INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [PolicyID]             INT                NOT NULL,
    [ApprovalAction]       NVARCHAR (50)      NOT NULL,
    [ApprovalLevel]        INT                DEFAULT ((1)) NULL,
    [ApproverUserID]       INT                NOT NULL,
    [ApprovalDate]         DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ApprovalComments]     NVARCHAR (MAX)     NULL,
    [ConditionsOfApproval] NVARCHAR (MAX)     NULL,
    [PolicyVersion]        NVARCHAR (20)      NULL,
    [PolicyStatus]         NVARCHAR (50)      NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([PolicyApprovalLogID] ASC),
    CONSTRAINT [FK_PolicyApprovalLog_Approver] FOREIGN KEY ([ApproverUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PolicyApprovalLog_Policy] FOREIGN KEY ([PolicyID]) REFERENCES [V7].[Policy] ([PolicyID]),
    CONSTRAINT [FK_PolicyApprovalLog_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyApprovalLog_ApproverUserID]
    ON [V7].[PolicyApprovalLog]([ApproverUserID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyApprovalLog_PolicyID]
    ON [V7].[PolicyApprovalLog]([PolicyID] ASC);

