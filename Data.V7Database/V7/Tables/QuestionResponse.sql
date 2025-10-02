CREATE TABLE [V7].[QuestionResponse] (
    [QuestionResponseID]           INT             IDENTITY (1, 1) NOT NULL,
    [QuestionnaireResponseID]      INT             NOT NULL,
    [QuestionID]                   INT             NOT NULL,
    [UserAreaID]                   INT             NOT NULL,
    [AnswerTypeID]                 INT             NOT NULL,
    [ResponseText]                 VARCHAR (MAX)   NULL,
    [OptionListResponse]           VARCHAR (MAX)   NULL,
    [IntegerResponse]              INT             NULL,
    [BoolResponse]                 BIT             NULL,
    [DateResponse]                 DATETIMEOFFSET (7) NULL,
    [StaticDataResponse]           VARCHAR (MAX)   NULL,
    [Comments]                     NVARCHAR (MAX)  NULL,
    [AttachmentID]                 INT             NULL,
    [Attachments]                  NVARCHAR (2000) NULL,
    [CreatedByUserID]              INT             NOT NULL,
    [CreatedDate]                  DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]         INT             NULL,
    [ModifiedDate]             DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]             INT             NULL,
    [ArchivedDate]                 DATETIMEOFFSET (7) NULL,
    [MajorMinorNonConformityScore] INT             DEFAULT ((0)) NOT NULL,
    [IsSkipped]                    BIT             DEFAULT ((0)) NOT NULL,
    [IsHidden]                     BIT             DEFAULT ((0)) NOT NULL,
    [AnswerGridResponse]           VARCHAR (MAX)   NULL,
    [WELResponse]                  VARCHAR (MAX)   NULL,
    PRIMARY KEY CLUSTERED ([QuestionResponseID] ASC),
    CONSTRAINT [FK_QuestionResponse_AnswerType] FOREIGN KEY ([AnswerTypeID]) REFERENCES [V7].[AnswerType] ([AnswerTypeID]),
    CONSTRAINT [FK_QuestionResponse_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionResponse_AttachmentID] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_QuestionResponse_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionResponse_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_QuestionResponse_Question] FOREIGN KEY ([QuestionID]) REFERENCES [V7].[Question] ([QuestionID]),
    CONSTRAINT [FK_QuestionResponse_QuestionnaireResponse] FOREIGN KEY ([QuestionnaireResponseID]) REFERENCES [V7].[QuestionnaireResponse] ([QuestionnaireResponseID]),
    CONSTRAINT [FK_QuestionResponse_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [ix_QuestionResponse_QuestionnaireResponseID_ArchivedDate]
    ON [V7].[QuestionResponse]([QuestionnaireResponseID] ASC, [ArchivedDate] ASC);

