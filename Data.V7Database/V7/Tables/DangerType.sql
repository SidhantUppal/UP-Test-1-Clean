CREATE TABLE [V7].[DangerType] (
    [DangerTypeID]         INT            NOT NULL,
    [UserAreaID]           INT            NULL,
    [OriginalDangerTypeID] INT            NULL,
    [Reference]            NVARCHAR (50)  NOT NULL,
    [SymbolIcon]           NVARCHAR (255) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [CreatedByUserID]          INT            NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]         INT            NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT            NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__DangerTy__E819F8B028EC5547] PRIMARY KEY CLUSTERED ([DangerTypeID] ASC),
    CONSTRAINT [FK_DangerType_DangerType] FOREIGN KEY ([OriginalDangerTypeID]) REFERENCES [V7].[DangerType] ([DangerTypeID]),
    CONSTRAINT [FK_DangerType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_DangerType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DangerType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DangerType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


