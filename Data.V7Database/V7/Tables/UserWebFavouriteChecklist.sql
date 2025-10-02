CREATE TABLE [V7].[UserWebFavouriteChecklist] (
    [UserWebFavouriteChecklistID] INT      IDENTITY (1, 1) NOT NULL,
    [FavouriteChecklistID]        INT      NOT NULL,
    [UserAreaID]                  INT      NOT NULL,
    [UserID]                      INT      NOT NULL,
    [CreatedByUserID]             INT      NOT NULL,
    [CreatedDate]                 DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]        INT      NULL,
    [ModifiedDate]            DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]            INT      NULL,
    [ArchivedDate]                DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserWebFavouriteChecklistID] ASC),
    CONSTRAINT [FK_UserWebFavouriteChecklist_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserWebFavouriteChecklist_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserWebFavouriteChecklist_FavouriteChecklist] FOREIGN KEY ([FavouriteChecklistID]) REFERENCES [V7].[FavouriteChecklist] ([FavouriteChecklistID]),
    CONSTRAINT [FK_UserWebFavouriteChecklist_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserWebFavouriteChecklist_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserWebFavouriteChecklist_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

