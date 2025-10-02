CREATE TABLE [V7].[TaskAssignableUser] (
    [TaskAssignableUserID] INT      IDENTITY (1, 1) NOT NULL,
    [UserID]               INT      NOT NULL,
    [UserAreaID]           INT      NOT NULL,
    [LastAssignedDate]     DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TaskAssignableUserID] ASC),
    CONSTRAINT [FK_TaskAssignableUser_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskAssignableUser_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskAssignableUser_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskAssignableUser_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

