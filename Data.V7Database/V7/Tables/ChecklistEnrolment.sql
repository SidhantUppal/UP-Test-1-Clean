CREATE TABLE [V7].[ChecklistEnrolment] (
    [ChecklistEnrolmentID]  INT            IDENTITY (1, 1) NOT NULL,
    [ChecklistAssignmentID] INT            NOT NULL,
    [IsLiveDate]            DATETIMEOFFSET (7) NULL,
    [StartDate]             DATETIMEOFFSET (7) NULL,
    [CompletionDate]        DATETIMEOFFSET (7) NULL,
    [Result]                BIT            NULL,
    [Note]                  NVARCHAR (MAX) NULL,
    [CreatedByUserID]       INT            NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]  INT            NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT            NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    [UserAreaID]            INT            NULL,
    [IsLocked]              BIT            DEFAULT ((0)) NOT NULL,
    [IsCompliant]           BIT            DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK__Checklis__4A92BA4C179D6BFC] PRIMARY KEY CLUSTERED ([ChecklistEnrolmentID] ASC),
    CONSTRAINT [FK_ChecklistEnrollment_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ChecklistEnrollment_ChecklistAssignmentID] FOREIGN KEY ([ChecklistAssignmentID]) REFERENCES [V7].[ChecklistAssignment] ([ChecklistAssignmentID]),
    CONSTRAINT [FK_ChecklistEnrollment_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ChecklistEnrollment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ChecklistEnrolment_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ChecklistEnrolment_ArchivedDate]
    ON [V7].[ChecklistEnrolment]([ArchivedDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_ChecklistEnrolment_ChecklistAssignmentID_CompletedDate_ArchivedDate]
    ON [V7].[ChecklistEnrolment]([ChecklistAssignmentID] ASC, [CompletionDate] ASC, [ArchivedDate] ASC);

