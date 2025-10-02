CREATE TABLE [V7].[DocumentSignature] (
    [SignatureID]       INT                IDENTITY (1, 1) NOT NULL,
    [DocumentID]        INT                NOT NULL,
    [SignerUserID]      INT                NOT NULL,
    [SignatureProvider] NVARCHAR (50)      NOT NULL,
    [SignatureStatus]   NVARCHAR (50)      NOT NULL,
    [SignedAt]          DATETIMEOFFSET (7) NULL,
    [SignatureData]     NVARCHAR (MAX)     NULL,
    [IPAddress]         NVARCHAR (50)      NULL,
    [SignedDocumentUrl] NVARCHAR (500)     NULL,
    [ExpiresAt]         DATETIMEOFFSET (7) NULL,
    [CreatedDate]       DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    CONSTRAINT [PK_DocumentSignature] PRIMARY KEY CLUSTERED ([SignatureID] ASC),
    CONSTRAINT [FK_DocumentSignature_Document] FOREIGN KEY ([DocumentID]) REFERENCES [V7].[Document] ([DocumentID]),
    CONSTRAINT [FK_DocumentSignature_Signer] FOREIGN KEY ([SignerUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentSignature_DocumentID]
    ON [V7].[DocumentSignature]([DocumentID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentSignature_SignerUserID]
    ON [V7].[DocumentSignature]([SignerUserID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentSignature_Status]
    ON [V7].[DocumentSignature]([SignatureStatus] ASC);

