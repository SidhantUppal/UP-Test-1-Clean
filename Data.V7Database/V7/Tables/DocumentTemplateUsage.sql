CREATE TABLE [V7].[DocumentTemplateUsage] (
    [DocumentTemplateUsageID] INT                IDENTITY (1, 1) NOT NULL,
    [DocumentTemplateID]      INT                NOT NULL,
    [DocumentID]              INT                NULL,
    [UsedByUserID]            INT                NOT NULL,
    [UsedDate]                DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [GeneratedDocumentName]   NVARCHAR (255)     NULL,
    [TagValuesUsed]           NVARCHAR (MAX)     NULL,
    PRIMARY KEY CLUSTERED ([DocumentTemplateUsageID] ASC),
    FOREIGN KEY ([DocumentTemplateID]) REFERENCES [V7].[DocumentTemplate] ([DocumentTemplateID]),
    FOREIGN KEY ([UsedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentTemplateUsage_DocumentTemplateID]
    ON [V7].[DocumentTemplateUsage]([DocumentTemplateID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentTemplateUsage_UsedByUserID]
    ON [V7].[DocumentTemplateUsage]([UsedByUserID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentTemplateUsage_UsedDate]
    ON [V7].[DocumentTemplateUsage]([UsedDate] ASC);

