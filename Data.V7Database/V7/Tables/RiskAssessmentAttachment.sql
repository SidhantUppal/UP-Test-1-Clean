CREATE TABLE [V7].[RiskAssessmentAttachment] (
    [RiskAssessmentAttachmentID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                 INT                NOT NULL,
    [RiskAssessmentID]           INT                NOT NULL,
    [AttachmentID]               INT                NOT NULL,
    [AttachmentType]             NVARCHAR (50)      DEFAULT ('Document') NULL,
    [Description]                NVARCHAR (255)     NULL,
    [SequenceOrder]              INT                DEFAULT ((0)) NULL,
    [CreatedByUserID]            INT                NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]       INT                NULL,
    [ModifiedDate]           DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]           INT                NULL,
    [ArchivedDate]               DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskAssessmentAttachmentID] ASC),
    CONSTRAINT [FK_RiskAssessmentAttachment_Assessment] FOREIGN KEY ([RiskAssessmentID]) REFERENCES [V7].[RiskAssessment] ([RiskAssessmentID]),
    CONSTRAINT [FK_RiskAssessmentAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_RiskAssessmentAttachment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

