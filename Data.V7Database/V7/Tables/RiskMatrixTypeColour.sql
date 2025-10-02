CREATE TABLE [V7].[RiskMatrixTypeColour] (
    [RiskMatrixTypeColourID] INT                IDENTITY (1, 1) NOT NULL,
    [RiskMatrixTypeID]       INT                NOT NULL,
    [LikelihoodLevel]        INT                NOT NULL,
    [ConsequenceLevel]       INT                NOT NULL,
    [RiskLevelColourTypeID]  INT                NOT NULL,
    [RiskScore]              INT                NOT NULL,
    [CreatedByUserID]        INT                NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([RiskMatrixTypeColourID] ASC),
    CONSTRAINT [FK_RiskMatrixTypeColour_Colour] FOREIGN KEY ([RiskLevelColourTypeID]) REFERENCES [V7].[RiskLevelColourType] ([RiskLevelColourTypeID]),
    CONSTRAINT [FK_RiskMatrixTypeColour_MatrixType] FOREIGN KEY ([RiskMatrixTypeID]) REFERENCES [V7].[RiskMatrixType] ([RiskMatrixTypeID])
);

