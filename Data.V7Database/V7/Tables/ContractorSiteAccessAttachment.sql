CREATE TABLE [V7].[ContractorSiteAccessAttachment] (
    [ContractorSiteAccessAttachmentID] INT            IDENTITY (1, 1) NOT NULL,
    [ContractorSiteAccessID]           INT            NOT NULL,
    [ContractorCompanyAttachmentID]    INT            NOT NULL,
    [LinkedByUserID]                   INT            NOT NULL,
    [LinkedDate]                       DATETIMEOFFSET (7) NOT NULL,
    [Comments]                         NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([ContractorSiteAccessAttachmentID] ASC),
    CONSTRAINT [FK_ContractorSiteAccessAttachment_ContractorCompanyAttachment] FOREIGN KEY ([ContractorCompanyAttachmentID]) REFERENCES [V7].[ContractorCompanyAttachment] ([ContractorCompanyAttachmentID]),
    CONSTRAINT [FK_ContractorSiteAccessAttachment_ContractorSiteAccess] FOREIGN KEY ([ContractorSiteAccessID]) REFERENCES [V7].[ContractorSiteAccess] ([ContractorSiteAccessID]),
    CONSTRAINT [FK_ContractorSiteAccessAttachment_LinkedBy] FOREIGN KEY ([LinkedByUserID]) REFERENCES [V7].[User] ([UserID])
);

