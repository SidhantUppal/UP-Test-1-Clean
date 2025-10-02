CREATE TABLE [V7].[Favourite] (
    [FavouriteID]            INT             IDENTITY (1, 1) NOT NULL,
    [UserAreaID]             INT             NOT NULL,
    [UserID]                 INT             NOT NULL,
    [ReportType]             INT             NOT NULL,
    [URL]                    NVARCHAR (1024) NOT NULL,
    [Note]                   NVARCHAR (50)   NULL,
    [SearchFilterObjectName] NVARCHAR (64)   NULL,
    [SearchFilterParams]     NVARCHAR (4000) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([FavouriteID] ASC),
    CONSTRAINT [FK_Favourite_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Favourite_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Favourite_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Favourite_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_Favourite_UserID] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);

