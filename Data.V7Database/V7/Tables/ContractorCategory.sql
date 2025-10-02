CREATE TABLE [V7].[ContractorCategory] (
    [ContractorCategoryID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT NULL,
    [Title] NVARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([ContractorCategoryID] ASC),
    CONSTRAINT [FK_ContractorCategory_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

