CREATE TABLE [V7].[UserAreaMonitoringSection] (
    [UserAreaMonitoringSectionID] INT           NOT NULL,
    [Reference]                   NVARCHAR (20) NOT NULL,
    [IsSystemConfigurable]        BIT           NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaMonitoringSectionID] ASC)
);

