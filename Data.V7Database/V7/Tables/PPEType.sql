CREATE TABLE [V7].[PPEType] (
    [PPETypeID]        INT            NOT NULL,
    [UserAreaID]       INT            NULL,
    [Reference]        NVARCHAR (50)  NOT NULL,
    [SymbolIcon]       NVARCHAR (255) NOT NULL,
    [ControlMeasureID] INT            NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PPETypeID] ASC),
    CONSTRAINT [FK_PPEType_ControlMeasure] FOREIGN KEY ([ControlMeasureID]) REFERENCES [V7].[ControlMeasure] ([ControlMeasureID]),
    CONSTRAINT [FK_PPEType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
,
    CONSTRAINT [FK_PPEType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PPEType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PPEType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


