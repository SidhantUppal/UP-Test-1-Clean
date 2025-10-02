CREATE TABLE [V7].[DocumentEditLockUser] (
    [DocumentEditLockUserId] INT IDENTITY (1, 1) NOT NULL,
    [DocumentTypeID]         INT NOT NULL,
    [UserID]                 INT NOT NULL,
    [DocumentID]             INT NOT NULL,
    [IsEnabled]              BIT DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([DocumentEditLockUserId] ASC),
    CONSTRAINT [FK_DocumentEditLockUser_DocumentLinkTableType] FOREIGN KEY ([DocumentTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_DocumentEditLockUser_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);

