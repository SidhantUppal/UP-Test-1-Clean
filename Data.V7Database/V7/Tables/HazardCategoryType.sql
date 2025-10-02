CREATE TABLE [V7].[HazardCategoryType] (
    [HazardCategoryTypeID]    INT                IDENTITY (1, 1) NOT NULL,
    [ParentCategoryID]        INT                NULL,
    [UserAreaID]              INT                NULL,
    [Title]                   NVARCHAR (100)     NOT NULL,
    [Description]             NVARCHAR (500)     NULL,
    [IsActive]                BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]         INT                DEFAULT (1) NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) DEFAULT (SYSDATETIMEOFFSET()) NOT NULL,
    [ModifiedByUserID]        INT                NULL,
    [ModifiedDate]            DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT                NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HazardCategoryTypeID] ASC),
    CONSTRAINT [FK_HazardCategoryType_Parent] FOREIGN KEY ([ParentCategoryID]) REFERENCES [V7].[HazardCategoryType] ([HazardCategoryTypeID]),
    CONSTRAINT [FK_HazardCategoryType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HazardCategoryType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HazardCategoryType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HazardCategoryType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


