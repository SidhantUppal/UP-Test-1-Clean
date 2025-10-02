CREATE TABLE [V7].[SourceStaticDataType] (
    [SourceStaticDataTypeID] INT           IDENTITY (1, 1) NOT NULL,
    [Title]                  VARCHAR (64)  NULL,
    [IconFileName]           VARCHAR (256) NULL,
    PRIMARY KEY CLUSTERED ([SourceStaticDataTypeID] ASC)
);

