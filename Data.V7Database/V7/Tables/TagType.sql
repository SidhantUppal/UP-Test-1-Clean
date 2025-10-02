CREATE TABLE [V7].[TagType] (
    [TagTypeID]            INT          IDENTITY (1001, 1) NOT NULL,
    [UserAreaID]           INT          NULL,
    [TypeCategoryID]       INT          NULL,
    [Reference]            VARCHAR (50) NOT NULL,
    [CreatedByUserID]      INT          NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT          NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT          NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [Title] NVARCHAR (255) NULL,
    CONSTRAINT [PK__TagType__BEE8E8CB06DAFB11] PRIMARY KEY CLUSTERED ([TagTypeID] ASC),
    CONSTRAINT [FK_TagType_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TagType_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TagType_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TagType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

