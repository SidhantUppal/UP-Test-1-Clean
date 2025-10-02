CREATE TABLE [NVQ].[tblPerformanceCriteria] (
    [CriteriaId]   INT            IDENTITY (1, 1) NOT NULL,
    [ElementId]    INT            NOT NULL,
    [CriteriaCode] NVARCHAR (20)  NULL,
    [CriteriaText] NVARCHAR (MAX) NOT NULL,
    [OrderIndex]   INT            NULL,
    [IsActive]     BIT            DEFAULT ((1)) NULL,
    [CreatedDate]  DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedDate] DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([CriteriaId] ASC),
    FOREIGN KEY ([ElementId]) REFERENCES [NVQ].[tblElement] ([ElementId])
);


GO
CREATE NONCLUSTERED INDEX [IX_PerformanceCriteria_ElementId]
    ON [NVQ].[tblPerformanceCriteria]([ElementId] ASC);

