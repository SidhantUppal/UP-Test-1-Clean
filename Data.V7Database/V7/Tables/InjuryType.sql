CREATE TABLE [V7].[InjuryType] (
    [InjuryTypeID]         INT           IDENTITY (1, 1) NOT NULL,
    [Reference]            NVARCHAR (50) NOT NULL,
    [IsRIDDORReportable]   BIT           CONSTRAINT [DF__InjuryTyp__IsRID__7ABDCA7B] DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [UserAreaID]           INT           NULL,
    [CreatedByUserID]      INT           NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NULL,
    [ModifiedByUserID] INT           NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT           NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [OrderNum]             INT           NULL,
    [RIDDORValue]          INT           NULL,
    CONSTRAINT [PK__InjuryTy__0B735E779F18E97D] PRIMARY KEY CLUSTERED ([InjuryTypeID] ASC),
    CONSTRAINT [FK_InjuryType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_InjuryType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_InjuryType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_InjuryType_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

