CREATE TABLE [Report].[ShortcutSystemUser] (
    [ShortcutSystemUserID] INT IDENTITY (1, 1) NOT NULL,
    [ShortcutSystemID]     INT NOT NULL,
    [UserID]               INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ShortcutSystemUserID] ASC),
    CONSTRAINT [FK_ShortcutSystemUser_ShortcutSystem] FOREIGN KEY ([ShortcutSystemID]) REFERENCES [Report].[ShortcutSystem] ([ShortcutSystemID]),
    CONSTRAINT [FK_ShortcutSystemUser_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);

