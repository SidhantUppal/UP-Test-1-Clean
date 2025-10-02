CREATE TABLE [V7].[UserPasswordHistory] (
    [UserPasswordHistoryID] INT           IDENTITY (1, 1) NOT NULL,
    [UserID]                INT           NOT NULL,
    [Salt]                  NVARCHAR (10) NOT NULL,
    [Password]              NVARCHAR (50) NOT NULL,
    [InvalidatedDate]       DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserPasswordHistoryID] ASC),
    CONSTRAINT [FK_UserPasswordHistory_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserPasswordHistory_SaltPassword]
    ON [V7].[UserPasswordHistory]([UserID] ASC)
    INCLUDE([UserPasswordHistoryID], [Salt], [Password]);

