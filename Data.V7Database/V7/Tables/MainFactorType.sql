CREATE TABLE [V7].[MainFactorType] (
    [MainFactorTypeID] INT           NOT NULL,
    [UserAreaID]         INT           NULL,
    [Reference]        NVARCHAR (50) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([MainFactorTypeID] ASC)
,
    CONSTRAINT [FK_MainFactorType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_MainFactorType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_MainFactorType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_MainFactorType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


