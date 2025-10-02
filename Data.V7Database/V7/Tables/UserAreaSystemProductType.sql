CREATE TABLE [V7].[UserAreaSystemProductType] (
    [UserAreaSystemProductTypeID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                  INT NOT NULL,
    [SystemProductTypeID]         INT NOT NULL,
    [IsEnabled]                   BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaSystemProductTypeID] ASC),
    CONSTRAINT [FK_UserAreaSystemProductType_SystemProductType] FOREIGN KEY ([SystemProductTypeID]) REFERENCES [V7].[SystemProductType] ([SystemProductTypeID]),
    CONSTRAINT [FK_UserAreaSystemProductType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaSystemProductType_IsEnabled]
    ON [V7].[UserAreaSystemProductType]([UserAreaID] ASC, [SystemProductTypeID] ASC)
    INCLUDE([IsEnabled]);

