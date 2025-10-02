CREATE TABLE [V7].[FavouriteChecklist] (
    [FavouriteChecklistID] INT      IDENTITY (1, 1) NOT NULL,
    [ChecklistID]          INT      NOT NULL,
    [UserAreaID]           INT      NOT NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT      NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [IsForMobile]          BIT      DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([FavouriteChecklistID] ASC),
    CONSTRAINT [FK_FavouriteChecklist_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_FavouriteChecklist_Checklist] FOREIGN KEY ([ChecklistID]) REFERENCES [V7].[Checklist] ([ChecklistID]),
    CONSTRAINT [FK_FavouriteChecklist_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_FavouriteChecklist_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_FavouriteChecklist_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

