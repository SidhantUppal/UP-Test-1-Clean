CREATE TABLE [V7].[QuestionnaireResponseAttachment] (
    [QuestionnaireResponseAttachment] INT IDENTITY (1, 1) NOT NULL,
    [QuestionnaireResponseID]         INT NOT NULL,
    [AttachmentID]                    INT NOT NULL,
    PRIMARY KEY CLUSTERED ([QuestionnaireResponseAttachment] ASC),
    CONSTRAINT [FK_QuestionnaireResponseAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_QuestionnaireResponseAttachment_QuestionnaireResponse] FOREIGN KEY ([QuestionnaireResponseID]) REFERENCES [V7].[QuestionnaireResponse] ([QuestionnaireResponseID])
);

