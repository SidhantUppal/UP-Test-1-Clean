CREATE TABLE [V7].[PlanCollectionItem] (
    [PlanCollectionItemID]    INT      IDENTITY (1, 1) NOT NULL,
    [PlanCollectionID]        INT      NOT NULL,
    [AlertTypeID]             INT      NOT NULL,
    [DocumentLinkTableTypeID] INT      NULL,
    [ItemID]                  INT      NULL,
    [OrderNum]                INT      DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]         INT      NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]    INT      NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT      NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PlanCollectionItemID] ASC),
    CONSTRAINT [FK_PlanCollectionItem_AlertType] FOREIGN KEY ([AlertTypeID]) REFERENCES [V7].[AlertType] ([AlertTypeID]),
    CONSTRAINT [FK_PlanCollectionItem_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PlanCollectionItem_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PlanCollectionItem_DocumentLinkTableType] FOREIGN KEY ([DocumentLinkTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_PlanCollectionItem_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PlanCollectionItem_PlanCollection] FOREIGN KEY ([PlanCollectionID]) REFERENCES [V7].[PlanCollection] ([PlanCollectionID])
);

