CREATE TABLE [V7].[UserFavouriteChecklist] (
    [UserFavouriteChecklistID] INT      IDENTITY (1, 1) NOT NULL,
    [FavouriteChecklistID]     INT      NOT NULL,
    [EmployeeID]               INT      NOT NULL,
    [UserAreaID]               INT      NOT NULL,
    [CreatedByUserID]          INT      NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT      NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT      NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserFavouriteChecklistID] ASC),
    CONSTRAINT [FK_UserFavouriteChecklist_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserFavouriteChecklist_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserFavouriteChecklist_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_UserFavouriteChecklist_FavouriteChecklist] FOREIGN KEY ([FavouriteChecklistID]) REFERENCES [V7].[FavouriteChecklist] ([FavouriteChecklistID]),
    CONSTRAINT [FK_UserFavouriteChecklist_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserFavouriteChecklist_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

