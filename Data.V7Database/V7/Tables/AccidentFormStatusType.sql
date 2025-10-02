CREATE TABLE [V7].[AccidentFormStatusType] (
    [AccidentFormStatusTypeID] INT           NOT NULL,
    [Reference]                NVARCHAR (20) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([AccidentFormStatusTypeID] ASC)
);

