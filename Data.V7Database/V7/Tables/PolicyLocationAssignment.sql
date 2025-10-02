CREATE TABLE [V7].[PolicyLocationAssignment] (
    [PolicyLocationAssignmentID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                 INT                NOT NULL,
    [PolicyID]                   INT                NOT NULL,
    [LocationID]                 INT                NOT NULL,
    [AssignmentDate]             DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [EffectiveDate]              DATETIMEOFFSET (7) NULL,
    [LocationSpecificNotes]      NVARCHAR (MAX)     NULL,
    [LocalVariations]            NVARCHAR (MAX)     NULL,
    [CreatedByUserID]            INT                NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]       INT                NULL,
    [ModifiedDate]           DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]           INT                NULL,
    [ArchivedDate]               DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PolicyLocationAssignmentID] ASC),
    CONSTRAINT [FK_PolicyLocationAssignment_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_PolicyLocationAssignment_Policy] FOREIGN KEY ([PolicyID]) REFERENCES [V7].[Policy] ([PolicyID]),
    CONSTRAINT [FK_PolicyLocationAssignment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [UQ_PolicyLocationAssignment] UNIQUE NONCLUSTERED ([PolicyID] ASC, [LocationID] ASC, [ArchivedDate] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyLocationAssignment_LocationID]
    ON [V7].[PolicyLocationAssignment]([LocationID] ASC);

