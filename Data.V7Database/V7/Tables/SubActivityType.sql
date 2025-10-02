CREATE TABLE [V7].[SubActivityType] (
    [SubActivityTypeID]  INT           NOT NULL,
    [MainActivityTypeID] INT           NOT NULL,
    [Reference]          NVARCHAR (50) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([SubActivityTypeID] ASC)
);

