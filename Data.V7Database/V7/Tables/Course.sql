CREATE TABLE [V7].[Course] (
    [CourseID]             INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [CourseCode]           NVARCHAR (50)      NOT NULL,
    [CourseName]           NVARCHAR (255)     NOT NULL,
    [CourseDescription]    NVARCHAR (MAX)     NULL,
    [CourseTypeID]         INT                NULL,
    [CourseCategoryID]     INT                NULL,
    [DurationMinutes]      INT                NULL,
    [PassingScore]         DECIMAL (5, 2)     NULL,
    [MaxAttempts]          INT                DEFAULT ((3)) NULL,
    [ValidityDays]         INT                NULL,
    [ContentType]          NVARCHAR (50)      DEFAULT ('Internal') NULL,
    [ContentURL]           NVARCHAR (500)     NULL,
    [ThumbnailURL]         NVARCHAR (500)     NULL,
    [Status]               NVARCHAR (50)      DEFAULT ('Draft') NULL,
    [PublishedDate]        DATETIMEOFFSET (7) NULL,
    [IsActive]             BIT                DEFAULT ((1)) NULL,
    [IsMandatory]          BIT                DEFAULT ((0)) NULL,
    [Cost]                 DECIMAL (10, 2)    DEFAULT ((0)) NULL,
    [Currency]             NVARCHAR (3)       DEFAULT ('USD') NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]     INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CourseID] ASC),
    CONSTRAINT [FK_Course_CourseCategory] FOREIGN KEY ([CourseCategoryID]) REFERENCES [V7].[CourseCategory] ([CourseCategoryID]),
    CONSTRAINT [FK_Course_CourseType] FOREIGN KEY ([CourseTypeID]) REFERENCES [V7].[CourseType] ([CourseTypeID]),
    CONSTRAINT [FK_Course_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_Course_CourseCode]
    ON [V7].[Course]([CourseCode] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Course_Status]
    ON [V7].[Course]([Status] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Course_UserAreaID]
    ON [V7].[Course]([UserAreaID] ASC);

