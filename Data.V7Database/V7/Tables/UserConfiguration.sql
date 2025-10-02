CREATE TABLE [V7].[UserConfiguration] (
    [UserConfigurationID] INT IDENTITY (1, 1) NOT NULL,
    [UserID]              INT NOT NULL,
    [ConfigurationTypeID] INT NOT NULL,
    [IsEnabled]           BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserConfigurationID] ASC),
    CONSTRAINT [FK_UserConfiguration_ConfigurationType] FOREIGN KEY ([ConfigurationTypeID]) REFERENCES [V7].[ConfigurationType] ([ConfigurationTypeID]),
    CONSTRAINT [FK_UserConfiguration_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserConfiguration_IsEnabled]
    ON [V7].[UserConfiguration]([UserID] ASC, [ConfigurationTypeID] ASC)
    INCLUDE([IsEnabled]);

