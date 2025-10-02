CREATE TABLE [V7].[UserAreaLanguage] (
    [UserAreaLanguageID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]         INT NOT NULL,
    [LanguageTypeID]     INT NOT NULL,
    [IsDefault]          BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaLanguageID] ASC),
    CONSTRAINT [FK_UserAreaLanguage_LanguageType] FOREIGN KEY ([LanguageTypeID]) REFERENCES [V7].[LanguageType] ([LanguageTypeID]),
    CONSTRAINT [FK_UserAreaLanguage_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

