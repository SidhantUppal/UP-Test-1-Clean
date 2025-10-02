CREATE TABLE [V7].[TextBlockStatusType] (
    [TextBlockStatusTypeID] INT NOT NULL,
    [IsVisible]             BIT DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([TextBlockStatusTypeID] ASC)
);

