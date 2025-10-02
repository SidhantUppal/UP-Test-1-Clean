CREATE TABLE [V7].[HRTemplate] (
    [HRTemplateID]         INT            IDENTITY (1, 1) NOT NULL,
    [HRTypeID]             INT            NOT NULL,
    [DisplayName]          NVARCHAR (100) NOT NULL,
    [UserAreaID]           INT            NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HRTemplateID] ASC),
    CONSTRAINT [FK_HRTemplate_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRTemplate_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRTemplate_HRType] FOREIGN KEY ([HRTypeID]) REFERENCES [V7].[HRType] ([HRTypeID]),
    CONSTRAINT [FK_HRTemplate_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRTemplate_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

