CREATE TABLE [V7].[CourseBundle] (
    [CourseBundleID]       INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [BundleName]           NVARCHAR (255)     NOT NULL,
    [BundleDescription]    NVARCHAR (MAX)     NULL,
    [TotalDurationMinutes] INT                NULL,
    [TotalCost]            DECIMAL (10, 2)    DEFAULT ((0)) NULL,
    [DiscountPercentage]   DECIMAL (5, 2)     DEFAULT ((0)) NULL,
    [IsActive]             BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]     INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CourseBundleID] ASC),
    CONSTRAINT [FK_CourseBundle_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

