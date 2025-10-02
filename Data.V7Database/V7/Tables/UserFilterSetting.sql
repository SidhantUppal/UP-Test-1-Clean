CREATE TABLE [V7].[UserFilterSetting] (
    [UserFilterSettingID] INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]          INT           NOT NULL,
    [UserID]              INT           NULL,
    [ControllerName]      NVARCHAR (50) NOT NULL,
    [ActionName]          NVARCHAR (50) NOT NULL,
    [IsDefaultExpanded]   BIT           DEFAULT ((0)) NULL,
    [DefaultOrderValue]   VARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([UserFilterSettingID] ASC),
    CONSTRAINT [FK_UserFilterSetting_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserFilterSetting_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

