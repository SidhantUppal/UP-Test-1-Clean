CREATE TABLE [V7].[AccidentCaseAttachment] (
    [AccidentCaseAttachmentsID]      INT IDENTITY (1, 1) NOT NULL,
    [AccidentCaseID]                 INT NOT NULL,
    [AttachmentID]                   INT NOT NULL,
    [AccidentFormTypeID]             INT NULL,
    [QuestionResponseID]             INT NULL,
    [AccidentFormID]                 INT NULL,
    [AccidentFormTypeQuestionTypeID] INT NULL,
    [UserAreaAccidentFormQuestionID] INT NULL,
    CONSTRAINT [PK__Accident__FA5F5C5D3414D4F9] PRIMARY KEY CLUSTERED ([AccidentCaseAttachmentsID] ASC),
    CONSTRAINT [FK_AccidentCaseAttachment_AccidentCase] FOREIGN KEY ([AccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_AccidentCaseAttachment_AccidentForm] FOREIGN KEY ([AccidentFormID]) REFERENCES [V7].[AccidentForm] ([AccidentFormID]),
    CONSTRAINT [FK_AccidentCaseAttachment_AccidentFormType] FOREIGN KEY ([AccidentFormTypeID]) REFERENCES [V7].[AccidentFormType] ([AccidentFormTypeID]),
    CONSTRAINT [FK_AccidentCaseAttachment_AccidentFormTypeQuestionType] FOREIGN KEY ([AccidentFormTypeQuestionTypeID]) REFERENCES [V7].[AccidentFormTypeQuestionType] ([AccidentFormTypeQuestionTypeID]),
    CONSTRAINT [FK_AccidentCaseAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_AccidentCaseAttachment_QuestionResponse] FOREIGN KEY ([QuestionResponseID]) REFERENCES [V7].[QuestionResponse] ([QuestionResponseID]),
    CONSTRAINT [FK_AccidentCaseAttachment_UserAreaAccidentFormQuestion] FOREIGN KEY ([UserAreaAccidentFormQuestionID]) REFERENCES [V7].[UserAreaAccidentFormQuestion] ([UserAreaAccidentFormQuestionID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AccidentCaseAttachment_AccidentCaseID]
    ON [V7].[AccidentCaseAttachment]([AccidentCaseID] ASC);

