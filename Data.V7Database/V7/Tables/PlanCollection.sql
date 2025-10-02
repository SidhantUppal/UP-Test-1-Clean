CREATE TABLE [V7].[PlanCollection] (
    [PlanCollectionID]     INT      IDENTITY (1, 1) NOT NULL,
    [PlanCollectionTypeID] INT      NOT NULL,
    [Priority]             INT      NOT NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT      NULL,
    [ArchivedByUserID]     INT      NULL,
    [Title] NVARCHAR (255) NULL,
    [Comments] NVARCHAR (MAX) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PlanCollectionID] ASC),
    CONSTRAINT [FK_PlanCollection_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PlanCollection_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PlanCollection_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PlanCollection_PlanCollectionType] FOREIGN KEY ([PlanCollectionTypeID]) REFERENCES [V7].[PlanCollectionType] ([PlanCollectionTypeID])
);

