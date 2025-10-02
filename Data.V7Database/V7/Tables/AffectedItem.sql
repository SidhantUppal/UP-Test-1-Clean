CREATE TABLE [V7].[AffectedItem] (
    [AffectedItemID]       INT           IDENTITY (1, 1) NOT NULL,
    [AffectedItemTypeID]   INT           NOT NULL,
    [UserAreaID]           INT           NOT NULL,
    [Reference]            NVARCHAR (20) NULL,
    [CreatedByUserID]      INT           NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT           NULL,
    [ArchivedByUserID]     INT           NULL,
    [Title]                NVARCHAR (255) NULL,
    [Description]          NVARCHAR (MAX) NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AffectedItemID] ASC),
    CONSTRAINT [FK_AffectedItem_AffectedItemType] FOREIGN KEY ([AffectedItemTypeID]) REFERENCES [V7].[AffectedItemType] ([AffectedItemTypeID]),
    CONSTRAINT [FK_AffectedItem_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AffectedItem_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AffectedItem_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AffectedItem_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

