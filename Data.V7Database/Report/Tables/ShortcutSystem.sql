CREATE TABLE [Report].[ShortcutSystem] (
    [ShortcutSystemID]     INT            IDENTITY (1, 1) NOT NULL,
    [ModuleTypeID]         INT            NOT NULL,
    [UserAreaID]           INT            NULL,
    [CanAddToDashboard]    BIT            NOT NULL,
    [Title]                NVARCHAR (255) NOT NULL,
    [Reference]            NVARCHAR (50)  NULL,
    [Filter]               NVARCHAR (MAX) NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7)       NOT NULL,
    [ModifiedByUserID]     INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7)       NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7)       NULL,
    PRIMARY KEY CLUSTERED ([ShortcutSystemID] ASC),
    CONSTRAINT [FK_ShortcutSystem_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ShortcutSystem_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ShortcutSystem_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ShortcutSystem_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

