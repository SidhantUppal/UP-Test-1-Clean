CREATE TABLE [V7].[DangerousOccurrenceType] (
    [DangerousOccurrenceTypeID]         INT           NOT NULL,
    [UserAreaID]         INT           NULL,
    [DangerousOccurrenceCategoryTypeID] INT           NOT NULL,
    [Reference]                         NVARCHAR (20) NULL,
    [V5Reference]                       NVARCHAR (20) NULL,
    [IsHidden]                          BIT           DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([DangerousOccurrenceTypeID] ASC),
    CONSTRAINT [FK_DangerousOccurrenceType_DangerousOccurrenceCategoryType] FOREIGN KEY ([DangerousOccurrenceCategoryTypeID]) REFERENCES [V7].[DangerousOccurrenceCategoryType] ([DangerousOccurrenceCategoryTypeID])
,
    CONSTRAINT [FK_DangerousOccurrenceType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DangerousOccurrenceType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DangerousOccurrenceType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DangerousOccurrenceType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


