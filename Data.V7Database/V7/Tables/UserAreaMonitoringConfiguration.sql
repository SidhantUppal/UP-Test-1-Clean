CREATE TABLE [V7].[UserAreaMonitoringConfiguration] (
    [UserAreaMonitoringConfigurationID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                        INT NOT NULL,
    [UserAreaMonitoringSectionID]       INT NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaMonitoringConfigurationID] ASC),
    CONSTRAINT [FK_UserAreaMonitoringConfiguration_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_UserAreaMonitoringConfiguration_UserAreaMonitoringSection] FOREIGN KEY ([UserAreaMonitoringSectionID]) REFERENCES [V7].[UserAreaMonitoringSection] ([UserAreaMonitoringSectionID])
);

