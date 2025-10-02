CREATE TABLE [V7].[DocumentBundleItem] (
    [BundleItemID]       INT            IDENTITY (1, 1) NOT NULL,
    [BundleID]           INT            NOT NULL,
    [DocumentID]         INT            NULL,
    [DocumentTemplateID] INT            NULL,
    [DisplayOrder]       INT            DEFAULT ((0)) NOT NULL,
    [IsRequired]         BIT            DEFAULT ((1)) NOT NULL,
    [RequiresSignature]  BIT            DEFAULT ((0)) NOT NULL,
    [SignatureType]      NVARCHAR (50)  NULL,
    [Instructions]       NVARCHAR (MAX) NULL,
    [DueDaysOffset]      INT            NULL,
    [Metadata]           NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_DocumentBundleItem] PRIMARY KEY CLUSTERED ([BundleItemID] ASC),
    CONSTRAINT [CHK_DocumentBundleItem_DocumentOrTemplate] CHECK ([DocumentID] IS NOT NULL AND [DocumentTemplateID] IS NULL OR [DocumentID] IS NULL AND [DocumentTemplateID] IS NOT NULL),
    CONSTRAINT [FK_DocumentBundleItem_Bundle] FOREIGN KEY ([BundleID]) REFERENCES [V7].[DocumentBundle] ([BundleID]),
    CONSTRAINT [FK_DocumentBundleItem_Document] FOREIGN KEY ([DocumentID]) REFERENCES [V7].[Document] ([DocumentID]),
    CONSTRAINT [FK_DocumentBundleItem_Template] FOREIGN KEY ([DocumentTemplateID]) REFERENCES [V7].[DocumentTemplate] ([DocumentTemplateID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentBundleItem_BundleID]
    ON [V7].[DocumentBundleItem]([BundleID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentBundleItem_DocumentID]
    ON [V7].[DocumentBundleItem]([DocumentID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentBundleItem_DocumentTemplateID]
    ON [V7].[DocumentBundleItem]([DocumentTemplateID] ASC);

