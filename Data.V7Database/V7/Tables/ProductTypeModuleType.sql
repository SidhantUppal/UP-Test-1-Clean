CREATE TABLE [V7].[ProductTypeModuleType] (
    [ProductTypeModuleTypeID] INT IDENTITY (1, 1) NOT NULL,
    [ProductTypeID]           INT NOT NULL,
    [ModuleTypeID]            INT NOT NULL,
    CONSTRAINT [PK__ProductT__CB2777070DE860E2] PRIMARY KEY CLUSTERED ([ProductTypeModuleTypeID] ASC),
    CONSTRAINT [FK_ProductTypeModuleType_ModuleType] FOREIGN KEY ([ModuleTypeID]) REFERENCES [V7].[ModuleType] ([ModuleTypeID]),
    CONSTRAINT [FK_ProductTypeModuleType_ProductType] FOREIGN KEY ([ProductTypeID]) REFERENCES [V7].[ProductType] ([ProductTypeID]),
    CONSTRAINT [CK_ProductTypeModuleType_Unique] UNIQUE NONCLUSTERED ([ProductTypeID] ASC, [ModuleTypeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_ProductTypeModuleType_ProductTypeModuleType]
    ON [V7].[ProductTypeModuleType]([ProductTypeID] ASC, [ModuleTypeID] ASC);

