CREATE TABLE [V7].[UserAreaCostType] (
    [UserAreaCostTypeID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]         INT NOT NULL,
    [CostTypeID]         INT NOT NULL,
    [IsVisible]          BIT NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaCostTypeID] ASC),
    CONSTRAINT [FK_UserAreaCostType_CostType] FOREIGN KEY ([CostTypeID]) REFERENCES [V7].[CostType] ([CostTypeID]),
    CONSTRAINT [FK_UserAreaCostType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [CK_UserAreaCostType_UserAreaCostType] UNIQUE NONCLUSTERED ([UserAreaID] ASC, [CostTypeID] ASC)
);

