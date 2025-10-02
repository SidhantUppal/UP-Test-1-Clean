CREATE TABLE [V7].[Folder] (
    [FolderID]             INT            IDENTITY (1, 1) NOT NULL,
    [ParentFolderID]       INT            NULL,
    [FolderTypeID]         INT            NOT NULL,
    [UserAreaID]           INT            NOT NULL,
    [Title]                NVARCHAR (255) NOT NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [V5FolderID]           INT            NULL,
    PRIMARY KEY CLUSTERED ([FolderID] ASC),
    CONSTRAINT [FK_Folder_ArchivedByUserID] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Folder_CreatedByUserID] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Folder_FolderTypeID] FOREIGN KEY ([FolderTypeID]) REFERENCES [V7].[FolderType] ([FolderTypeID]),
    CONSTRAINT [FK_Folder_ModifiedByUserID] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Folder_ParentFolderID] FOREIGN KEY ([ParentFolderID]) REFERENCES [V7].[Folder] ([FolderID]),
    CONSTRAINT [FK_Folder_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

