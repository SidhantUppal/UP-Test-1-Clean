CREATE TABLE [V7].[ThemeType] (
    [ThemeTypeID]               INT            NOT NULL,
    [Title]                     NVARCHAR (255) NOT NULL,
    [Description]               NVARCHAR (MAX) NULL,
    [CustomCultureRegionString] NVARCHAR (255) NULL,
    [CssFolderRelativePath]     NVARCHAR (MAX) NULL,
    [ImagesFolderRelativePath]  NVARCHAR (MAX) NULL,
    [IsLive]                    BIT            DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([ThemeTypeID] ASC)
);

