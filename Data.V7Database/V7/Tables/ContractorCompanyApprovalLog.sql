CREATE TABLE [V7].[ContractorCompanyApprovalLog] (
    [ContractorCompanyApprovalLogID] INT            IDENTITY (1, 1) NOT NULL,
    [ContractorCompanyID]            INT            NOT NULL,
    [ContractorCompetencyID]         INT            NULL,
    [ChecklistEnrolmentID]           INT            NULL,
    [UserAreaID]                     INT            NOT NULL,
    [IsApproved]                     BIT            NULL,
    [Comments]                       NVARCHAR (MAX) NULL,
    [CreatedByUserID]                INT            NOT NULL,
    [CreatedDate]                    DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]               INT            NULL,
    [ModifiedDate]               DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]               INT            NULL,
    [ArchivedDate]                   DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ContractorCompanyApprovalLogID] ASC),
    CONSTRAINT [FK_ContractorCompanyApprovalLog_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContractorCompanyApprovalLog_ChecklistEnrolment] FOREIGN KEY ([ChecklistEnrolmentID]) REFERENCES [V7].[ChecklistEnrolment] ([ChecklistEnrolmentID]),
    CONSTRAINT [FK_ContractorCompanyApprovalLog_ContractorCompany] FOREIGN KEY ([ContractorCompanyID]) REFERENCES [V7].[ContractorCompany] ([ContractorCompanyID]),
    CONSTRAINT [FK_ContractorCompanyApprovalLog_ContractorCompetency] FOREIGN KEY ([ContractorCompetencyID]) REFERENCES [V7].[ContractorCompetency] ([ContractorCompetencyID]),
    CONSTRAINT [FK_ContractorCompanyApprovalLog_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContractorCompanyApprovalLog_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContractorCompanyApprovalLog_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ContractorCompanyApprovalLog_ApprovalComments]
    ON [V7].[ContractorCompanyApprovalLog]([ContractorCompanyID] ASC, [UserAreaID] ASC)
    INCLUDE([ContractorCompetencyID], [ChecklistEnrolmentID], [IsApproved], [Comments], [CreatedDate]);

