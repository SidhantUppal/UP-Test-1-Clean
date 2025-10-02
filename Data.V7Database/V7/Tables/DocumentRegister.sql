CREATE TABLE [V7].[DocumentRegister] (
    [DocumentRegisterID]      INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]              INT            NOT NULL,
    [DocumentLinkTableTypeID] INT            NOT NULL,
    [LatestVersion]           DECIMAL (4, 1) NOT NULL,
    [DocumentCreatedDate]     DATETIMEOFFSET (7) NOT NULL,
    [DocumentModifiedDate]    DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]         INT            NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ArchivedByUserID]        INT            NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    [LatestReference] NVARCHAR (255) NULL,
    [LatestTitle] NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([DocumentRegisterID] ASC),
    CONSTRAINT [FK_DocumentRegister_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentRegister_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentRegister_DocumentLinkTableType] FOREIGN KEY ([DocumentLinkTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_DocumentRegister_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

