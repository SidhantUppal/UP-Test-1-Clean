CREATE TABLE [V7].[InductionBundleItem] (
    [InductionBundleItemID]   INT            IDENTITY (1, 1) NOT NULL,
    [InductionBundleID]       INT            NOT NULL,
    [ElementTypeID]           INT            NOT NULL,
    [ElementID]               INT            NULL,
    [DocumentLinkTableTypeID] INT            NULL,
    [DocumentTitle]           NVARCHAR (255) NULL,
    [DocumentURL]             NVARCHAR (MAX) NULL,
    [AttachmentID]            INT            NULL,
    [CreatedByUserID]         INT            NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]    INT            NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT            NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([InductionBundleItemID] ASC),
    CONSTRAINT [FK_InductionBundleItem_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_InductionBundleItem_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_InductionBundleItem_DocumentLinkTableTypeID] FOREIGN KEY ([DocumentLinkTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_InductionBundleItem_InductionBundle] FOREIGN KEY ([InductionBundleID]) REFERENCES [V7].[InductionBundle] ([InductionBundleID]),
    CONSTRAINT [FK_InductionBundleItem_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

