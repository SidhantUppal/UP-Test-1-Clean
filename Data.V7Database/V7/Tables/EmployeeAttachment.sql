CREATE TABLE [V7].[EmployeeAttachment] (
    [EmployeeAttachmentID]   INT IDENTITY (1, 1) NOT NULL,
    [AttachmentID]           INT NOT NULL,
    [EmployeeID]             INT NOT NULL,
    [CourseID]               INT NULL,
    [EmployeeFolderID]       INT NULL,
    [HRCaseAttachmentTypeID] INT NULL,
    CONSTRAINT [PK__Employee__CF5FA5DA85F48A92] PRIMARY KEY CLUSTERED ([EmployeeAttachmentID] ASC),
    CONSTRAINT [FK_EmployeeAttachment_Attachment (AttachmentID)] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_EmployeeAttachment_Course] FOREIGN KEY ([CourseID]) REFERENCES [V7].[Course] ([CourseID]),
    CONSTRAINT [FK_EmployeeAttachment_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EmployeeAttachment_EmployeeFolder] FOREIGN KEY ([EmployeeFolderID]) REFERENCES [V7].[EmployeeFolder] ([EmployeeFolderID]),
    CONSTRAINT [FK_EmployeeAttachment_HRCaseAttachmentType] FOREIGN KEY ([HRCaseAttachmentTypeID]) REFERENCES [V7].[HRCaseAttachmentType] ([HRCaseAttachmentTypeID])
);

