CREATE TABLE [NVQ].[tblEvidence] (
    [EvidenceId]               INT            IDENTITY (1, 1) NOT NULL,
    [PortfolioId]              INT            NOT NULL,
    [EvidenceRef]              NVARCHAR (50)  NOT NULL,
    [EvidenceTitle]            NVARCHAR (200) NOT NULL,
    [EvidenceTypeId]           INT            NULL,
    [Description]              NVARCHAR (MAX) NULL,
    [EvidenceDate]             DATETIMEOFFSET (7)       NULL,
    [Location]                 NVARCHAR (200) NULL,
    [AssessorComments]         NVARCHAR (MAX) NULL,
    [IVComments]               NVARCHAR (MAX) NULL,
    [DocumentPath]             NVARCHAR (500) NULL,
    [IsDirectObservation]      BIT            DEFAULT ((0)) NULL,
    [IsQuestioning]            BIT            DEFAULT ((0)) NULL,
    [IsProductEvidence]        BIT            DEFAULT ((0)) NULL,
    [IsWitnessTestimony]       BIT            DEFAULT ((0)) NULL,
    [IsProfessionalDiscussion] BIT            DEFAULT ((0)) NULL,
    [IsSimulation]             BIT            DEFAULT ((0)) NULL,
    [IsAuthentic]              BIT            NULL,
    [IsCurrent]                BIT            NULL,
    [IsSufficient]             BIT            NULL,
    [IsValid]                  BIT            NULL,
    [CreatedBy]                INT            NULL,
    [CreatedDate]              DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedBy]               INT            NULL,
    [ModifiedDate]             DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([EvidenceId] ASC),
    FOREIGN KEY ([EvidenceTypeId]) REFERENCES [NVQ].[tblEvidenceType] ([EvidenceTypeId]),
    FOREIGN KEY ([PortfolioId]) REFERENCES [NVQ].[tblPortfolio] ([PortfolioId])
);


GO
CREATE NONCLUSTERED INDEX [IX_Evidence_PortfolioId]
    ON [NVQ].[tblEvidence]([PortfolioId] ASC);

