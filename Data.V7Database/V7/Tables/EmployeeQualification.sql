CREATE TABLE [V7].[EmployeeQualification] (
    [EmployeeQualificationID] INT            IDENTITY (1, 1) NOT NULL,
    [EmployeeID]              INT            NOT NULL,
    [Title]                   NVARCHAR (255) NOT NULL,
    [StudyLocation]           NVARCHAR (255) NULL,
    [StartDate]               DATETIMEOFFSET (7) NULL,
    [CompletionDate]          DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]         INT            NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]    INT            NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT            NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    [AttachmentID]            INT            NULL,
    PRIMARY KEY CLUSTERED ([EmployeeQualificationID] ASC),
    CONSTRAINT [FK_EmployeeQualification_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeQualification_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_EmployeeQualification_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeQualification_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EmployeeQualification_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

