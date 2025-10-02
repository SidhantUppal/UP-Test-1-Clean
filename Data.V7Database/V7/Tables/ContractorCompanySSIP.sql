CREATE TABLE [V7].[ContractorCompanySSIP] (
    [ContractorCompanySSIPID] INT      IDENTITY (1, 1) NOT NULL,
    [ContractorCompanyID]     INT      NOT NULL,
    [SSIPID]                  INT      NOT NULL,
    [AttachmentID]            INT      NULL,
    [RenewalDate]             DATE     NULL,
    [CreatedByUserID]         INT      NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]        INT      NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT      NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ContractorCompanySSIPID] ASC),
    CONSTRAINT [FK_ContractorCompanySSIP_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContractorCompanySSIP_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_ContractorCompanySSIP_ContractorCompany] FOREIGN KEY ([ContractorCompanyID]) REFERENCES [V7].[ContractorCompany] ([ContractorCompanyID]),
    CONSTRAINT [FK_ContractorCompanySSIP_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContractorCompanySSIP_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContractorCompanySSIP_SSIP] FOREIGN KEY ([SSIPID]) REFERENCES [V7].[SSIP] ([SSIPID])
);

