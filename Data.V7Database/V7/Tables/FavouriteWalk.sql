CREATE TABLE [V7].[FavouriteWalk] (
    [FavouriteWalkID]      INT      IDENTITY (1, 1) NOT NULL,
    [WalkID]               INT      NOT NULL,
    [UserAreaID]           INT      NOT NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT      NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([FavouriteWalkID] ASC),
    CONSTRAINT [FK_FavouriteWalk_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_FavouriteWalk_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_FavouriteWalk_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_FavouriteWalk_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_FavouriteWalk_WalkID] FOREIGN KEY ([WalkID]) REFERENCES [V7].[Walk] ([WalkID])
);

