CREATE TABLE [V7].[GeographicalAreaType] (
    [GeographicalAreaTypeID] INT           NOT NULL,
    [UserAreaID]         INT           NULL,
    [CountryID]              INT           NOT NULL,
    [Reference]              NVARCHAR (50) NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([GeographicalAreaTypeID] ASC),
    CONSTRAINT [FK_GeographicalAreaType_CountryID] FOREIGN KEY ([CountryID]) REFERENCES [V7].[Country] ([CountryID])
,
    CONSTRAINT [FK_GeographicalAreaType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_GeographicalAreaType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_GeographicalAreaType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_GeographicalAreaType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


