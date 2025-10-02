CREATE TABLE [V7].[SafeSystemOfWorkTemplateSection] (
    [SafeSystemOfWorkTemplateSectionID] INT IDENTITY (1, 1) NOT NULL,
    [SafeSystemOfWorkTemplateID]        INT NOT NULL,
    [TextBlockSectionID]                INT NOT NULL,
    PRIMARY KEY CLUSTERED ([SafeSystemOfWorkTemplateSectionID] ASC),
    CONSTRAINT [FK_SafeSystemOfWorkTemplateSection_SafeSystemOfWorkTemplate] FOREIGN KEY ([SafeSystemOfWorkTemplateID]) REFERENCES [V7].[SafeSystemOfWorkTemplate] ([SafeSystemOfWorkTemplateID]),
    CONSTRAINT [FK_SafeSystemOfWorkTemplateSection_TextBlockSection] FOREIGN KEY ([TextBlockSectionID]) REFERENCES [V7].[TextBlockSection] ([TextBlockSectionID])
);

