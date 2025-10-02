CREATE TABLE [V7].[CompanyStatus] (
    [CompanyStatusID] INT           NOT NULL,
    [Reference]       NVARCHAR (50) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([CompanyStatusID] ASC)
);

