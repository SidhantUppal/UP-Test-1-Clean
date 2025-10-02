CREATE TABLE [V7].[HelpGuide] (
    [HelpGuideID]  INT            NOT NULL,
    [ModuleTypeID] INT            NOT NULL,
    [Title]        NVARCHAR (150) NOT NULL,
    [SourceURL]    NVARCHAR (255) NOT NULL,
    [CreatedDate]  DATETIMEOFFSET (7) NOT NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HelpGuideID] ASC),
    CONSTRAINT [FK_HelpGuide_ModuleTypeID] FOREIGN KEY ([ModuleTypeID]) REFERENCES [V7].[ModuleType] ([ModuleTypeID])
);

