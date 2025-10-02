CREATE TABLE [V7].[MobileProperty] (
    [MobilePropertyID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]       INT            NULL,
    [UserID]           INT            NULL,
    [Key]              NVARCHAR (256) NOT NULL,
    [Value]            NVARCHAR (256) NOT NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([MobilePropertyID] ASC),
    CONSTRAINT [FK_MobileProperty_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_MobileProperty_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_MobileProperty_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_MobileProperty_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_MobileProperty_UserID] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);

