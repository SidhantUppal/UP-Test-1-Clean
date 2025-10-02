CREATE TABLE [Report].[DefaultDashboard] (
    [DefaultDashboardID]   INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT            NOT NULL,
    [LayoutType]           VARCHAR (10)   NOT NULL,
    [TotalSlots]           TINYINT        DEFAULT ((10)) NOT NULL,
    [Title]                NVARCHAR (255) NOT NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7)       NOT NULL,
    [ModifiedByUserID]     INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7)       NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7)       NULL,
    PRIMARY KEY CLUSTERED ([DefaultDashboardID] ASC),
    CONSTRAINT [FK_DefaultDashboard_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DefaultDashboard_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DefaultDashboard_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DefaultDashboard_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

