CREATE TABLE [V7].[PolicyUserAssignment] (
    [PolicyUserAssignmentID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]             INT                NOT NULL,
    [PolicyID]               INT                NOT NULL,
    [AssignedToUserID]       INT                NOT NULL,
    [AssignedByUserID]       INT                NOT NULL,
    [AssignmentDate]         DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [DueDate]                DATETIMEOFFSET (7) NULL,
    [Priority]               NVARCHAR (20)      DEFAULT ('Normal') NULL,
    [AssignmentReason]       NVARCHAR (500)     NULL,
    [SpecialInstructions]    NVARCHAR (MAX)     NULL,
    [Status]                 NVARCHAR (50)      DEFAULT ('Assigned') NULL,
    [CompletedDate]          DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]        INT                NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]   INT                NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT                NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PolicyUserAssignmentID] ASC),
    CONSTRAINT [FK_PolicyUserAssignment_AssignedBy] FOREIGN KEY ([AssignedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PolicyUserAssignment_AssignedTo] FOREIGN KEY ([AssignedToUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PolicyUserAssignment_Policy] FOREIGN KEY ([PolicyID]) REFERENCES [V7].[Policy] ([PolicyID]),
    CONSTRAINT [FK_PolicyUserAssignment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyUserAssignment_AssignedToUserID]
    ON [V7].[PolicyUserAssignment]([AssignedToUserID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyUserAssignment_DueDate]
    ON [V7].[PolicyUserAssignment]([DueDate] ASC);

