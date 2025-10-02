CREATE TABLE [V7].[ThemeElement] (
    [ThemeElementID] INT            IDENTITY (1, 1) NOT NULL,
    [DisplayName]    NVARCHAR (255) NOT NULL,
    [CssElement]     NVARCHAR (MAX) NOT NULL,
    PRIMARY KEY CLUSTERED ([ThemeElementID] ASC)
);

