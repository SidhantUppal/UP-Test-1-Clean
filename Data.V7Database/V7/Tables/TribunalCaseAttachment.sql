CREATE TABLE [V7].[TribunalCaseAttachment] (
    [TribunalCaseAttachmentID]     INT            IDENTITY (1, 1) NOT NULL,
    [TribunalCaseID]               INT            NOT NULL,
    [AttachmentID]                 INT            NOT NULL,
    [TribunalCaseAttachmentTypeID] INT            NOT NULL,
    [TribunalCaseSeverityTypeID]   INT            NOT NULL,
    [TribunalCasePersonTypeID]     INT            NOT NULL,
    [TribunalCaseEventTypeID]      INT            NULL,
    [IsET1Related]                 BIT            DEFAULT ((0)) NOT NULL,
    [IsET3Related]                 BIT            DEFAULT ((0)) NOT NULL,
    [Reference]                    NVARCHAR (50)  NULL,
    [Title]                        NVARCHAR (255) NOT NULL,
    [DocumentDate]                 DATETIMEOFFSET (7) NULL,
    [AddedToBundleDate]            DATETIMEOFFSET (7) NULL,
    [BundleOrderNum]               INT            NULL,
    PRIMARY KEY CLUSTERED ([TribunalCaseAttachmentID] ASC),
    CONSTRAINT [FK_TribunalCaseAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_TribunalCaseAttachment_TribunalCase] FOREIGN KEY ([TribunalCaseID]) REFERENCES [V7].[TribunalCase] ([TribunalCaseID]),
    CONSTRAINT [FK_TribunalCaseAttachment_TribunalCaseAttachmentType] FOREIGN KEY ([TribunalCaseAttachmentTypeID]) REFERENCES [V7].[TribunalCaseAttachmentType] ([TribunalCaseAttachmentTypeID]),
    CONSTRAINT [FK_TribunalCaseAttachment_TribunalCaseEventType] FOREIGN KEY ([TribunalCaseEventTypeID]) REFERENCES [V7].[TribunalCaseEventType] ([TribunalCaseEventTypeID]),
    CONSTRAINT [FK_TribunalCaseAttachment_TribunalCasePersonType] FOREIGN KEY ([TribunalCasePersonTypeID]) REFERENCES [V7].[TribunalCasePersonType] ([TribunalCasePersonTypeID]),
    CONSTRAINT [FK_TribunalCaseAttachment_TribunalCaseSeverityType] FOREIGN KEY ([TribunalCaseSeverityTypeID]) REFERENCES [V7].[TribunalCaseSeverityType] ([TribunalCaseSeverityTypeID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TribunalCaseAttachment_TribunalCase]
    ON [V7].[TribunalCaseAttachment]([TribunalCaseID] ASC)
    INCLUDE([AttachmentID], [TribunalCaseAttachmentTypeID], [TribunalCaseSeverityTypeID], [TribunalCasePersonTypeID], [Reference], [Title], [DocumentDate], [AddedToBundleDate]);

