CREATE TABLE [Report].[ShortcutUserFavourite] (
    [ShortcutUserFavouriteID] INT            IDENTITY (1, 1) NOT NULL,
    [UserID]                  INT            NOT NULL,
    [ModuleTypeID]            INT            NOT NULL,
    [DashboardStatusTypeID]   INT            DEFAULT ((0)) NOT NULL,
    [Filter]                  NVARCHAR (MAX) NULL,
    [Title]                   NVARCHAR (255) NOT NULL,
    [CreatedByUserID]         INT            NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7)       NOT NULL,
    [ModifiedByUserID]        INT            NULL,
    [ModifiedDate]        DATETIMEOFFSET (7)       NULL,
    [ArchivedByUserID]        INT            NULL,
    [ArchivedDate]            DATETIMEOFFSET (7)       NULL,
    [UserAreaID]              INT            NULL,
    PRIMARY KEY CLUSTERED ([ShortcutUserFavouriteID] ASC),
    CONSTRAINT [FK_ShortcutUserFavourite_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ShortcutUserFavourite_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ShortcutUserFavourite_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ShortcutUserFavourite_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ShortcutUserFavourite_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

