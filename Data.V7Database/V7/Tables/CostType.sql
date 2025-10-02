CREATE TABLE [V7].[CostType] (
    [CostTypeID]           INT           NOT NULL,
    [CostUnitTypeID]       INT           NOT NULL,
    [UserAreaID]           INT           NULL,
    [Reference]            NVARCHAR (20) NOT NULL,
    [OrderNum]             INT           DEFAULT ((1)) NOT NULL,
    [CreatedByUserID]      INT           NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT           NULL,
    [ArchivedByUserID]     INT           NULL,
    [Title] NVARCHAR (255) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CostTypeID] ASC),
    CONSTRAINT [FK_CostType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CostType_CostUnitType] FOREIGN KEY ([CostUnitTypeID]) REFERENCES [V7].[CostUnitType] ([CostUnitTypeID]),
    CONSTRAINT [FK_CostType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CostType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CostType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

