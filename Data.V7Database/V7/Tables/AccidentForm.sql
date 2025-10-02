CREATE TABLE [V7].[AccidentForm] (
    [AccidentFormID]                INT           IDENTITY (1, 1) NOT NULL,
    [AccidentCaseID]                INT           NOT NULL,
    [AccidentPersonID]              INT           NULL,
    [QuestionnaireID]               INT           NULL,
    [QuestionnaireResponseID]       INT           NULL,
    [AccidentFormStatusTypeID]      INT           NOT NULL,
    [AccidentFormTypeID]            INT           NOT NULL,
    [UserAreaAccidentFormID]        INT           NULL,
    [UserAreaID]                    INT           NOT NULL,
    [SeverityTypeID]                INT           NULL,
    [OrigionalAccidentFormID]       INT           NULL,
    [TemplateVersion]               TINYINT       CONSTRAINT [DF__AccidentF__Templ__7BB1EEB4] DEFAULT ((1)) NOT NULL,
    [XMLResponse]                   XML           NULL,
    [Version]                       TINYINT       CONSTRAINT [DF__AccidentF__Versi__6FF62345] DEFAULT ((1)) NOT NULL,
    [PreviousVersionID]             INT           NULL,
    [OriginalAccidentFormID]        INT           NULL,
    [OriginalPrimaryAccidentFormID] INT           NULL,
    [SessionID]                     NVARCHAR (36) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__tmp_ms_x__5948C023CAA44CBD] PRIMARY KEY CLUSTERED ([AccidentFormID] ASC),
    CONSTRAINT [FK_AccidentForm_AccidentCaseID] FOREIGN KEY ([AccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_AccidentForm_AccidentFormStatusTypeID] FOREIGN KEY ([AccidentFormStatusTypeID]) REFERENCES [V7].[AccidentFormStatusType] ([AccidentFormStatusTypeID]),
    CONSTRAINT [FK_AccidentForm_AccidentFormTypeID] FOREIGN KEY ([AccidentFormTypeID]) REFERENCES [V7].[AccidentFormType] ([AccidentFormTypeID]),
    CONSTRAINT [FK_AccidentForm_AccidentPersonID] FOREIGN KEY ([AccidentPersonID]) REFERENCES [V7].[AccidentPerson] ([AccidentPersonID]),
    CONSTRAINT [FK_AccidentForm_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentForm_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentForm_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentForm_OriginalAccidentFormID] FOREIGN KEY ([OriginalAccidentFormID]) REFERENCES [V7].[AccidentForm] ([AccidentFormID]),
    CONSTRAINT [FK_AccidentForm_OriginalPrimaryAccidentFormID] FOREIGN KEY ([OriginalPrimaryAccidentFormID]) REFERENCES [V7].[AccidentForm] ([AccidentFormID]),
    CONSTRAINT [FK_AccidentForm_QuestionnaireID] FOREIGN KEY ([QuestionnaireID]) REFERENCES [V7].[Questionnaire] ([QuestionnaireID]),
    CONSTRAINT [FK_AccidentForm_QuestionnaireResponseID] FOREIGN KEY ([QuestionnaireResponseID]) REFERENCES [V7].[QuestionnaireResponse] ([QuestionnaireResponseID]),
    CONSTRAINT [FK_AccidentForm_SeverityType] FOREIGN KEY ([SeverityTypeID]) REFERENCES [V7].[SeverityType] ([SeverityTypeID]),
    CONSTRAINT [FK_AccidentForm_UserAreaAccidentFormID] FOREIGN KEY ([UserAreaAccidentFormID]) REFERENCES [V7].[UserAreaAccidentForm] ([UserAreaAccidentFormID]),
    CONSTRAINT [FK_AccidentForm_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AccidentForm_AccidentCaseID_UserAreaID_ArchivedDate_AccidentFormStatusTypeID]
    ON [V7].[AccidentForm]([AccidentCaseID] ASC, [UserAreaID] ASC, [ArchivedDate] ASC, [AccidentFormStatusTypeID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_AccidentForm_AccidentFormStatusTypeID_UserAreaID_ArchivedDate_AccidentFormTypeID]
    ON [V7].[AccidentForm]([AccidentFormStatusTypeID] ASC, [UserAreaID] ASC, [ArchivedDate] ASC, [AccidentFormTypeID] ASC, [UserAreaAccidentFormID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_AccidentForm_OriginalPrimaryAccidentFormID_Simple]
    ON [V7].[AccidentForm]([OriginalPrimaryAccidentFormID] ASC);

