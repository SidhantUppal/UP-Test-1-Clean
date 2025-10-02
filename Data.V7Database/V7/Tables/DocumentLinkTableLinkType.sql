CREATE TABLE [V7].[DocumentLinkTableLinkType] (
    [DocumentLinkTableLinkTypeID]  INT IDENTITY (1, 1) NOT NULL,
    [DocumentLinkTypeID]           INT NOT NULL,
    [DocumentLinkTableTypeID]      INT NOT NULL,
    [DocumentLinkTableChildTypeID] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([DocumentLinkTableLinkTypeID] ASC),
    CONSTRAINT [FK_DocumentLinkTableLinkType_DocumentLinkTableChildTypeID] FOREIGN KEY ([DocumentLinkTableChildTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_DocumentLinkTableLinkType_DocumentLinkTableTypeID] FOREIGN KEY ([DocumentLinkTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_DocumentLinkTableLinkType_DocumentLinkTypeID] FOREIGN KEY ([DocumentLinkTypeID]) REFERENCES [V7].[DocumentLinkType] ([DocumentLinkTypeID])
);

