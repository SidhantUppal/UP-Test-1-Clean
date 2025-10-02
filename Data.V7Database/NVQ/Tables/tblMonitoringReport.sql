CREATE TABLE [NVQ].[tblMonitoringReport] (
    [ReportId]             INT            IDENTITY (1, 1) NOT NULL,
    [PortfolioId]          INT            NOT NULL,
    [MonitorDate]          DATETIMEOFFSET (7)       NOT NULL,
    [MonitoredBy]          INT            NULL,
    [ReportType]           NVARCHAR (50)  NULL,
    [ObservationType]      NVARCHAR (50)  NULL,
    [StrengthsIdentified]  NVARCHAR (MAX) NULL,
    [AreasForImprovement]  NVARCHAR (MAX) NULL,
    [ActionPlan]           NVARCHAR (MAX) NULL,
    [ActionPlanDueDate]    DATETIMEOFFSET (7)       NULL,
    [IsActionPlanComplete] BIT            DEFAULT ((0)) NULL,
    [OverallGrade]         NVARCHAR (20)  NULL,
    [CreatedBy]            INT            NULL,
    [CreatedDate]          DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedBy]           INT            NULL,
    [ModifiedDate]         DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([ReportId] ASC),
    FOREIGN KEY ([PortfolioId]) REFERENCES [NVQ].[tblPortfolio] ([PortfolioId])
);

