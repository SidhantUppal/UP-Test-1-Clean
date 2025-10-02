CREATE TABLE [V7].[AccidentFormTypeQuestionType] (
    [AccidentFormTypeQuestionTypeID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                     INT            NULL,
    [AccidentFormTypeID]             INT            NOT NULL,
    [AccidentSectionTypeID]          INT            NOT NULL,
    [AccidentQuestionTypeID]         INT            NOT NULL,
    [ParentID]                       INT            NULL,
    [ParentValues]                   NVARCHAR (100) NULL,
    [ParentIDValues]                 NVARCHAR (255) NULL,
    [TemplateVersion]                TINYINT        CONSTRAINT [DF__AccidentF__Templ__184E2D62] DEFAULT ((1)) NOT NULL,
    [OrderNum]                       TINYINT        CONSTRAINT [DF__AccidentF__Order__1942519B] DEFAULT ((0)) NOT NULL,
    [IsRequired]                     BIT            CONSTRAINT [DF__AccidentF__IsReq__1A3675D4] DEFAULT ((0)) NOT NULL,
    [IsHidden]                       BIT            CONSTRAINT [DF__AccidentF__IsHid__1B2A9A0D] DEFAULT ((0)) NOT NULL,
    [IsReadOnly]                     BIT            CONSTRAINT [DF__AccidentF__IsRea__5C043931] DEFAULT ((0)) NOT NULL,
    [DefaultValue]                   NVARCHAR (100) NULL,
    CONSTRAINT [PK__Accident__32A8CA5D1DE4A454] PRIMARY KEY CLUSTERED ([AccidentFormTypeQuestionTypeID] ASC),
    CONSTRAINT [FK_AccidentFormTypeQuestionType_AccidentFormType] FOREIGN KEY ([AccidentFormTypeID]) REFERENCES [V7].[AccidentFormType] ([AccidentFormTypeID]),
    CONSTRAINT [FK_AccidentFormTypeQuestionType_AccidentQuestionType] FOREIGN KEY ([AccidentQuestionTypeID]) REFERENCES [V7].[AccidentQuestionType] ([AccidentQuestionTypeID]),
    CONSTRAINT [FK_AccidentFormTypeQuestionType_AccidentSectionType] FOREIGN KEY ([AccidentSectionTypeID]) REFERENCES [V7].[AccidentSectionType] ([AccidentSectionTypeID]),
    CONSTRAINT [FK_AccidentFormTypeQuestionType_Parent] FOREIGN KEY ([ParentID]) REFERENCES [V7].[AccidentFormTypeQuestionType] ([AccidentFormTypeQuestionTypeID]),
    CONSTRAINT [FK_AccidentFormTypeQuestionType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AccidentFormTypeQuestionType_UserAreaAccidentFormTypeVersion]
    ON [V7].[AccidentFormTypeQuestionType]([UserAreaID] ASC, [AccidentFormTypeID] ASC, [TemplateVersion] ASC)
    INCLUDE([AccidentSectionTypeID], [AccidentQuestionTypeID], [ParentID], [ParentValues], [OrderNum], [IsRequired], [IsHidden], [DefaultValue]);

