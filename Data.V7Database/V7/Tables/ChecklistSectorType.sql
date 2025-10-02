CREATE TABLE [V7].[ChecklistSectorType] (
    [ChecklistSectorTypeID] INT           NOT NULL,
    [Reference]             NVARCHAR (20) NULL,
    [UserAreaID]            INT           NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([ChecklistSectorTypeID] ASC),
    CONSTRAINT [FK_ChecklistSectorType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

