CREATE TABLE [V7].[TextBlockCourse] (
    [TextBlockCourseID] INT      IDENTITY (1, 1) NOT NULL,
    [TextBlockID]       INT      NOT NULL,
    [CourseID]          INT      NOT NULL,
    [CreatedByUserID]   INT      NOT NULL,
    [CreatedDate]       DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([TextBlockCourseID] ASC),
    CONSTRAINT [FK_TextBlockCourse_Course] FOREIGN KEY ([CourseID]) REFERENCES [V7].[Course] ([CourseID]),
    CONSTRAINT [FK_TextBlockCourse_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TextBlockCourse_TextBlock] FOREIGN KEY ([TextBlockID]) REFERENCES [V7].[TextBlock] ([TextBlockID])
);

