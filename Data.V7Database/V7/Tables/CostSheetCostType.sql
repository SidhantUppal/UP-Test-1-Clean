CREATE TABLE [V7].[CostSheetCostType] (
    [CostSheetCostTypeID]  INT             IDENTITY (1, 1) NOT NULL,
    [CostSheetID]          INT             NOT NULL,
    [CostTypeID]           INT             NOT NULL,
    [Value]                NUMERIC (10, 2) DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]      INT             NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT             NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT             NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CostSheetCostTypeID] ASC),
    CONSTRAINT [FK_CostSheetCostType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CostSheetCostType_CostSheet] FOREIGN KEY ([CostSheetID]) REFERENCES [V7].[CostSheet] ([CostSheetID]),
    CONSTRAINT [FK_CostSheetCostType_CostType] FOREIGN KEY ([CostTypeID]) REFERENCES [V7].[CostType] ([CostTypeID]),
    CONSTRAINT [FK_CostSheetCostType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CostSheetCostType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_CostSheetCostType_SheetType]
    ON [V7].[CostSheetCostType]([CostSheetID] ASC, [CostTypeID] ASC)
    INCLUDE([Value]);

