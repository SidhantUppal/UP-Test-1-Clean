CREATE TABLE [V7].[AlertType] (
    [AlertTypeID]         INT           NOT NULL,
    [UserAreaID]          INT           NULL,
    [Reference]           NVARCHAR (50) NOT NULL,
    [IsForActionPlanOnly] BIT           DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [CreatedByUserID]               INT           DEFAULT (1) NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) DEFAULT (SYSDATETIMEOFFSET()) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AlertTypeID] ASC),
    CONSTRAINT [FK_AlertType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AlertType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AlertType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AlertType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

