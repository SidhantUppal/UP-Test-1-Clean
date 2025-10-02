CREATE TABLE [V7].[PolicyOrgGroupAssignment] (
    [PolicyOrgGroupAssignmentID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                 INT                NOT NULL,
    [PolicyID]                   INT                NOT NULL,
    [OrgGroupID]                 INT                NOT NULL,
    [AssignmentDate]             DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [EffectiveDate]              DATETIMEOFFSET (7) NULL,
    [DueDate]                    DATETIMEOFFSET (7) NULL,
    [IsMandatory]                BIT                DEFAULT ((1)) NULL,
    [AssignmentNotes]            NVARCHAR (MAX)     NULL,
    [SpecialInstructions]        NVARCHAR (MAX)     NULL,
    [CreatedByUserID]            INT                NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]       INT                NULL,
    [ModifiedDate]           DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]           INT                NULL,
    [ArchivedDate]               DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PolicyOrgGroupAssignmentID] ASC),
    CONSTRAINT [FK_PolicyOrgGroupAssignment_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_PolicyOrgGroupAssignment_Policy] FOREIGN KEY ([PolicyID]) REFERENCES [V7].[Policy] ([PolicyID]),
    CONSTRAINT [FK_PolicyOrgGroupAssignment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [UQ_PolicyOrgGroupAssignment] UNIQUE NONCLUSTERED ([PolicyID] ASC, [OrgGroupID] ASC, [ArchivedDate] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyOrgGroupAssignment_OrgGroupID]
    ON [V7].[PolicyOrgGroupAssignment]([OrgGroupID] ASC);

