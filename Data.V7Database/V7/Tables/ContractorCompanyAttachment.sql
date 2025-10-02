CREATE TABLE [V7].[ContractorCompanyAttachment] (
    [ContractorCompanyAttachmentID] INT IDENTITY (1, 1) NOT NULL,
    [ContractorCompanyID]           INT NOT NULL,
    [AttachmentID]                  INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ContractorCompanyAttachmentID] ASC),
    CONSTRAINT [FK_ContractorCompanyAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_ContractorCompanyAttachment_ContractorCompany] FOREIGN KEY ([ContractorCompanyID]) REFERENCES [V7].[ContractorCompany] ([ContractorCompanyID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ContractorCompanyAttachment_ContractorCompanyID_includes]
    ON [V7].[ContractorCompanyAttachment]([ContractorCompanyID] ASC)
    INCLUDE([ContractorCompanyAttachmentID], [AttachmentID]);

