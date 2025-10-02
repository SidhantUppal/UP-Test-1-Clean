CREATE TABLE [V7].[UserUserArea] (
    [UserUserAreaID] INT IDENTITY (1, 1) NOT NULL,
    [UserID]         INT NOT NULL,
    [UserAreaID]     INT NOT NULL,
    [IsDisabled]     BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserUserAreaID] ASC),
    CONSTRAINT [FK_UserUserArea_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserUserArea_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserUserArea_IsDisabled]
    ON [V7].[UserUserArea]([UserID] ASC, [UserAreaID] ASC)
    INCLUDE([IsDisabled]);

