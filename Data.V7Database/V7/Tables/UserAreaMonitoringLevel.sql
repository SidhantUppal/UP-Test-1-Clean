CREATE TABLE [V7].[UserAreaMonitoringLevel] (
    [UserAreaMonitoringLevelID]     INT      IDENTITY (1, 1) NOT NULL,
    [V5UserAreaOptionID]            INT      NULL,
    [UserAreaID]                    INT      NOT NULL,
    [UserAreaMonitoringLevelTypeID] INT      NOT NULL,
    [CreatedByUserID]               INT      NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]          INT      NULL,
    [ModifiedDate]              DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT      NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaMonitoringLevelID] ASC),
    CONSTRAINT [FK_UserAreaMonitoringLevel_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaMonitoringLevel_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaMonitoringLevel_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

