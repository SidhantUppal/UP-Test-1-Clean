CREATE TABLE [V7].[DocumentAssignment] (
    [AssignmentID]           INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]             INT                NOT NULL,
    [DocumentID]             INT                NOT NULL,
    [AssignedToUserID]       INT                NULL,
    [AssignedToEmployeeID]   INT                NULL,
    [AssignedToContractorID] INT                NULL,
    [AssignedToOrgGroupID]   INT                NULL,
    [AssignedToLocationID]   INT                NULL,
    [AssignedToRoleID]       INT                NULL,
    [AssignmentType]         NVARCHAR (50)      NOT NULL,
    [BundleAssignmentID]     INT                NULL,
    [Status]                 NVARCHAR (50)      DEFAULT ('Pending') NOT NULL,
    [Priority]               NVARCHAR (20)      DEFAULT ('Normal') NOT NULL,
    [DueDate]                DATETIMEOFFSET (7) NULL,
    [ViewedDate]             DATETIMEOFFSET (7) NULL,
    [CompletedDate]          DATETIMEOFFSET (7) NULL,
    [RequiresSignature]      BIT                DEFAULT ((0)) NOT NULL,
    [SignatureType]          NVARCHAR (50)      NULL,
    [SignatureStatus]        NVARCHAR (50)      NULL,
    [SignedDate]             DATETIMEOFFSET (7) NULL,
    [ReminderEnabled]        BIT                DEFAULT ((1)) NOT NULL,
    [ReminderFrequencyDays]  INT                DEFAULT ((7)) NULL,
    [LastReminderDate]       DATETIMEOFFSET (7) NULL,
    [ReminderCount]          INT                DEFAULT ((0)) NOT NULL,
    [Notes]                  NVARCHAR (MAX)     NULL,
    [CompletionNotes]        NVARCHAR (MAX)     NULL,
    [Metadata]               NVARCHAR (MAX)     NULL,
    [CreatedByUserID]        INT                NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]   INT                NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT                NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_DocumentAssignment] PRIMARY KEY CLUSTERED ([AssignmentID] ASC),
    CONSTRAINT [FK_DocumentAssignment_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentAssignment_AssignedToUser] FOREIGN KEY ([AssignedToUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentAssignment_BundleAssignment] FOREIGN KEY ([BundleAssignmentID]) REFERENCES [V7].[DocumentBundleAssignment] ([BundleAssignmentID]),
    CONSTRAINT [FK_DocumentAssignment_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentAssignment_Document] FOREIGN KEY ([DocumentID]) REFERENCES [V7].[Document] ([DocumentID]),
    CONSTRAINT [FK_DocumentAssignment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentAssignment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentAssignment_AssignedToUserID]
    ON [V7].[DocumentAssignment]([AssignedToUserID] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentAssignment_BundleAssignmentID]
    ON [V7].[DocumentAssignment]([BundleAssignmentID] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentAssignment_DocumentID]
    ON [V7].[DocumentAssignment]([DocumentID] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentAssignment_DueDate]
    ON [V7].[DocumentAssignment]([DueDate] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentAssignment_Status]
    ON [V7].[DocumentAssignment]([Status] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentAssignment_UserAreaID]
    ON [V7].[DocumentAssignment]([UserAreaID] ASC) WHERE ([ArchivedDate] IS NULL);

