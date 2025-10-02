CREATE TABLE [V7].[RiskMatrixLikelihoodType] (
    [RiskMatrixLikelihoodTypeID] INT                IDENTITY (1, 1) NOT NULL,
    [RiskMatrixTypeID]           INT                NOT NULL,
    [LikelihoodLevel]            INT                NOT NULL,
    [LikelihoodName]             NVARCHAR (100)     NOT NULL,
    [LikelihoodDescription]      NVARCHAR (500)     NULL,
    [Probability]                DECIMAL (5, 2)     NULL,
    [CreatedByUserID]            INT                NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]       INT                NULL,
    [ModifiedDate]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskMatrixLikelihoodTypeID] ASC),
    CONSTRAINT [FK_RiskMatrixLikelihood_MatrixType] FOREIGN KEY ([RiskMatrixTypeID]) REFERENCES [V7].[RiskMatrixType] ([RiskMatrixTypeID])
);

