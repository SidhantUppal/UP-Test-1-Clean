CREATE TABLE [V7].[CopyUserAreaUser] (
    [CopyUserAreaUserID] INT IDENTITY (1, 1) NOT NULL,
    [CopiedUserAreaID]   INT NULL,
    [NewUserAreaID]      INT NULL,
    [CopiedUserID]       INT NULL,
    [NewUserID]          INT NULL,
    PRIMARY KEY CLUSTERED ([CopyUserAreaUserID] ASC)
);

