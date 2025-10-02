CREATE TABLE [V7].[UserRole] (
    [UserRoleID] INT IDENTITY (1, 1) NOT NULL,
    [UserID]     INT NULL,
    [RoleID]     INT NULL,
    [UserAreaID] INT NULL,
    PRIMARY KEY CLUSTERED ([UserRoleID] ASC),
    CONSTRAINT [FK_UserRole_RoleID] FOREIGN KEY ([RoleID]) REFERENCES [V7].[Role] ([RoleID]),
    CONSTRAINT [FK_UserRole_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_UserRole_UserID] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserRole_UserIDUserAreaID]
    ON [V7].[UserRole]([UserID] ASC, [UserAreaID] ASC)
    INCLUDE([RoleID]);

