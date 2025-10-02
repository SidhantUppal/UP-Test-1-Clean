CREATE TABLE [V7].[EmployeeFavouriteWalk] (
    [EmployeeFavouriteWalkID] INT      IDENTITY (1, 1) NOT NULL,
    [FavouriteWalkID]         INT      NOT NULL,
    [EmployeeID]              INT      NOT NULL,
    [UserAreaID]              INT      NOT NULL,
    [CreatedByUserID]         INT      NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]    INT      NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT      NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([EmployeeFavouriteWalkID] ASC),
    CONSTRAINT [FK_EmployeeFavouriteWalk_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeFavouriteWalk_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeFavouriteWalk_EmployeeID] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EmployeeFavouriteWalk_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeFavouriteWalk_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_EmployeeFavouriteWalk_WalkID] FOREIGN KEY ([FavouriteWalkID]) REFERENCES [V7].[FavouriteWalk] ([FavouriteWalkID])
);

