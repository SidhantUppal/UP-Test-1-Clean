CREATE TABLE [V7].[UserAreaFormSectionQuestion] (
    [UserAreaFormSectionQuestionID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                    INT            NOT NULL,
    [UserAreaFormID]                INT            NOT NULL,
    [UserAreaFormSectionID]         INT            NOT NULL,
    [UserAreaFormQuestionID]        INT            NOT NULL,
    [ParentIDValues]                NVARCHAR (255) NULL,
    [TemplateVersion]               TINYINT        DEFAULT ((1)) NOT NULL,
    [OrderNum]                      TINYINT        DEFAULT ((0)) NOT NULL,
    [IsRequired]                    BIT            DEFAULT ((0)) NOT NULL,
    [IsHidden]                      BIT            DEFAULT ((0)) NOT NULL,
    [IsReadOnly]                    BIT            DEFAULT ((0)) NOT NULL,
    [DefaultValue]                  NVARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaFormSectionQuestionID] ASC),
    CONSTRAINT [FK_UserAreaFormSectionQuestion_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_UserAreaFormSectionQuestion_UserAreaForm] FOREIGN KEY ([UserAreaFormID]) REFERENCES [V7].[UserAreaForm] ([UserAreaFormID]),
    CONSTRAINT [FK_UserAreaFormSectionQuestion_UserAreaFormQuestion] FOREIGN KEY ([UserAreaFormQuestionID]) REFERENCES [V7].[UserAreaFormQuestion] ([UserAreaFormQuestionID]),
    CONSTRAINT [FK_UserAreaFormSectionQuestion_UserAreaFormSection] FOREIGN KEY ([UserAreaFormSectionID]) REFERENCES [V7].[UserAreaFormSection] ([UserAreaFormSectionID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaFormSectionQuestion_FormVersion]
    ON [V7].[UserAreaFormSectionQuestion]([UserAreaID] ASC, [UserAreaFormID] ASC, [TemplateVersion] ASC)
    INCLUDE([UserAreaFormSectionID], [UserAreaFormQuestionID], [ParentIDValues], [OrderNum], [IsRequired], [IsHidden], [DefaultValue]);

