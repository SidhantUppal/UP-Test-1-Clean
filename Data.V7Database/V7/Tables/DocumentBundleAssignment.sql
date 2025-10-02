CREATE TABLE [V7].[DocumentBundleAssignment] (
    [BundleAssignmentID]     INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]             INT                NOT NULL,
    [BundleID]               INT                NOT NULL,
    [AssignedToUserID]       INT                NULL,
    [AssignedToEmployeeID]   INT                NULL,
    [AssignedToContractorID] INT                NULL,
    [AssignedToOrgGroupID]   INT                NULL,
    [AssignedToLocationID]   INT                NULL,
    [AssignmentType]         NVARCHAR (50)      NOT NULL,
    [RecipientName]          NVARCHAR (255)     NULL,
    [RecipientEmail]         NVARCHAR (255)     NULL,
    [Status]                 NVARCHAR (50)      DEFAULT ('Pending') NOT NULL,
    [TotalDocuments]         INT                DEFAULT ((0)) NOT NULL,
    [CompletedDocuments]     INT                DEFAULT ((0)) NOT NULL,
    [SignedDocuments]        INT                DEFAULT ((0)) NOT NULL,
    [AllowBulkSign]          BIT                DEFAULT ((1)) NOT NULL,
    [BulkSignStatus]         NVARCHAR (50)      NULL,
    [DueDate]                DATETIMEOFFSET (7) NULL,
    [StartedDate]            DATETIMEOFFSET (7) NULL,
    [CompletedDate]          DATETIMEOFFSET (7) NULL,
    [ExpiryDate]             DATETIMEOFFSET (7) NULL,
    [Notes]                  NVARCHAR (MAX)     NULL,
    [Metadata]               NVARCHAR (MAX)     NULL,
    [CreatedByUserID]        INT                NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]   INT                NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT                NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_DocumentBundleAssignment] PRIMARY KEY CLUSTERED ([BundleAssignmentID] ASC),
    CONSTRAINT [FK_DocumentBundleAssignment_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentBundleAssignment_AssignedToUser] FOREIGN KEY ([AssignedToUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentBundleAssignment_Bundle] FOREIGN KEY ([BundleID]) REFERENCES [V7].[DocumentBundle] ([BundleID]),
    CONSTRAINT [FK_DocumentBundleAssignment_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentBundleAssignment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentBundleAssignment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentBundleAssignment_AssignedToUserID]
    ON [V7].[DocumentBundleAssignment]([AssignedToUserID] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentBundleAssignment_BundleID]
    ON [V7].[DocumentBundleAssignment]([BundleID] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentBundleAssignment_DueDate]
    ON [V7].[DocumentBundleAssignment]([DueDate] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentBundleAssignment_Status]
    ON [V7].[DocumentBundleAssignment]([Status] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentBundleAssignment_UserAreaID]
    ON [V7].[DocumentBundleAssignment]([UserAreaID] ASC) WHERE ([ArchivedDate] IS NULL);

