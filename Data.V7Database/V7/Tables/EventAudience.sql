CREATE TABLE [V7].[EventAudience] (
    [EventAudienceID] INT IDENTITY (1, 1) NOT NULL,
    [EventID]         INT NOT NULL,
    [UserAreaID]      INT NULL,
    [UserID]          INT NULL,
    PRIMARY KEY CLUSTERED ([EventAudienceID] ASC),
    CONSTRAINT [FK_EventAudience_Event] FOREIGN KEY ([EventID]) REFERENCES [V7].[Event] ([EventID]),
    CONSTRAINT [FK_EventAudience_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EventAudience_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

