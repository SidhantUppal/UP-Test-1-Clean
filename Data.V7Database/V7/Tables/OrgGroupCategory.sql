CREATE TABLE [V7].[OrgGroupCategory] (
    [OrgGroupCategoryID]   INT           IDENTITY (1, 1) NOT NULL,
    [Reference]            NVARCHAR (50) NULL,
    [UserAreaID]           INT           NULL,
    [CreatedByUserID]      INT           NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT           NULL,
    [ArchivedByUserID]     INT           NULL,
    [Title] NVARCHAR (255) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([OrgGroupCategoryID] ASC),
    CONSTRAINT [FK_OrgGroupCategory_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_OrgGroupCategory_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_OrgGroupCategory_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_OrgGroupCategory_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

