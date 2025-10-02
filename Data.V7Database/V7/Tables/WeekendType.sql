CREATE TABLE [V7].[WeekendType] (
    [WeekendTypeID] INT            NOT NULL,
    [RegionTypeID]  INT            NULL,
    [DayOfWeek]     INT            NOT NULL,
    [DayNote]       NVARCHAR (100) NOT NULL,
    PRIMARY KEY CLUSTERED ([WeekendTypeID] ASC),
    CONSTRAINT [FK_WeekendType_Region] FOREIGN KEY ([RegionTypeID]) REFERENCES [V7].[RegionType] ([RegionTypeID])
);

