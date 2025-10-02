CREATE TABLE [V7].[PolicyTagAssignment] (
    [PolicyTagAssignmentID] INT                IDENTITY (1, 1) NOT NULL,
    [PolicyID]              INT                NOT NULL,
    [PolicyTagID]           INT                NOT NULL,
    [CreatedByUserID]       INT                NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([PolicyTagAssignmentID] ASC),
    CONSTRAINT [FK_PolicyTagAssignment_Policy] FOREIGN KEY ([PolicyID]) REFERENCES [V7].[Policy] ([PolicyID]),
    CONSTRAINT [FK_PolicyTagAssignment_Tag] FOREIGN KEY ([PolicyTagID]) REFERENCES [V7].[PolicyTag] ([PolicyTagID]),
    CONSTRAINT [UQ_PolicyTagAssignment] UNIQUE NONCLUSTERED ([PolicyID] ASC, [PolicyTagID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyTagAssignment_PolicyID]
    ON [V7].[PolicyTagAssignment]([PolicyID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyTagAssignment_TagID]
    ON [V7].[PolicyTagAssignment]([PolicyTagID] ASC);

