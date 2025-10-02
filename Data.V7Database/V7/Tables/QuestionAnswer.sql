CREATE TABLE [V7].[QuestionAnswer] (
    [QuestionAnswerID]     INT            IDENTITY (1, 1) NOT NULL,
    [QuestionID]           INT            NOT NULL,
    [AnswerTypeID]         INT            NOT NULL,
    [UserAreaID]           INT            NULL,
    [OptionListID]         INT            NULL,
    [OptionListValues]     VARCHAR (MAX)  NULL,
    [IntegerResponse]      INT            NULL,
    [BoolResponse]         BIT            NULL,
    [ScoreValue]           INT            NULL,
    [JumpToSection]        INT            NULL,
    [ActionTypeID]         INT            NULL,
    [Comments]             NVARCHAR (MAX) NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ArchivedByUserID]     INT            NULL,
    [ManagerEmployeeID]    INT            NULL,
    [AnswerSeverity]       INT            DEFAULT ((0)) NOT NULL,
    [ManagerOrgGroupID]    INT            NULL,
    [ManagerTypeID]        INT            NULL,
    [DateRule]             INT            NULL,
    [DateRuleValue]        VARCHAR (30)   NULL,
    [TaskSeverityID]       INT            NULL,
    [AnswerText] NVARCHAR (MAX) NULL,
    [ActionText] NVARCHAR (MAX) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    [ActionTitle] NVARCHAR (150) NULL,
    PRIMARY KEY CLUSTERED ([QuestionAnswerID] ASC),
    CONSTRAINT [FK_QuestionAnswer_ActionType] FOREIGN KEY ([ActionTypeID]) REFERENCES [V7].[ActionType] ([ActionTypeID]),
    CONSTRAINT [FK_QuestionAnswer_AnswerType] FOREIGN KEY ([AnswerTypeID]) REFERENCES [V7].[AnswerType] ([AnswerTypeID]),
    CONSTRAINT [FK_QuestionAnswer_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionAnswer_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionAnswer_ManagerEmployee] FOREIGN KEY ([ManagerEmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_QuestionAnswer_ManagerOrgGroup] FOREIGN KEY ([ManagerOrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_QuestionAnswer_ManagerType] FOREIGN KEY ([ManagerTypeID]) REFERENCES [V7].[ManagerType] ([ManagerTypeID]),
    CONSTRAINT [FK_QuestionAnswer_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionAnswer_OptionlistItem] FOREIGN KEY ([OptionListID]) REFERENCES [V7].[OptionList] ([OptionListID]),
    CONSTRAINT [FK_QuestionAnswer_Question] FOREIGN KEY ([QuestionID]) REFERENCES [V7].[Question] ([QuestionID]),
    CONSTRAINT [FK_QuestionAnswer_QuestionnaireSection] FOREIGN KEY ([JumpToSection]) REFERENCES [V7].[QuestionnaireSection] ([QuestionnaireSectionID]),
    CONSTRAINT [FK_QuestionAnswer_TaskSeverity] FOREIGN KEY ([TaskSeverityID]) REFERENCES [V7].[TaskSeverity] ([TaskSeverityID]),
    CONSTRAINT [FK_QuestionAnswer_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_QuestionAnswer_JumpSection_Archived_UserArea]
    ON [V7].[QuestionAnswer]([QuestionID] ASC, [JumpToSection] ASC, [ArchivedDate] ASC, [UserAreaID] ASC)
    INCLUDE([AnswerTypeID], [OptionListID], [OptionListValues], [IntegerResponse], [BoolResponse], [ScoreValue], [ActionTypeID], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate]);

