CREATE TABLE [V7].[SafeSystemOfWorkLinkRecord] (
    [SafeSystemOfWorkLinkRecordID] INT IDENTITY (1, 1) NOT NULL,
    [SafeSystemOfWorkLinkID]       INT NOT NULL,
    [DocumentLinkTableTypeID]      INT NOT NULL,
    [RecordID]                     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([SafeSystemOfWorkLinkRecordID] ASC),
    CONSTRAINT [FK_SafeSystemOfWorkLinkRecord_DocumentLinkTableType] FOREIGN KEY ([DocumentLinkTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_SafeSystemOfWorkLinkRecord_SafeSystemOfWorkLink] FOREIGN KEY ([SafeSystemOfWorkLinkID]) REFERENCES [V7].[SafeSystemOfWorkLink] ([SafeSystemOfWorkLinkID])
);

