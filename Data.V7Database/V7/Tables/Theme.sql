CREATE TABLE [V7].[Theme] (
    [ThemeID]                   INT            IDENTITY (1, 1) NOT NULL,
    [Title]                     NVARCHAR (255) NOT NULL,
    [CustomCultureRegionString] NVARCHAR (255) NULL,
    [CssFolderRelativePath]     NVARCHAR (MAX) NULL,
    [ImagesFolderRelativePath]  NVARCHAR (MAX) NULL,
    [LogoImageTitle]            NVARCHAR (255) NULL,
    [Description]               NVARCHAR (MAX) NULL,
    [LogoAttachmentID]          INT            NULL,
    [OwnerUserAreaID]           INT            NULL,
    [CreatedByUserID]           INT            NOT NULL,
    [CreatedDate]               DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]      INT            NULL,
    [ModifiedDate]          DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]          INT            NULL,
    [ArchivedDate]              DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__Theme__FBB3E4B9A652332E] PRIMARY KEY CLUSTERED ([ThemeID] ASC),
    CONSTRAINT [FK_Theme_ArchivedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Theme_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Theme_LastUpdatedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Theme_LogoAttachment] FOREIGN KEY ([LogoAttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_Theme_OwnerUserAreaID] FOREIGN KEY ([OwnerUserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

