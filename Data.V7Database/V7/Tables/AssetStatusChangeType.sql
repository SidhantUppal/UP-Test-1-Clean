CREATE TABLE [V7].[AssetStatusChangeType] (
    [AssetStatusChangeTypeID] INT           NOT NULL,
    [UserAreaID]         INT           NULL,
    [Reference]               NVARCHAR (20) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AssetStatusChangeTypeID] ASC)
,
    CONSTRAINT [FK_AssetStatusChangeType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AssetStatusChangeType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AssetStatusChangeType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AssetStatusChangeType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


