CREATE TABLE [V7].[CourseEnrollment] (
    [CourseEnrollmentID]          INT            IDENTITY (1, 1) NOT NULL,
    [OriginalCourseEnrolmentID]   INT            NULL,
    [CourseAssignmentID]          INT            NOT NULL,
    [IsLiveDate]                  DATETIMEOFFSET (7) NULL,
    [StartDate]                   DATETIMEOFFSET (7) NULL,
    [CompletionDate]              DATETIMEOFFSET (7) NULL,
    [CourseEnrolmentStatusTypeID] INT            NULL,
    [Result]                      BIT            NULL,
    [Note]                        NVARCHAR (MAX) NULL,
    [CreatedByUserID]             INT            NOT NULL,
    [CreatedDate]                 DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]            INT            NULL,
    [ModifiedDate]            DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]            INT            NULL,
    [ArchivedDate]                DATETIMEOFFSET (7) NULL,
    [AttachmentID]                INT            NULL,
    [UserAreaID]                  INT            NULL,
    [AssessorEmployeeID]          INT            NULL,
    CONSTRAINT [PK__CourseEn__E31874EDC820EB64] PRIMARY KEY CLUSTERED ([CourseEnrollmentID] ASC),
    CONSTRAINT [FK_CourseEnrollment_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CourseEnrollment_CourseAssignmentID] FOREIGN KEY ([CourseAssignmentID]) REFERENCES [V7].[CourseAssignment] ([CourseAssignmentID]),
    CONSTRAINT [FK_CourseEnrollment_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CourseEnrollment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CourseEnrolment_AssessorEmployeeID] FOREIGN KEY ([AssessorEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_CourseEnrolment_CourseEnrolmentStatusTypeID] FOREIGN KEY ([CourseEnrolmentStatusTypeID]) REFERENCES [V7].[CourseEnrolmentStatusType] ([CourseEnrolmentStatusTypeID]),
    CONSTRAINT [FK_CourseEnrolment_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_CourseEnrollment_CourseAssignmentID]
    ON [V7].[CourseEnrollment]([CourseAssignmentID] ASC)
    INCLUDE([StartDate], [CompletionDate], [Result], [ArchivedDate]);


GO
CREATE NONCLUSTERED INDEX [IX_CourseEnrollment_CourseEnrolmentStatusTypeID_ArchivedDate_CompletionDate]
    ON [V7].[CourseEnrollment]([CourseEnrolmentStatusTypeID] ASC, [ArchivedDate] ASC, [CompletionDate] ASC);

