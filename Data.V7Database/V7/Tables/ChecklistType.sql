CREATE TABLE [V7].[ChecklistType] (
    [ChecklistTypeID] INT           NOT NULL,
    [Reference]       NVARCHAR (20) NULL,
    [IsAudit]         BIT           DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([ChecklistTypeID] ASC)
);

