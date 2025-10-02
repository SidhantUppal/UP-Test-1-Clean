CREATE TABLE [V7].[OrgGroupUser] (
    [OrgGroupUserID] INT IDENTITY (1, 1) NOT NULL,
    [OrgGroupID]     INT NOT NULL,
    [UserID]         INT NOT NULL,
    PRIMARY KEY CLUSTERED ([OrgGroupUserID] ASC),
    CONSTRAINT [FK_OrgGroupUser_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_OrgGroupUser_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [CK_OrgGroupUser_Unique] UNIQUE NONCLUSTERED ([OrgGroupID] ASC, [UserID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_OrgGroupUser_UserID_includes]
    ON [V7].[OrgGroupUser]([UserID] ASC)
    INCLUDE([OrgGroupUserID], [OrgGroupID]);

