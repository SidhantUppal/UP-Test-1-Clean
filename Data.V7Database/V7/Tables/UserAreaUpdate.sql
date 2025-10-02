CREATE TABLE [V7].[UserAreaUpdate] (
    [UserAreaUpdateID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]       INT NOT NULL,
    [UpdateID]         INT NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaUpdateID] ASC),
    CONSTRAINT [FK_UserAreaUpdate_Update] FOREIGN KEY ([UpdateID]) REFERENCES [V7].[Update] ([UpdateID]),
    CONSTRAINT [FK_UserAreaUpdate_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaUpdate_UserAreaID_includes]
    ON [V7].[UserAreaUpdate]([UserAreaID] ASC)
    INCLUDE([UserAreaUpdateID], [UpdateID]);

