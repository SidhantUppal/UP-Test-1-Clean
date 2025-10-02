CREATE TABLE [V7].[TribunalCaseType] (
    [TribunalCaseTypeID] INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]         INT           NULL,
    [Reference]          NVARCHAR (50) NULL,
    [IsOnActiveList]     BIT           DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (255) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TribunalCaseTypeID] ASC)
,
    CONSTRAINT [FK_TribunalCaseType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


