CREATE TABLE [V7].[HRCategory] (
    [HRCategoryID]         INT           IDENTITY (1, 1) NOT NULL,
    [HRTypeID]             INT           NULL,
    [EventType]            SMALLINT      NULL,
    [OrderNum]             INT           CONSTRAINT [DF__HRCategor__Order__1C899DF1] DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (255) NULL,
    [Reference]            NVARCHAR (50) NULL,
    [UserAreaID]           INT           NULL,
    [CreatedByUserID]      INT           NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT           NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT           NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__HRCatego__78F6248FCE51B96E] PRIMARY KEY CLUSTERED ([HRCategoryID] ASC),
    CONSTRAINT [FK_HRCategory_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCategory_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCategory_HRType] FOREIGN KEY ([HRTypeID]) REFERENCES [V7].[HRType] ([HRTypeID]),
    CONSTRAINT [FK_HRCategory_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCategory_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

