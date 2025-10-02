CREATE TABLE [V7].[UserAreaEntityCacheConfiguration] (
    [UserAreaEntityCacheConfigurationID] INT IDENTITY (1, 1) NOT NULL,
    [DocumentLinkTableTypeID]            INT NOT NULL,
    [UserAreaID]                         INT NULL,
    [MaxCacheCount]                      INT NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaEntityCacheConfigurationID] ASC),
    CONSTRAINT [FK_UserAreaEntityCacheConfiguration_DocumentLinkTableType] FOREIGN KEY ([DocumentLinkTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_UserAreaEntityCacheConfiguration_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

