CREATE TABLE [V7].[UserAreaAccidentTag] (
    [UserAreaAccidentTagID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]            INT            NOT NULL,
    [DisplayName]           NVARCHAR (100) NOT NULL,
    [CreatedByUserID]       INT            NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]  INT            NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT            NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaAccidentTagID] ASC),
    CONSTRAINT [FK_UserAreaAccidentTag_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaAccidentTag_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaAccidentTag_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaAccidentTag_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

