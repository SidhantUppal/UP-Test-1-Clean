CREATE TABLE [NVQ].[tblEvidenceKnowledgeRequirement] (
    [Id]           INT      IDENTITY (1, 1) NOT NULL,
    [EvidenceId]   INT      NOT NULL,
    [KnowledgeId]  INT      NOT NULL,
    [IsMet]        BIT      DEFAULT ((0)) NULL,
    [AssessedDate] DATETIMEOFFSET (7) NULL,
    [AssessedBy]   INT      NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([EvidenceId]) REFERENCES [NVQ].[tblEvidence] ([EvidenceId]),
    FOREIGN KEY ([KnowledgeId]) REFERENCES [NVQ].[tblKnowledgeRequirement] ([KnowledgeId])
);

