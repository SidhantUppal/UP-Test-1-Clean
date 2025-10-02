CREATE TABLE [V7].[SSOWApprovalLog] (
    [SSOWApprovalLogID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]        INT                NOT NULL,
    [DocumentType]      NVARCHAR (50)      NOT NULL,
    [DocumentID]        INT                NOT NULL,
    [ApprovalAction]    NVARCHAR (50)      NOT NULL,
    [ApprovalLevel]     INT                DEFAULT ((1)) NULL,
    [ApproverUserID]    INT                NOT NULL,
    [ApprovalDate]      DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ApprovalComments]  NVARCHAR (MAX)     NULL,
    [DocumentVersion]   NVARCHAR (20)      NULL,
    [DocumentStatus]    NVARCHAR (50)      NULL,
    [CreatedByUserID]   INT                NOT NULL,
    [CreatedDate]       DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([SSOWApprovalLogID] ASC),
    CONSTRAINT [FK_SSOWApprovalLog_Approver] FOREIGN KEY ([ApproverUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SSOWApprovalLog_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

