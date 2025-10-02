CREATE TABLE [V7].[DocumentLink] (
    [DocumentLinkID]     INT          IDENTITY (1, 1) NOT NULL,
    [FirstID]            INT          NOT NULL,
    [SecondID]           INT          NOT NULL,
    [FirstTableTypeID]   INT          NOT NULL,
    [SecondTableTypeID]  INT          NOT NULL,
    [DocumentLinkTypeID] INT          NOT NULL,
    [UserAreaID]         INT          NULL,
    [CreatedByUserID]    INT          NULL,
    [CreatedDate]        DATETIMEOFFSET (7) NULL,
    [InstanceID]         VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([DocumentLinkID] ASC),
    CONSTRAINT [FK_DocumentLink_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentLink_LinkTypeID] FOREIGN KEY ([DocumentLinkTypeID]) REFERENCES [V7].[DocumentLinkType] ([DocumentLinkTypeID]),
    CONSTRAINT [FK_DocumentLink_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_DocumentLinkFirstTable_DocumentLinkTableType] FOREIGN KEY ([FirstTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_DocumentLinkSecondTable_DocumentLinkTableType] FOREIGN KEY ([SecondTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentLink_FirstID_FirstTableTypeID]
    ON [V7].[DocumentLink]([FirstID] ASC, [FirstTableTypeID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentLink_FirstTableTypeID_SecondTableTypeID_DocumentLinkTypeID_FirstID_includes]
    ON [V7].[DocumentLink]([FirstTableTypeID] ASC, [SecondTableTypeID] ASC, [DocumentLinkTypeID] ASC, [FirstID] ASC)
    INCLUDE([SecondID], [UserAreaID]);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentLink_FirstTableTypeID_SecondTableTypeID_DocumentLinkTypeID_UserAreaID_includes]
    ON [V7].[DocumentLink]([FirstTableTypeID] ASC, [SecondTableTypeID] ASC, [DocumentLinkTypeID] ASC, [UserAreaID] ASC)
    INCLUDE([FirstID], [SecondID]);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentLink_SecondID_includes]
    ON [V7].[DocumentLink]([SecondID] ASC)
    INCLUDE([DocumentLinkID], [FirstID], [FirstTableTypeID], [SecondTableTypeID], [DocumentLinkTypeID], [UserAreaID], [CreatedByUserID], [CreatedDate]);

