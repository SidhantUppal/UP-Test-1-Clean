CREATE TABLE [V7].[DocRegisterDocType] (
    [DocRegisterDocTypeID]    INT NOT NULL,
    [DocumentLinkTableTypeID] INT NOT NULL,
    [Title] NVARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([DocRegisterDocTypeID] ASC),
    CONSTRAINT [FK_DocRegisterDocType_DocumentLinkTableType] FOREIGN KEY ([DocumentLinkTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID])
);

