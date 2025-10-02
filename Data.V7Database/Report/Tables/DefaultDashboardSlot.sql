CREATE TABLE [Report].[DefaultDashboardSlot] (
    [DefaultDashboardSlotID]  INT     IDENTITY (1, 1) NOT NULL,
    [DefaultDashboardID]      INT     NOT NULL,
    [SlotID]                  INT     NOT NULL,
    [SlotWidth]               TINYINT NULL,
    [ModuleTypeID]            INT     NOT NULL,
    [ShortcutSystemID]        INT     NULL,
    [ShortcutUserFavouriteID] INT     NULL,
    PRIMARY KEY CLUSTERED ([DefaultDashboardSlotID] ASC),
    CONSTRAINT [FK_DefaultDashboardSlot_DefaultDashboard] FOREIGN KEY ([DefaultDashboardID]) REFERENCES [Report].[DefaultDashboard] ([DefaultDashboardID]),
    CONSTRAINT [FK_DefaultDashboardSlot_ModuleType] FOREIGN KEY ([ModuleTypeID]) REFERENCES [V7].[ModuleType] ([ModuleTypeID]),
    CONSTRAINT [FK_DefaultDashboardSlot_ShortcutSystem] FOREIGN KEY ([ShortcutSystemID]) REFERENCES [Report].[ShortcutSystem] ([ShortcutSystemID]),
    CONSTRAINT [FK_DefaultDashboardSlot_ShortcutUserFavourite] FOREIGN KEY ([ShortcutUserFavouriteID]) REFERENCES [Report].[ShortcutUserFavourite] ([ShortcutUserFavouriteID])
);

