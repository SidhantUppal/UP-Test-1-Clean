CREATE TABLE [V7].[TextBlockApprovalLog] (
    [TextBlockApprovalLogID] INT            IDENTITY (1, 1) NOT NULL,
    [TextBlockID]            INT            NOT NULL,
    [UserAreaID]             INT            NOT NULL,
    [IsApproved]             BIT            NULL,
    [Comments]               NVARCHAR (MAX) NULL,
    [CreatedByUserID]        INT            NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]   INT            NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT            NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TextBlockApprovalLogID] ASC),
    CONSTRAINT [FK_TextBlockApprovalLog_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TextBlockApprovalLog_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TextBlockApprovalLog_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TextBlockApprovalLog_TextBlock] FOREIGN KEY ([TextBlockID]) REFERENCES [V7].[TextBlock] ([TextBlockID]),
    CONSTRAINT [FK_TextBlockApprovalLog_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TextBlockApprovalLog_ApprovalComments]
    ON [V7].[TextBlockApprovalLog]([TextBlockID] ASC, [UserAreaID] ASC)
    INCLUDE([IsApproved], [Comments], [CreatedDate]);

