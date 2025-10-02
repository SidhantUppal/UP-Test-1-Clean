CREATE TABLE [NVQ].[tblPortfolio] (
    [PortfolioId]        INT            IDENTITY (1, 1) NOT NULL,
    [LearnerId]          INT            NOT NULL,
    [QualificationId]    INT            NOT NULL,
    [AssessorId]         INT            NULL,
    [IVId]               INT            NULL,
    [PortfolioStatusId]  INT            NULL,
    [StartDate]          DATETIMEOFFSET (7)       NULL,
    [TargetEndDate]      DATETIMEOFFSET (7)       NULL,
    [ActualEndDate]      DATETIMEOFFSET (7)       NULL,
    [ProgressPercentage] DECIMAL (5, 2) DEFAULT ((0)) NULL,
    [IsActive]           BIT            DEFAULT ((1)) NULL,
    [CreatedBy]          INT            NULL,
    [CreatedDate]        DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedBy]         INT            NULL,
    [ModifiedDate]       DATETIMEOFFSET(7)       DEFAULT (sysdatetimeoffset()) NULL,
    [UserAreaID]         INT            DEFAULT ((1)) NULL,
    [ArchivedDate]       DATETIMEOFFSET (7)       NULL,
    [ArchivedBy]         INT            NULL,
    PRIMARY KEY CLUSTERED ([PortfolioId] ASC),
    FOREIGN KEY ([PortfolioStatusId]) REFERENCES [NVQ].[tblPortfolioStatus] ([PortfolioStatusId])
);


GO
CREATE NONCLUSTERED INDEX [IX_Portfolio_AssessorId]
    ON [NVQ].[tblPortfolio]([AssessorId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Portfolio_LearnerId]
    ON [NVQ].[tblPortfolio]([LearnerId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Portfolio_StatusId]
    ON [NVQ].[tblPortfolio]([PortfolioStatusId] ASC);

