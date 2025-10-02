CREATE TABLE [V7].[ScheduledEventLog] (
    [ScheduledEventLogID] INT            IDENTITY (1, 1) NOT NULL,
    [ScheduledEventID]    INT            NOT NULL,
    [StartDateTime]       DATETIMEOFFSET (7) NOT NULL,
    [EndDateTime]         DATETIMEOFFSET (7) NULL,
    [Notes]               NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([ScheduledEventLogID] ASC),
    CONSTRAINT [FK_ScheduledEventLog_ScheduledEvent] FOREIGN KEY ([ScheduledEventID]) REFERENCES [V7].[ScheduledEvent] ([ScheduledEventID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ScheduledEventLog_ScheduledEvent]
    ON [V7].[ScheduledEventLog]([ScheduledEventID] ASC)
    INCLUDE([StartDateTime], [EndDateTime], [Notes]);

