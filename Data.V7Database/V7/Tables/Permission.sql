CREATE TABLE [V7].[Permission] (
    [PermissionID]     INT            IDENTITY (1, 1) NOT NULL,
    [ParentID]         INT            NULL,
    [Description]      NVARCHAR (255) NOT NULL,
    [Key]              NVARCHAR (50)  NOT NULL,
    [ArchivedByUserID] INT            NULL,
    [ArchivedDate]     DATETIMEOFFSET (7) NULL,
    [IsNotArchived]    AS             (case when [ArchivedDate] is null then (1) else (0) end) PERSISTED NOT NULL,
    PRIMARY KEY CLUSTERED ([PermissionID] ASC),
    CONSTRAINT [FK_Permission_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Permission_ParentID] FOREIGN KEY ([ParentID]) REFERENCES [V7].[Permission] ([PermissionID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ArchivedDate]
    ON [V7].[Permission]([ArchivedDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_IsNotArchived]
    ON [V7].[Permission]([IsNotArchived] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Parent]
    ON [V7].[Permission]([ParentID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Permission_Key]
    ON [V7].[Permission]([Key] ASC)
    INCLUDE([ParentID], [Description]);


GO
CREATE NONCLUSTERED INDEX [IX_Permission_Parent]
    ON [V7].[Permission]([ParentID] ASC)
    INCLUDE([Description], [Key]);

