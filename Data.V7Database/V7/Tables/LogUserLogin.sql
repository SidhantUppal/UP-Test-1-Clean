CREATE TABLE [V7].[LogUserLogin] (
    [LogUserLoginID] INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]     INT           NOT NULL,
    [UserID]         INT           NOT NULL,
    [DateTime]       DATETIMEOFFSET (7) NOT NULL,
    [GUID]           NVARCHAR (36) NULL,
    [SessionID]      VARCHAR (255) NULL,
    [LogoutDateTime] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([LogUserLoginID] ASC),
    CONSTRAINT [FK_LogUserLogin_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_LogUserLogin_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_LogUserLogin_User]
    ON [V7].[LogUserLogin]([UserID] ASC)
    INCLUDE([LogUserLoginID], [UserAreaID], [DateTime]);


GO
CREATE NONCLUSTERED INDEX [IX_LogUserLogin_UserArea]
    ON [V7].[LogUserLogin]([UserAreaID] ASC)
    INCLUDE([LogUserLoginID], [UserID], [DateTime]);

