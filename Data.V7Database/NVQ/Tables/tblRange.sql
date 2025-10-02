CREATE TABLE [NVQ].[tblRange] (
    [RangeId]      INT            IDENTITY (1, 1) NOT NULL,
    [ElementId]    INT            NOT NULL,
    [RangeGroupId] INT            NULL,
    [RangeText]    NVARCHAR (MAX) NOT NULL,
    [OrderIndex]   INT            NULL,
    [IsActive]     BIT            DEFAULT ((1)) NULL,
    [CreatedDate]  DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedDate] DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([RangeId] ASC),
    FOREIGN KEY ([ElementId]) REFERENCES [NVQ].[tblElement] ([ElementId]),
    FOREIGN KEY ([RangeGroupId]) REFERENCES [NVQ].[tblRangeGroup] ([RangeGroupId])
);

