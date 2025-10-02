CREATE TABLE [V7].[WalkHazardReport] (
    [WalkHazardReportID] INT IDENTITY (1, 1) NOT NULL,
    [HazardReportID]     INT NOT NULL,
    [WalkResponseID]     INT NOT NULL,
    [WalkCheckpointID]   INT NULL,
    PRIMARY KEY CLUSTERED ([WalkHazardReportID] ASC),
    CONSTRAINT [FK_WalkHazardReport_HazardReportID] FOREIGN KEY ([HazardReportID]) REFERENCES [V7].[HazardReport] ([HazardReportID]),
    CONSTRAINT [FK_WalkHazardReport_WalkCheckpointID] FOREIGN KEY ([WalkCheckpointID]) REFERENCES [V7].[WalkCheckpoint] ([WalkCheckpointID]),
    CONSTRAINT [FK_WalkHazardReport_WalkResponseID] FOREIGN KEY ([WalkResponseID]) REFERENCES [V7].[WalkResponse] ([WalkResponseID])
);

