CREATE TABLE [V7].[ChecklistTemplateEnrolment] (
    [ChecklistTemplateEnrolmentID]   INT                IDENTITY (1, 1) NOT NULL,
    [ChecklistTemplateAssignmentID]  INT                NOT NULL,
    [OriginalUserAreaFormResponseID] INT                NOT NULL,
    [TaskID]                         INT                NULL,
    [CreatedByUserID]                INT                NOT NULL,
    [CreatedDate]                    DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]               INT                NULL,
    [ModifiedDate]               DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]               INT                NULL,
    [ArchivedDate]                   DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ChecklistTemplateEnrolmentID] ASC),
    CONSTRAINT [FK_ChecklistTemplateEnrolment_ChecklistTemplateAssignment] FOREIGN KEY ([ChecklistTemplateAssignmentID]) REFERENCES [V7].[ChecklistTemplateAssignment] ([ChecklistTemplateAssignmentID]),
    CONSTRAINT [FK_ChecklistTemplateEnrolment_OriginalUserAreaFormResponse] FOREIGN KEY ([OriginalUserAreaFormResponseID]) REFERENCES [V7].[UserAreaFormResponse] ([UserAreaFormResponseID]),
    CONSTRAINT [FK_ChecklistTemplateEnrolment_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID])
);

