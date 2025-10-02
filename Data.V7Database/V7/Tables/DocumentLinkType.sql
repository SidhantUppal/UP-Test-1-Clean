CREATE TABLE [V7].[DocumentLinkType] (
    [DocumentLinkTypeID] INT            NOT NULL,
    [LinkName]           NVARCHAR (50)  NOT NULL,
    [Description]        NVARCHAR (MAX) NOT NULL,
    [PermissionID]       INT            NULL,
    PRIMARY KEY CLUSTERED ([DocumentLinkTypeID] ASC),
    CONSTRAINT [FK_DocumentLinkType_PermissionID] FOREIGN KEY ([PermissionID]) REFERENCES [V7].[Permission] ([PermissionID])
);

