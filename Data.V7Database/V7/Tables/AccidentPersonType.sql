CREATE TABLE [V7].[AccidentPersonType] (
    [AccidentPersonTypeID] INT           NOT NULL,
    [Reference]            NVARCHAR (20) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([AccidentPersonTypeID] ASC)
);

