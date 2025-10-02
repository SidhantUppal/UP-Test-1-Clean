CREATE TABLE [Report].[GraphType] (
    [GraphTypeID]      INT            IDENTITY (1, 1) NOT NULL,
    [GraphBaseTypeID]  INT            NOT NULL,
    [GraphTabTypeID]   INT            NOT NULL,
    [ModuleTypeID]     INT            NOT NULL,
    [OrderNumber]      INT            NOT NULL,
    [Description]      NVARCHAR (255) NULL,
    [IsDefaultEnabled] BIT            NOT NULL,
    [IsActive]         BIT            NOT NULL,
    PRIMARY KEY CLUSTERED ([GraphTypeID] ASC),
    CONSTRAINT [FK_GraphType_GraphBaseType] FOREIGN KEY ([GraphBaseTypeID]) REFERENCES [Report].[GraphBaseType] ([GraphBaseTypeID]),
    CONSTRAINT [FK_GraphType_GraphTabType] FOREIGN KEY ([GraphTabTypeID]) REFERENCES [Report].[GraphTabType] ([GraphTabTypeID])
);

