CREATE TABLE [V7].[ModuleType] (
    [ModuleTypeID]               INT            NOT NULL,
    [Controller]                 NVARCHAR (50)  NULL,
    [Action]                     NVARCHAR (50)  NULL,
    [MenuIcon]                   NVARCHAR (255) NULL,
    [IsVisibleOnSidebar]         BIT            DEFAULT ((1)) NOT NULL,
    [RootPermissionID]           INT            NULL,
    [DisplayPermissionID]        INT            NULL,
    [IsMobileViewable]           BIT            DEFAULT ((0)) NULL,
    [ArchivedByUserID]           INT            NULL,    [MobileIcon]                 NVARCHAR (255) NULL,
    [IsDevelopedOnMobile]        BIT            DEFAULT ((0)) NOT NULL,
    [IsNotArchived]              AS             (case when [ArchivedDate] is null then (1) else (0) end) PERSISTED NOT NULL,
    [DefaultSystemProductTypeID] INT            NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [CreatedDate] DATETIMEOFFSET (7) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ModuleTypeID] ASC),
    CONSTRAINT [FK_ModuleType_ArchivedUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ModuleType_DefaultSystemProductType] FOREIGN KEY ([DefaultSystemProductTypeID]) REFERENCES [V7].[SystemProductType] ([SystemProductTypeID]),
    CONSTRAINT [FK_ModuleType_DisplayPermission] FOREIGN KEY ([DisplayPermissionID]) REFERENCES [V7].[Permission] ([PermissionID]),
    CONSTRAINT [FK_ModuleType_RootPermission] FOREIGN KEY ([RootPermissionID]) REFERENCES [V7].[Permission] ([PermissionID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ArchivedDate]
    ON [V7].[ModuleType]([ArchivedDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_IsNotArchived]
    ON [V7].[ModuleType]([IsNotArchived] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_ModuleType_RootPermission]
    ON [V7].[ModuleType]([RootPermissionID] ASC);

