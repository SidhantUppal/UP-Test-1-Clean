CREATE TABLE [V7].[HelpText] (
    [HelpTextID]           INT      IDENTITY (1, 1) NOT NULL,
    [ModuleTypeID]         INT      NOT NULL,
    [UserAreaID]           INT      NULL,
    [ThemeID]              INT      NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT      NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [Title] VARCHAR (100) NULL,
    [Content] NVARCHAR (MAX) NULL,
    [Keywords] NVARCHAR (255) NULL,
    CONSTRAINT [PK__HelpText__0FA749C0DB96EE6B] PRIMARY KEY CLUSTERED ([HelpTextID] ASC),
    CONSTRAINT [FK_HelpText_ModuleTypeID] FOREIGN KEY ([ModuleTypeID]) REFERENCES [V7].[ModuleType] ([ModuleTypeID]),
    CONSTRAINT [FK_HelpText_ThemeID] FOREIGN KEY ([ThemeID]) REFERENCES [V7].[Theme] ([ThemeID])
);

