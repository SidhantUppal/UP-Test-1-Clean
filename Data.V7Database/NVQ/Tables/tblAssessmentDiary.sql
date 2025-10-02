CREATE TABLE [NVQ].[tblAssessmentDiary] (
    [DiaryId]             INT            IDENTITY (1, 1) NOT NULL,
    [PortfolioId]         INT            NOT NULL,
    [LogTypeId]           INT            NULL,
    [ActivityDate]        DATETIMEOFFSET (7)       NOT NULL,
    [ActivityDescription] NVARCHAR (MAX) NULL,
    [Duration]            INT            NULL,
    [AssessorId]          INT            NULL,
    [LearnerId]           INT            NULL,
    [UnitsAssessed]       NVARCHAR (500) NULL,
    [Location]            NVARCHAR (200) NULL,
    [NextActionRequired]  NVARCHAR (MAX) NULL,
    [NextActionDate]      DATETIMEOFFSET (7)       NULL,
    [CreatedBy]           INT            NULL,
    [CreatedDate]         DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedBy]          INT            NULL,
    [ModifiedDate]        DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([DiaryId] ASC),
    FOREIGN KEY ([LogTypeId]) REFERENCES [NVQ].[tblAssessmentDiaryLogType] ([LogTypeId]),
    FOREIGN KEY ([PortfolioId]) REFERENCES [NVQ].[tblPortfolio] ([PortfolioId])
);


GO
CREATE NONCLUSTERED INDEX [IX_AssessmentDiary_PortfolioId]
    ON [NVQ].[tblAssessmentDiary]([PortfolioId] ASC);

