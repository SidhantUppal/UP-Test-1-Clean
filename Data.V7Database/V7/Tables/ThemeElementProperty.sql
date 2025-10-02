CREATE TABLE [V7].[ThemeElementProperty] (
    [ThemeElementPropertyID] INT            IDENTITY (1, 1) NOT NULL,
    [ThemeElementID]         INT            NOT NULL,
    [DisplayName]            NVARCHAR (255) NOT NULL,
    [CssProperty]            NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([ThemeElementPropertyID] ASC),
    CONSTRAINT [FK_ThemeElementProperty_ThemeElement] FOREIGN KEY ([ThemeElementID]) REFERENCES [V7].[ThemeElement] ([ThemeElementID])
);

