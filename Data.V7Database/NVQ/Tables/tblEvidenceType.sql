CREATE TABLE [NVQ].[tblEvidenceType] (
    [EvidenceTypeId] INT            IDENTITY (1, 1) NOT NULL,
    [TypeCode]       NVARCHAR (10)  NOT NULL,
    [TypeName]       NVARCHAR (50)  NOT NULL,
    [Description]    NVARCHAR (200) NULL,
    [IsActive]       BIT            DEFAULT ((1)) NULL,
    PRIMARY KEY CLUSTERED ([EvidenceTypeId] ASC)
);

