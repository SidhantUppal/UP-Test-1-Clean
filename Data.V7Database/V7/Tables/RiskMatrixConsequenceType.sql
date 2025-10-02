CREATE TABLE [V7].[RiskMatrixConsequenceType] (
    [RiskMatrixConsequenceTypeID] INT                IDENTITY (1, 1) NOT NULL,
    [RiskMatrixTypeID]            INT                NOT NULL,
    [ConsequenceLevel]            INT                NOT NULL,
    [ConsequenceName]             NVARCHAR (100)     NOT NULL,
    [ConsequenceDescription]      NVARCHAR (500)     NULL,
    [CreatedByUserID]             INT                NOT NULL,
    [CreatedDate]                 DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]        INT                NULL,
    [ModifiedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskMatrixConsequenceTypeID] ASC),
    CONSTRAINT [FK_RiskMatrixConsequence_MatrixType] FOREIGN KEY ([RiskMatrixTypeID]) REFERENCES [V7].[RiskMatrixType] ([RiskMatrixTypeID])
);

