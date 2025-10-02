CREATE TABLE [V7].[WorkProcessType] (
    [WorkProcessTypeID] INT           NOT NULL,
    [Reference]         NVARCHAR (50) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([WorkProcessTypeID] ASC)
);

