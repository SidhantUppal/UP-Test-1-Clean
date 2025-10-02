CREATE TABLE [V7].[CopyUserAreaData] (
    [CopyUserAreaDataID] INT           IDENTITY (1, 1) NOT NULL,
    [CopiedUserAreaID]   INT           NULL,
    [NewUserAreaID]      INT           NULL,
    [TypeName]           VARCHAR (255) NULL,
    [CopiedID]           INT           NULL,
    [NewID]              INT           NULL,
    [CopiedParentID]     INT           NULL,
    [NewParentID]        INT           NULL,
    PRIMARY KEY CLUSTERED ([CopyUserAreaDataID] ASC)
);

