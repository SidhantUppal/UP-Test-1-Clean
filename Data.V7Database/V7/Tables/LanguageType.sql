CREATE TABLE [V7].[LanguageType] (
    [LanguageTypeID]      INT            NOT NULL,
    [UserAreaID]          INT            NULL,
    [Title]               NVARCHAR (50)  NOT NULL,
    [Description]         NVARCHAR (MAX) NULL,
    [Code]                NVARCHAR (10)  NOT NULL,
    [DefaultRegionTypeID] INT            NOT NULL,
    PRIMARY KEY CLUSTERED ([LanguageTypeID] ASC),
    CONSTRAINT [FK_LanguageType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

