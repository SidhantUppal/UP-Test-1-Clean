CREATE TABLE [V7].[CategoryType] (
    [CategoryTypeID] INT            NOT NULL,
    [Type]           NVARCHAR (50)  NOT NULL,
    [Title]          NVARCHAR (150) NOT NULL,
    [IsLive]         BIT            DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([CategoryTypeID] ASC)
);

