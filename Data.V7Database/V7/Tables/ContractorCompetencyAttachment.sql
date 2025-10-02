CREATE TABLE [V7].[ContractorCompetencyAttachment] (
    [ContractorCompetencyAttachmentID] INT IDENTITY (1, 1) NOT NULL,
    [ContractorCompetencyID]           INT NOT NULL,
    [AttachmentID]                     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ContractorCompetencyAttachmentID] ASC),
    CONSTRAINT [FK_ContractorCompetencyAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_ContractorCompetencyAttachment_ContractorCompetency] FOREIGN KEY ([ContractorCompetencyID]) REFERENCES [V7].[ContractorCompetency] ([ContractorCompetencyID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ContractorCompetencyAttachment_ContractorCompetencyID_includes]
    ON [V7].[ContractorCompetencyAttachment]([ContractorCompetencyID] ASC)
    INCLUDE([ContractorCompetencyAttachmentID], [AttachmentID]);

