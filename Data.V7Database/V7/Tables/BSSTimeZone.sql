CREATE TABLE [V7].[BSSTimeZone] (
    [TimeZoneID]     INT           NOT NULL,
    [Code]           NVARCHAR (5)  NOT NULL,
    [Name]           NVARCHAR (50) NOT NULL,
    [UTCOffsetHours] FLOAT (53)    NOT NULL,
    [DateFormat]     VARCHAR (10)  NOT NULL,
    PRIMARY KEY CLUSTERED ([TimeZoneID] ASC)
);

