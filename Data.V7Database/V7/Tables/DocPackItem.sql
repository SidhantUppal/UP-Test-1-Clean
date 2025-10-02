CREATE TABLE [V7].[DocPackItem] (
    [DocPackItemID]        INT            IDENTITY (1, 1) NOT NULL,
    [DocPackID]            INT            NOT NULL,
    [ItemTableName]        NVARCHAR (100) NOT NULL,
    [ItemOriginalID]       INT            NOT NULL,
    [ItemID]               INT            NOT NULL,
    [ItemTitle]            NVARCHAR (255) NOT NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([DocPackItemID] ASC),
    CONSTRAINT [FK_DocPackItem_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocPackItem_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocPackItem_DocPack] FOREIGN KEY ([DocPackID]) REFERENCES [V7].[DocPack] ([DocPackID]),
    CONSTRAINT [FK_DocPackItem_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

