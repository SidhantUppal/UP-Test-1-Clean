CREATE TABLE [V7].[CustomPermission] (
    [CustomPermissionID]       INT      IDENTITY (1, 1) NOT NULL,
    [PermissionID]             INT      NOT NULL,
    [PermissionCategoryTypeID] INT      NOT NULL,
    [UserID]                   INT      NULL,
    [RoleID]                   INT      NULL,
    [UserAreaID]               INT      NOT NULL,
    [CustomPermissionItemID]   INT      NULL,
    [PermissionOverrideValue]  BIT      NOT NULL,
    [CreatedByUserID]          INT      NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]         INT      NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT      NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CustomPermissionID] ASC),
    CONSTRAINT [FK_CustomPermission_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CustomPermission_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CustomPermission_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CustomPermission_Permission] FOREIGN KEY ([PermissionID]) REFERENCES [V7].[Permission] ([PermissionID]),
    CONSTRAINT [FK_CustomPermission_Role] FOREIGN KEY ([RoleID]) REFERENCES [V7].[Role] ([RoleID]),
    CONSTRAINT [FK_CustomPermission_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);

