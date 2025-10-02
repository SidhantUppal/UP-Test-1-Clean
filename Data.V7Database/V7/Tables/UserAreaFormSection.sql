CREATE TABLE [V7].[UserAreaFormSection] (
    [UserAreaFormSectionID]         INT                IDENTITY (1, 1) NOT NULL,
    [OriginalUserAreaFormSectionID] INT                NULL,
    [UserAreaFormID]                INT                NOT NULL,
    [Reference]                     NVARCHAR (50)      NULL,
    [Title]                         NVARCHAR (255)     NOT NULL,
    [HelpText]                      NVARCHAR (1000)    NULL,
    [OrderNum]                      TINYINT            DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]               INT                NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]          INT                NULL,
    [ModifiedDate]              DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT                NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaFormSectionID] ASC),
    CONSTRAINT [FK_UserAreaFormSection_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaFormSection_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaFormSection_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaFormSection_UserAreaForm] FOREIGN KEY ([UserAreaFormID]) REFERENCES [V7].[UserAreaForm] ([UserAreaFormID])
);

