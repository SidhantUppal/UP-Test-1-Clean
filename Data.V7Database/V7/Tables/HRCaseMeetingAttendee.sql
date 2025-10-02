CREATE TABLE [V7].[HRCaseMeetingAttendee] (
    [HRCaseMeetingAttendeeID] INT            IDENTITY (1, 1) NOT NULL,
    [HRCaseMeetingID]         INT            NOT NULL,
    [AttendeeType]            SMALLINT       NULL,
    [EmployeeID]              INT            NULL,
    [AttendeeName]            NVARCHAR (100) NULL,
    [AttendeeEmail]           NVARCHAR (255) NULL,
    [InvitationSentDate]      DATETIMEOFFSET (7) NULL,
    [HasAttended]             BIT            DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]         INT            NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]    INT            NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT            NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HRCaseMeetingAttendeeID] ASC),
    CONSTRAINT [FK_HRCaseMeetingAttendee_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseMeetingAttendee_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseMeetingAttendee_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_HRCaseMeetingAttendee_HRCaseMeeting] FOREIGN KEY ([HRCaseMeetingID]) REFERENCES [V7].[HRCaseMeeting] ([HRCaseMeetingID]),
    CONSTRAINT [FK_HRCaseMeetingAttendee_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

