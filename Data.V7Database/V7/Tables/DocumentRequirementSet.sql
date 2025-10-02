CREATE TABLE [V7].[DocumentRequirementSet] (
    [RequirementSetID]     INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [SetName]              NVARCHAR (255)     NOT NULL,
    [Description]          NVARCHAR (MAX)     NULL,
    [Category]             NVARCHAR (100)     NULL,
    [ProcessType]          NVARCHAR (100)     NULL,
    [IsActive]             BIT                DEFAULT ((1)) NOT NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_DocumentRequirementSet] PRIMARY KEY CLUSTERED ([RequirementSetID] ASC),
    CONSTRAINT [FK_DocumentRequirementSet_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentRequirementSet_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentRequirementSet_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentRequirementSet_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentRequirementSet_ProcessType]
    ON [V7].[DocumentRequirementSet]([ProcessType] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentRequirementSet_UserAreaID]
    ON [V7].[DocumentRequirementSet]([UserAreaID] ASC) WHERE ([ArchivedDate] IS NULL);

