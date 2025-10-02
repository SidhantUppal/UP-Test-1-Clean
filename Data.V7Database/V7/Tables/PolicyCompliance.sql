CREATE TABLE [V7].[PolicyCompliance] (
    [PolicyComplianceID]    INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]            INT                NOT NULL,
    [PolicyID]              INT                NOT NULL,
    [UserID]                INT                NOT NULL,
    [ComplianceStatus]      NVARCHAR (50)      NOT NULL,
    [ComplianceDate]        DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [LastReviewDate]        DATETIMEOFFSET (7) NULL,
    [NextReviewDate]        DATETIMEOFFSET (7) NULL,
    [ComplianceEvidence]    NVARCHAR (MAX)     NULL,
    [ComplianceNotes]       NVARCHAR (MAX)     NULL,
    [ExemptionReason]       NVARCHAR (MAX)     NULL,
    [ExemptionApprovedBy]   INT                NULL,
    [TrainingCompletedDate] DATETIMEOFFSET (7) NULL,
    [TrainingScore]         DECIMAL (5, 2)     NULL,
    [CreatedByUserID]       INT                NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]  INT                NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PolicyComplianceID] ASC),
    CONSTRAINT [FK_PolicyCompliance_ExemptionApprover] FOREIGN KEY ([ExemptionApprovedBy]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PolicyCompliance_Policy] FOREIGN KEY ([PolicyID]) REFERENCES [V7].[Policy] ([PolicyID]),
    CONSTRAINT [FK_PolicyCompliance_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PolicyCompliance_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyCompliance_ComplianceStatus]
    ON [V7].[PolicyCompliance]([ComplianceStatus] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyCompliance_UserID]
    ON [V7].[PolicyCompliance]([UserID] ASC);

