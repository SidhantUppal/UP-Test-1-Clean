CREATE TABLE [V7].[UserSystemProductType] (
    [UserSystemProductTypeID] INT IDENTITY (1, 1) NOT NULL,
    [UserID]                  INT NOT NULL,
    [UserAreaID]              INT NOT NULL,
    [SystemProductTypeID]     INT NOT NULL,
    [IsEnabled]               BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserSystemProductTypeID] ASC),
    CONSTRAINT [FK_UserSystemProductType_SystemProductType] FOREIGN KEY ([SystemProductTypeID]) REFERENCES [V7].[SystemProductType] ([SystemProductTypeID]),
    CONSTRAINT [FK_UserSystemProductType_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserSystemProductType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserSystemProductType_IsEnabled]
    ON [V7].[UserSystemProductType]([UserID] ASC, [UserAreaID] ASC, [SystemProductTypeID] ASC)
    INCLUDE([IsEnabled]);

