CREATE TABLE [V7].[ValidationType] (
    [ValidationTypeID] INT           NOT NULL,
    [Reference]        VARCHAR (255) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([ValidationTypeID] ASC)
);

