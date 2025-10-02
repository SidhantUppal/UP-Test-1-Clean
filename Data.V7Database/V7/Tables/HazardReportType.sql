CREATE TABLE [V7].[HazardReportType] (
    [HazardReportTypeID] INT           NOT NULL,
    [Reference]          NVARCHAR (50) NULL,
    [UserAreaID]         INT           NULL,
    [Title] NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([HazardReportTypeID] ASC),
    CONSTRAINT [FK_HazardReportType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

