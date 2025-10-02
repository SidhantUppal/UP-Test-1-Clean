CREATE TABLE [V7].[WalkHazardReportType] (
    [WalkHazardReportTypeID] INT IDENTITY (1, 1) NOT NULL,
    [WalkID]                 INT NULL,
    [WalkTemplateID]         INT NULL,
    [HazardReportTypeID]     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([WalkHazardReportTypeID] ASC),
    CONSTRAINT [FK_WalkHazardReportType_HazardReportTypeID] FOREIGN KEY ([HazardReportTypeID]) REFERENCES [V7].[HazardReportType] ([HazardReportTypeID]),
    CONSTRAINT [FK_WalkHazardReportType_WalkID] FOREIGN KEY ([WalkID]) REFERENCES [V7].[Walk] ([WalkID]),
    CONSTRAINT [FK_WalkHazardReportType_WalkTemplateID] FOREIGN KEY ([WalkTemplateID]) REFERENCES [V7].[WalkTemplate] ([WalkTemplateID])
);

