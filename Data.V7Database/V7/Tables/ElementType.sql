CREATE TABLE [V7].[ElementType] (
    [ElementTypeID] INT          NOT NULL,
    [Reference]     VARCHAR (50) NULL,
    [IsQuestion]    BIT          DEFAULT ((0)) NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([ElementTypeID] ASC)
);

