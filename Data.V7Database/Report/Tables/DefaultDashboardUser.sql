CREATE TABLE [Report].[DefaultDashboardUser] (
    [DefaultDashboardUserID] INT      IDENTITY (1, 1) NOT NULL,
    [DefaultDashboardID]     INT      NOT NULL,
    [UserID]                 INT      NOT NULL,
    [CreatedByUserID]        INT      NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([DefaultDashboardUserID] ASC),
    CONSTRAINT [FK_DefaultDashboardUser_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DefaultDashboardUser_DefaultDashboard] FOREIGN KEY ([DefaultDashboardID]) REFERENCES [Report].[DefaultDashboard] ([DefaultDashboardID]),
    CONSTRAINT [FK_DefaultDashboardUser_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);

