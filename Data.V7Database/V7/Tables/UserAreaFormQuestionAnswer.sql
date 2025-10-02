CREATE TABLE [V7].[UserAreaFormQuestionAnswer] (
    [UserAreaFormQuestionAnswerID]         INT                IDENTITY (1, 1) NOT NULL,
    [OriginalUserAreaFormQuestionAnswerID] INT                NULL,
    [UserAreaFormQuestionID]               INT                NOT NULL,
    [AnswerText]                           NVARCHAR (255)     NOT NULL,
    [OrderNum]                             TINYINT            DEFAULT ((0)) NOT NULL,
    [Weighting]                            TINYINT            NULL,
    [ScoreValue]                           TINYINT            NULL,
    [JumpToOriginalUserAreaFormSectionID]  INT                NULL,
    [ConfigData]                           NVARCHAR (MAX)     NULL,
    [CreatedByUserID]                      INT                NOT NULL,
    [CreatedDate]                          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]                 INT                NULL,
    [ModifiedDate]                     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]                     INT                NULL,
    [ArchivedDate]                         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaFormQuestionAnswerID] ASC),
    CONSTRAINT [FK_UserAreaFormQuestionAnswer_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaFormQuestionAnswer_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaFormQuestionAnswer_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaFormQuestionAnswer_OriginalUserAreaFormSection] FOREIGN KEY ([JumpToOriginalUserAreaFormSectionID]) REFERENCES [V7].[UserAreaFormSection] ([UserAreaFormSectionID]),
    CONSTRAINT [FK_UserAreaFormQuestionAnswer_UserAreaFormQuestion] FOREIGN KEY ([UserAreaFormQuestionID]) REFERENCES [V7].[UserAreaFormQuestion] ([UserAreaFormQuestionID])
);

