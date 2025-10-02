CREATE TABLE [V7].[ThemeElementPropertyValue] (
    [ThemeElementPropertyValueID] INT            IDENTITY (1, 1) NOT NULL,
    [ThemeElementPropertyID]      INT            NOT NULL,
    [ThemeID]                     INT            NOT NULL,
    [PropertyValue]               NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([ThemeElementPropertyValueID] ASC),
    CONSTRAINT [FK_ThemeElementPropertyValue_Theme] FOREIGN KEY ([ThemeID]) REFERENCES [V7].[Theme] ([ThemeID]),
    CONSTRAINT [FK_ThemeElementPropertyValue_ThemeElementProperty] FOREIGN KEY ([ThemeElementPropertyID]) REFERENCES [V7].[ThemeElementProperty] ([ThemeElementPropertyID])
);

