CREATE TABLE [V7].[OperationType] (
    [OperationTypeID] INT          NOT NULL,
    [Reference]       VARCHAR (20) NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([OperationTypeID] ASC)
);

