CREATE TABLE [NVQ].[tblEvidencePerformanceCriteria] (
    [Id]           INT      IDENTITY (1, 1) NOT NULL,
    [EvidenceId]   INT      NOT NULL,
    [CriteriaId]   INT      NOT NULL,
    [IsMet]        BIT      DEFAULT ((0)) NULL,
    [AssessedDate] DATETIMEOFFSET (7) NULL,
    [AssessedBy]   INT      NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([CriteriaId]) REFERENCES [NVQ].[tblPerformanceCriteria] ([CriteriaId]),
    FOREIGN KEY ([EvidenceId]) REFERENCES [NVQ].[tblEvidence] ([EvidenceId])
);

