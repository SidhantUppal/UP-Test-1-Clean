CREATE TABLE [V7].[DocPackViewerUser] (
    [DocPackViewerUserID] INT      IDENTITY (1, 1) NOT NULL,
    [DocPackID]           INT      NOT NULL,
    [UserID]              INT      NOT NULL,
    [ExpirationDate]      DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]     INT      NULL,
    [CreatedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([DocPackViewerUserID] ASC),
    CONSTRAINT [FK_DocPackViewerUser_DocPack] FOREIGN KEY ([DocPackID]) REFERENCES [V7].[DocPack] ([DocPackID]),
    CONSTRAINT [FK_DocPackViewerUser_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);

