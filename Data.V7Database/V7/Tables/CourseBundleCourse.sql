CREATE TABLE [V7].[CourseBundleCourse] (
    [CourseBundleCourseID] INT                IDENTITY (1, 1) NOT NULL,
    [CourseBundleID]       INT                NOT NULL,
    [CourseID]             INT                NOT NULL,
    [SequenceOrder]        INT                DEFAULT ((0)) NULL,
    [IsMandatory]          BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([CourseBundleCourseID] ASC),
    CONSTRAINT [FK_CourseBundleCourse_Bundle] FOREIGN KEY ([CourseBundleID]) REFERENCES [V7].[CourseBundle] ([CourseBundleID]),
    CONSTRAINT [FK_CourseBundleCourse_Course] FOREIGN KEY ([CourseID]) REFERENCES [V7].[Course] ([CourseID]),
    CONSTRAINT [UQ_CourseBundleCourse] UNIQUE NONCLUSTERED ([CourseBundleID] ASC, [CourseID] ASC)
);

