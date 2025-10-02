CREATE TABLE [V7].[UserAreaTextSettings] (
    [UserAreaTextSettingsID] INT          IDENTITY (1, 1) NOT NULL,
    [UserAreaID]             INT          NOT NULL,
    [HeadingTextColour]      VARCHAR (7)  NULL,
    [NormalTextColour]       VARCHAR (7)  NULL,
    [HeadingTextFontName]    VARCHAR (50) NULL,
    [NormalTextFontName]     VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaTextSettingsID] ASC),
    CONSTRAINT [FK_UserAreaTextSettings_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [CK_UserAreaTextSettings_UserArea] UNIQUE NONCLUSTERED ([UserAreaID] ASC)
);

