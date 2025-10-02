CREATE TABLE [NVQ].[tblKnowledgeRequirement] (
    [KnowledgeId]     INT            IDENTITY (1, 1) NOT NULL,
    [UnitId]          INT            NULL,
    [ElementId]       INT            NULL,
    [RequirementCode] NVARCHAR (20)  NULL,
    [RequirementText] NVARCHAR (MAX) NOT NULL,
    [OrderIndex]      INT            NULL,
    [IsActive]        BIT            DEFAULT ((1)) NULL,
    [CreatedDate]     DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedDate]    DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([KnowledgeId] ASC),
    FOREIGN KEY ([ElementId]) REFERENCES [NVQ].[tblElement] ([ElementId]),
    FOREIGN KEY ([UnitId]) REFERENCES [NVQ].[tblUnit] ([UnitId])
);

