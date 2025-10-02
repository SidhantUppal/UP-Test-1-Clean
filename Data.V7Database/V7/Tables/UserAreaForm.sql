CREATE TABLE [V7].[UserAreaForm] (
    [UserAreaFormID]         INT                IDENTITY (1, 1) NOT NULL,
    [OriginalUserAreaFormID] INT                NULL,
    [Version]                TINYINT            NOT NULL,
    [Status]                 NVARCHAR (20)      NOT NULL,
    [UserAreaID]             INT                NULL,
    [Reference]              NVARCHAR (50)      NULL,
    [Title]                  NVARCHAR (255)     NOT NULL,
    [Description]            NVARCHAR (MAX)     NULL,
    [IsEnabledForWeb]        BIT                DEFAULT ((1)) NOT NULL,
    [IsEnabledForApp]        BIT                DEFAULT ((1)) NOT NULL,
    [CreatedByUserID]        INT                NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]   INT                NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT                NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaFormID] ASC),
    CONSTRAINT [FK_UserAreaForm_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaForm_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaForm_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaForm_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

