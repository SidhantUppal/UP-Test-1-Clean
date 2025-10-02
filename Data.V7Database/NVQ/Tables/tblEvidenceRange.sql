CREATE TABLE [NVQ].[tblEvidenceRange] (
    [Id]           INT      IDENTITY (1, 1) NOT NULL,
    [EvidenceId]   INT      NOT NULL,
    [RangeId]      INT      NOT NULL,
    [IsCovered]    BIT      DEFAULT ((0)) NULL,
    [AssessedDate] DATETIMEOFFSET (7) NULL,
    [AssessedBy]   INT      NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([EvidenceId]) REFERENCES [NVQ].[tblEvidence] ([EvidenceId]),
    FOREIGN KEY ([RangeId]) REFERENCES [NVQ].[tblRange] ([RangeId])
);

