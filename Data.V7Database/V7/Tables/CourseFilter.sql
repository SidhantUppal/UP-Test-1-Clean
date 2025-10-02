CREATE TABLE [V7].[CourseFilter] (
    [CourseFilterID]       INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [FilterName]           NVARCHAR (100)     NOT NULL,
    [FilterType]           NVARCHAR (50)      NOT NULL,
    [FilterValue]          NVARCHAR (255)     NOT NULL,
    [IsActive]             BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]     INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CourseFilterID] ASC),
    CONSTRAINT [FK_CourseFilter_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

