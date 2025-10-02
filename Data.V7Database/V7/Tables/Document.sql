CREATE TABLE [V7].[Document] (
    [DocumentID]           INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [DocumentType]         NVARCHAR (50)      DEFAULT ('Attachment') NOT NULL,
    [OriginalFileName]     NVARCHAR (255)     NOT NULL,
    [DisplayName]          NVARCHAR (255)     NOT NULL,
    [Description]          NVARCHAR (MAX)     NULL,
    [FileSize]             BIGINT             DEFAULT ((0)) NOT NULL,
    [MimeType]             NVARCHAR (100)     NULL,
    [StorageUrl]           NVARCHAR (500)     NULL,
    [FolderID]             INT                NULL,
    [PrivacyLevel]         NVARCHAR (50)      DEFAULT ('Public') NOT NULL,
    [Status]               NVARCHAR (50)      DEFAULT ('Draft') NOT NULL,
    [Tags]                 NVARCHAR (MAX)     NULL,
    [IsStarred]            BIT                DEFAULT ((0)) NOT NULL,
    [IsEncrypted]          BIT                DEFAULT ((0)) NOT NULL,
    [EncryptionMethod]     NVARCHAR (50)      NULL,
    [EncryptionKeyID]      NVARCHAR (255)     NULL,
    [ExternalDocumentID]   NVARCHAR (100)     NULL,
    [LegacySystemSource]   NVARCHAR (100)     NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]     INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_Document] PRIMARY KEY CLUSTERED ([DocumentID] ASC),
    CONSTRAINT [FK_Document_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Document_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Document_FolderID] FOREIGN KEY ([FolderID]) REFERENCES [V7].[DocumentFolder] ([FolderID]),
    CONSTRAINT [FK_Document_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Document_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_Document_CreatedDate]
    ON [V7].[Document]([CreatedDate] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_Document_DisplayName]
    ON [V7].[Document]([DisplayName] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_Document_FolderID]
    ON [V7].[Document]([FolderID] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_Document_Status]
    ON [V7].[Document]([Status] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_Document_UserAreaID]
    ON [V7].[Document]([UserAreaID] ASC) WHERE ([ArchivedDate] IS NULL);

