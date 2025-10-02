CREATE TABLE [V7].[OptionList] (
    [OptionListID]         INT            IDENTITY (1, 1) NOT NULL,
    [QuestionnaireID]      INT            NULL,
    [UserAreaID]           INT            NULL,
    [Reference]            NVARCHAR (255) NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([OptionListID] ASC),
    CONSTRAINT [FK_OptionList_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_OptionList_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_OptionList_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_OptionList_Questionnaire] FOREIGN KEY ([QuestionnaireID]) REFERENCES [V7].[Questionnaire] ([QuestionnaireID]),
    CONSTRAINT [FK_OptionList_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [UK_OptionList_Reference] UNIQUE NONCLUSTERED ([QuestionnaireID] ASC, [Reference] ASC, [ArchivedDate] ASC)
);

