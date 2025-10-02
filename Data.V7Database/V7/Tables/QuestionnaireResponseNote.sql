CREATE TABLE [V7].[QuestionnaireResponseNote] (
    [QuestionnaireResponseNoteID] INT            IDENTITY (1, 1) NOT NULL,
    [QuestionnaireResponseID]     INT            NOT NULL,
    [Notes]                       NVARCHAR (MAX) NOT NULL,
    [CreatedByUserID]             INT            NOT NULL,
    [CreatedDate]                 DATETIMEOFFSET (7) NOT NULL,
    [ArchivedByUserID]            INT            NULL,
    [ArchivedDate]                DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([QuestionnaireResponseNoteID] ASC),
    CONSTRAINT [FK_QuestionnaireResponseNote_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionnaireResponseNote_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionnaireResponseNote_QuestionnaireResponse] FOREIGN KEY ([QuestionnaireResponseID]) REFERENCES [V7].[QuestionnaireResponse] ([QuestionnaireResponseID])
);

