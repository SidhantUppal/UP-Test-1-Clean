CREATE TABLE [V7].[CourseAssignment] (
    [CourseAssignmentID]   INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [CourseID]             INT                NOT NULL,
    [AssignedToUserID]     INT                NOT NULL,
    [AssignedByUserID]     INT                NOT NULL,
    [AssignmentDate]       DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [DueDate]              DATETIMEOFFSET (7) NULL,
    [Priority]             NVARCHAR (20)      DEFAULT ('Normal') NULL,
    [Notes]                NVARCHAR (MAX)     NULL,
    [Status]               NVARCHAR (50)      DEFAULT ('Assigned') NULL,
    [CompletedDate]        DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]     INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CourseAssignmentID] ASC),
    CONSTRAINT [FK_CourseAssignment_AssignedBy] FOREIGN KEY ([AssignedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CourseAssignment_AssignedTo] FOREIGN KEY ([AssignedToUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CourseAssignment_Course] FOREIGN KEY ([CourseID]) REFERENCES [V7].[Course] ([CourseID]),
    CONSTRAINT [FK_CourseAssignment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_CourseAssignment_AssignedToUserID]
    ON [V7].[CourseAssignment]([AssignedToUserID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_CourseAssignment_DueDate]
    ON [V7].[CourseAssignment]([DueDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_CourseAssignment_Status]
    ON [V7].[CourseAssignment]([Status] ASC);

