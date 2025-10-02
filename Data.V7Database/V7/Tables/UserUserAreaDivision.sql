CREATE TABLE [V7].[UserUserAreaDivision] (
    [UserUserAreaDivisionID] INT IDENTITY (1, 1) NOT NULL,
    [UserID]                 INT NOT NULL,
    [UserAreaDivisionID]     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([UserUserAreaDivisionID] ASC),
    CONSTRAINT [FK_UserUserAreaDivision_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserUserAreaDivision_UserAreaDivision] FOREIGN KEY ([UserAreaDivisionID]) REFERENCES [V7].[UserAreaDivision] ([UserAreaDivisionID])
);

