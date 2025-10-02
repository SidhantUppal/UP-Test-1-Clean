CREATE TABLE [V7].[RiskMatrixType] (
    [RiskMatrixTypeID]     INT                IDENTITY (1, 1) NOT NULL,
    [MatrixName]           NVARCHAR (100)     NOT NULL,
    [MatrixDescription]    NVARCHAR (500)     NULL,
    [LikelihoodLevels]     INT                DEFAULT ((5)) NULL,
    [ConsequenceLevels]    INT                DEFAULT ((5)) NULL,
    [IsDefault]            BIT                DEFAULT ((0)) NULL,
    [IsActive]             BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskMatrixTypeID] ASC)
);

