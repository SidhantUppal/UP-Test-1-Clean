CREATE TABLE [V7].[CopyUserAreaEmployee] (
    [CopyUserAreaEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [CopiedUserAreaID]       INT NULL,
    [NewUserAreaID]          INT NULL,
    [CopiedEmployeeID]       INT NULL,
    [NewEmployeeID]          INT NULL,
    [CopiedUserID]           INT NULL,
    PRIMARY KEY CLUSTERED ([CopyUserAreaEmployeeID] ASC)
);

