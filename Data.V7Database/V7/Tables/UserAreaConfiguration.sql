CREATE TABLE [V7].[UserAreaConfiguration] (
    [UserAreaConfigurationID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]              INT NOT NULL,
    [ConfigurationTypeID]     INT NOT NULL,
    [IsEnabled]               BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaConfigurationID] ASC),
    CONSTRAINT [FK_UserAreaConfiguration_ConfigurationType] FOREIGN KEY ([ConfigurationTypeID]) REFERENCES [V7].[ConfigurationType] ([ConfigurationTypeID]),
    CONSTRAINT [FK_UserAreaConfiguration_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaConfiguration_IsEnabled]
    ON [V7].[UserAreaConfiguration]([UserAreaID] ASC, [ConfigurationTypeID] ASC)
    INCLUDE([IsEnabled]);

