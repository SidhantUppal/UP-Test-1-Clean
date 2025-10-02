CREATE TABLE [V7].[ScheduledEvent] (
    [ScheduledEventID]         INT      IDENTITY (1, 1) NOT NULL,
    [ScheduledEventTypeID]     INT      NOT NULL,
    [EmailFrequencyTypeID]     INT      NOT NULL,
    [UserAreaID]               INT      NULL,
    [IsEnabled]                BIT      CONSTRAINT [DF__Scheduled__IsEna__6BA66F74] DEFAULT ((0)) NOT NULL,
    [StartDate]                DATE     NOT NULL,
    [ExpiryDate]               DATE     NULL,
    [FirstInstanceStartHour]   TINYINT  CONSTRAINT [DF__Scheduled__First__6C9A93AD] DEFAULT ((0)) NOT NULL,
    [FirstInstanceStartMinute] TINYINT  CONSTRAINT [DF__Scheduled__First__6D8EB7E6] DEFAULT ((0)) NOT NULL,
    [LastInstanceStartHour]    TINYINT  NULL,
    [LastInstanceStartMinute]  TINYINT  NULL,
    [RepeatEveryXMinutes]      INT      CONSTRAINT [DF__Scheduled__Repea__6E82DC1F] DEFAULT ((0)) NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [CreatedByUserID]          INT      NOT NULL,
    CONSTRAINT [PK__Schedule__272BFD394740C93D] PRIMARY KEY CLUSTERED ([ScheduledEventID] ASC),
    CONSTRAINT [FK_ScheduledEvent_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ScheduledEvent_EmailFrequencyType] FOREIGN KEY ([EmailFrequencyTypeID]) REFERENCES [V7].[EmailFrequencyType] ([EmailFrequencyTypeID]),
    CONSTRAINT [FK_ScheduledEvent_ScheduledEventType] FOREIGN KEY ([ScheduledEventTypeID]) REFERENCES [V7].[ScheduledEventType] ([ScheduledEventTypeID]),
    CONSTRAINT [FK_ScheduledEvent_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

