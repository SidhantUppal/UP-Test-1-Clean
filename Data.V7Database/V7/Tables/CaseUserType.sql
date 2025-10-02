CREATE TABLE [V7].[CaseUserType] (
    [CaseUserTypeID] INT           NOT NULL,
    [Reference]      NVARCHAR (50) NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([CaseUserTypeID] ASC)
);

