CREATE TABLE [V7].[CourseEnrolment] (
    [CourseEnrolmentID]     INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]            INT                NOT NULL,
    [CourseID]              INT                NOT NULL,
    [UserID]                INT                NOT NULL,
    [EnrolmentDate]         DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [EnrolmentType]         NVARCHAR (50)      DEFAULT ('Manual') NULL,
    [EnrolmentStatusID]     INT                NOT NULL,
    [StartDate]             DATETIMEOFFSET (7) NULL,
    [LastAccessDate]        DATETIMEOFFSET (7) NULL,
    [CompletionDate]        DATETIMEOFFSET (7) NULL,
    [ExpiryDate]            DATETIMEOFFSET (7) NULL,
    [CurrentScore]          DECIMAL (5, 2)     NULL,
    [BestScore]             DECIMAL (5, 2)     NULL,
    [AttemptCount]          INT                DEFAULT ((0)) NULL,
    [TotalTimeMinutes]      INT                DEFAULT ((0)) NULL,
    [ProgressPercentage]    DECIMAL (5, 2)     DEFAULT ((0)) NULL,
    [CertificateNumber]     NVARCHAR (50)      NULL,
    [CertificateIssuedDate] DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]       INT                NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]      INT                NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT                NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CourseEnrolmentID] ASC),
    CONSTRAINT [FK_CourseEnrolment_Course] FOREIGN KEY ([CourseID]) REFERENCES [V7].[Course] ([CourseID]),
    CONSTRAINT [FK_CourseEnrolment_Status] FOREIGN KEY ([EnrolmentStatusID]) REFERENCES [V7].[CourseEnrolmentStatusType] ([CourseEnrolmentStatusTypeID]),
    CONSTRAINT [FK_CourseEnrolment_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CourseEnrolment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [UQ_CourseEnrolment_User] UNIQUE NONCLUSTERED ([CourseID] ASC, [UserID] ASC, [ArchivedDate] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_CourseEnrolment_CompletionDate]
    ON [V7].[CourseEnrolment]([CompletionDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_CourseEnrolment_CourseID]
    ON [V7].[CourseEnrolment]([CourseID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_CourseEnrolment_EnrolmentDate]
    ON [V7].[CourseEnrolment]([EnrolmentDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_CourseEnrolment_UserAreaID]
    ON [V7].[CourseEnrolment]([UserAreaID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_CourseEnrolment_UserID]
    ON [V7].[CourseEnrolment]([UserID] ASC);

