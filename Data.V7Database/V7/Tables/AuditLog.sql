CREATE TABLE [V7].[AuditLog] (
    [AuditLogID]      INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]      INT            NOT NULL,
    [UserID]          INT            NOT NULL,
    [RecordTableName] VARCHAR (50)   NOT NULL,
    [RecordID]        INT            NOT NULL,
    [ChangeType]      VARCHAR (10)   NOT NULL,
    [ChangeDate]      DATETIMEOFFSET (7) NOT NULL,
    [ChangeComments]  NVARCHAR (255) NULL,
    [OriginalData]    NVARCHAR (MAX) NULL,
    [LatestData]      NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([AuditLogID] ASC),
    CONSTRAINT [FK_AuditLog_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AuditLog_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

