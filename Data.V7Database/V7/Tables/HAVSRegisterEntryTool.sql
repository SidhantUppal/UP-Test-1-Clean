CREATE TABLE [V7].[HAVSRegisterEntryTool] (
    [HAVSRegisterEntryToolID] INT            IDENTITY (1, 1) NOT NULL,
    [HAVSRegisterEntryID]     INT            NOT NULL,
    [HAVSToolID]              INT            NOT NULL,
    [UsageHours]              INT            DEFAULT ((0)) NOT NULL,
    [UsageMinutes]            INT            DEFAULT ((0)) NOT NULL,
    [IsNotApplicable]         BIT            DEFAULT ((0)) NOT NULL,
    [ArchivedReason]          NVARCHAR (255) NULL,
    [CreatedByUserID]         INT            NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]    INT            NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT            NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HAVSRegisterEntryToolID] ASC),
    CONSTRAINT [FK_HAVSRegisterEntryTool_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HAVSRegisterEntryTool_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HAVSRegisterEntryTool_HAVSRegisterEntry] FOREIGN KEY ([HAVSRegisterEntryID]) REFERENCES [V7].[HAVSRegisterEntry] ([HAVSRegisterEntryID]),
    CONSTRAINT [FK_HAVSRegisterEntryTool_HAVSTool] FOREIGN KEY ([HAVSToolID]) REFERENCES [V7].[HAVSTool] ([HAVSToolID]),
    CONSTRAINT [FK_HAVSRegisterEntryTool_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_HAVSRegisterEntryTool_Entry]
    ON [V7].[HAVSRegisterEntryTool]([HAVSRegisterEntryID] ASC)
    INCLUDE([HAVSRegisterEntryToolID], [HAVSToolID], [UsageHours], [UsageMinutes], [IsNotApplicable]);

