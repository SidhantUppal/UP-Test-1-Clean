CREATE TABLE [V7].[RootCauseCategoryType] (
    [RootCauseCategoryTypeID] INT           IDENTITY (1, 1) NOT NULL,
    [Reference]               NVARCHAR (50) NULL,
    [UserAreaID]              INT           NOT NULL,
    [CreatedByUserID]         INT           NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]    INT           NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT           NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    [Title] NVARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([RootCauseCategoryTypeID] ASC),
    CONSTRAINT [FK_RootCauseCategoryType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RootCauseCategoryType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RootCauseCategoryType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RootCauseCategoryType_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

