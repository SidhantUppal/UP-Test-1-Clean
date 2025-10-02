CREATE TABLE [V7].[UserAreaFormType] (
    [UserAreaFormTypeID] INT            NOT NULL,
    [UserAreaID]         INT           NULL,
    [Name]               NVARCHAR (100) NOT NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaFormTypeID] ASC)
,
    CONSTRAINT [FK_UserAreaFormType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaFormType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaFormType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaFormType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


