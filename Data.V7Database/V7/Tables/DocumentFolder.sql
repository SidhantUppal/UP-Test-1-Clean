CREATE TABLE [V7].[DocumentFolder] (
    [FolderID]             INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [Name]                 NVARCHAR (255)     NOT NULL,
    [ParentFolderID]       INT                NULL,
    [Path]                 NVARCHAR (500)     NOT NULL,
    [IsSystemFolder]       BIT                DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_DocumentFolder] PRIMARY KEY CLUSTERED ([FolderID] ASC),
    CONSTRAINT [FK_DocumentFolder_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentFolder_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentFolder_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentFolder_ParentFolder] FOREIGN KEY ([ParentFolderID]) REFERENCES [V7].[DocumentFolder] ([FolderID]),
    CONSTRAINT [FK_DocumentFolder_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentFolder_ParentFolderID]
    ON [V7].[DocumentFolder]([ParentFolderID] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentFolder_Path]
    ON [V7].[DocumentFolder]([Path] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentFolder_UserAreaID]
    ON [V7].[DocumentFolder]([UserAreaID] ASC) WHERE ([ArchivedDate] IS NULL);

