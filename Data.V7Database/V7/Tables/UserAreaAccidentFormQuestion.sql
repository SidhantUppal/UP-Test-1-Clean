CREATE TABLE [V7].[UserAreaAccidentFormQuestion] (
    [UserAreaAccidentFormQuestionID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                     INT            NOT NULL,
    [UserAreaAccidentFormID]         INT            NOT NULL,
    [UserAreaAccidentSectionID]      INT            NOT NULL,
    [UserAreaAccidentQuestionID]     INT            NOT NULL,
    [ParentIDValues]                 NVARCHAR (255) NULL,
    [TemplateVersion]                TINYINT        CONSTRAINT [DF__UserAreaA__Templ__73B1A590] DEFAULT ((1)) NOT NULL,
    [OrderNum]                       TINYINT        CONSTRAINT [DF__UserAreaA__Order__74A5C9C9] DEFAULT ((0)) NOT NULL,
    [IsRequired]                     BIT            CONSTRAINT [DF__UserAreaA__IsReq__7599EE02] DEFAULT ((0)) NOT NULL,
    [IsHidden]                       BIT            CONSTRAINT [DF__UserAreaA__IsHid__768E123B] DEFAULT ((0)) NOT NULL,
    [IsReadOnly]                     BIT            CONSTRAINT [DF__UserAreaA__IsRea__77823674] DEFAULT ((0)) NOT NULL,
    [DefaultValue]                   NVARCHAR (100) NULL,
    [oldid]                          INT            NULL,
    CONSTRAINT [PK__UserArea__57B7FBE375DA6F57] PRIMARY KEY CLUSTERED ([UserAreaAccidentFormQuestionID] ASC),
    CONSTRAINT [FK_UserAreaAccidentFormQuestion_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_UserAreaAccidentFormQuestion_UserAreaAccidentForm] FOREIGN KEY ([UserAreaAccidentFormID]) REFERENCES [V7].[UserAreaAccidentForm] ([UserAreaAccidentFormID]),
    CONSTRAINT [FK_UserAreaAccidentFormQuestion_UserAreaAccidentQuestion] FOREIGN KEY ([UserAreaAccidentQuestionID]) REFERENCES [V7].[UserAreaAccidentQuestion] ([UserAreaAccidentQuestionID]),
    CONSTRAINT [FK_UserAreaAccidentFormQuestion_UserAreaAccidentSection] FOREIGN KEY ([UserAreaAccidentSectionID]) REFERENCES [V7].[UserAreaAccidentSection] ([UserAreaAccidentSectionID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaAccidentFormQuestion_UserAreaAccidentFormVersion]
    ON [V7].[UserAreaAccidentFormQuestion]([UserAreaID] ASC, [UserAreaAccidentFormID] ASC, [TemplateVersion] ASC)
    INCLUDE([UserAreaAccidentSectionID], [UserAreaAccidentQuestionID], [ParentIDValues], [OrderNum], [IsRequired], [IsHidden], [DefaultValue]);

