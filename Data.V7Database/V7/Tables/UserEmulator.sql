CREATE TABLE [V7].[UserEmulator] (
    [UserEmulatorID]      INT IDENTITY (1, 1) NOT NULL,
    [UserID]              INT NOT NULL,
    [PermittedUserAreaID] INT NULL,
    PRIMARY KEY CLUSTERED ([UserEmulatorID] ASC),
    CONSTRAINT [FK_UserEmulator_UserAreaID] FOREIGN KEY ([PermittedUserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_UserEmulator_UserID] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);

