CREATE TABLE [Report].[DashboardUserShortcutSlot] (
    [DashboardUserShortcutSlotID] INT     IDENTITY (1, 1) NOT NULL,
    [SlotID]                      INT     NOT NULL,
    [UserID]                      INT     NOT NULL,
    [UserAreaID]                  INT     NOT NULL,
    [ShortcutSystemID]            INT     NULL,
    [ShortcutUserFavouriteID]     INT     NULL,
    [SlotWidth]                   TINYINT NULL,
    [DefaultDashboardID]          INT     NULL,
    [IsForHomepage]               BIT     DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([DashboardUserShortcutSlotID] ASC),
    CONSTRAINT [FK_DashboardUserShortcutSlot_DefaultDashboard] FOREIGN KEY ([DefaultDashboardID]) REFERENCES [Report].[DefaultDashboard] ([DefaultDashboardID]),
    CONSTRAINT [FK_DashboardUserShortcutSlot_ShortcutSystem] FOREIGN KEY ([ShortcutSystemID]) REFERENCES [Report].[ShortcutSystem] ([ShortcutSystemID]),
    CONSTRAINT [FK_DashboardUserShortcutSlot_ShortcutUserFavourite] FOREIGN KEY ([ShortcutUserFavouriteID]) REFERENCES [Report].[ShortcutUserFavourite] ([ShortcutUserFavouriteID]),
    CONSTRAINT [FK_DashboardUserShortcutSlot_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DashboardUserShortcutSlot_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

