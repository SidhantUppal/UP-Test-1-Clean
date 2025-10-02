CREATE TABLE [V7].[MainActivityType] (
    [MainActivityTypeID] INT           NOT NULL,
    [UserAreaID]         INT           NULL,
    [MainIndustryTypeID] INT           NOT NULL,
    [Reference]          NVARCHAR (50) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([MainActivityTypeID] ASC),
    CONSTRAINT [FK_MainActivityType_MainIndustryTypeID] FOREIGN KEY ([MainIndustryTypeID]) REFERENCES [V7].[MainIndustryType] ([MainIndustryTypeID])
,
    CONSTRAINT [FK_MainActivityType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_MainActivityType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_MainActivityType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_MainActivityType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


