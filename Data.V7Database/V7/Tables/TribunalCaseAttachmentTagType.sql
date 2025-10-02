CREATE TABLE [V7].[TribunalCaseAttachmentTagType] (
    [TribunalCaseAttachmentTagTypeID] INT      IDENTITY (1, 1) NOT NULL,
    [UserAreaID]         INT           NULL,
    [TribunalCaseAttachmentID]        INT      NOT NULL,
    [TagTypeID]                       INT      NOT NULL,
    [CreatedByUserID]                 INT      NOT NULL,
    [CreatedDate]                     DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([TribunalCaseAttachmentTagTypeID] ASC),
    CONSTRAINT [FK_TribunalCaseAttachmentTagType_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseAttachmentTagType_TagType] FOREIGN KEY ([TagTypeID]) REFERENCES [V7].[TagType] ([TagTypeID]),
    CONSTRAINT [FK_TribunalCaseAttachmentTagType_TribunalCaseAttachment] FOREIGN KEY ([TribunalCaseAttachmentID]) REFERENCES [V7].[TribunalCaseAttachment] ([TribunalCaseAttachmentID])
,
    CONSTRAINT [FK_TribunalCaseAttachmentTagType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TribunalCaseAttachmentTagType_TribunalCaseAttachment]
    ON [V7].[TribunalCaseAttachmentTagType]([TribunalCaseAttachmentID] ASC)
    INCLUDE([TagTypeID]);


