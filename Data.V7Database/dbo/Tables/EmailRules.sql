CREATE TABLE [dbo].[EmailRules] (
    [Id]        UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [Name]      NVARCHAR (100)   NOT NULL,
    [Condition] NVARCHAR (MAX)   NOT NULL,
    [Action]    NVARCHAR (MAX)   NOT NULL,
    [Enabled]   BIT              DEFAULT ((1)) NULL,
    [Priority]  INT              DEFAULT ((0)) NULL,
    [CreatedAt] DATETIME2 (7)    DEFAULT (getutcdate()) NULL,
    [UpdatedAt] DATETIME2 (7)    DEFAULT (getutcdate()) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

