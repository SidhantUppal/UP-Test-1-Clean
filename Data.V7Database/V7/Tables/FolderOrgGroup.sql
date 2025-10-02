CREATE TABLE [V7].[FolderOrgGroup] (
    [FolderOrgGroupID] INT IDENTITY (1, 1) NOT NULL,
    [FolderID]         INT NOT NULL,
    [OrgGroupID]       INT NOT NULL,
    PRIMARY KEY CLUSTERED ([FolderOrgGroupID] ASC),
    CONSTRAINT [FK_FolderOrgGroup_FolderID] FOREIGN KEY ([FolderID]) REFERENCES [V7].[Folder] ([FolderID]),
    CONSTRAINT [FK_FolderOrgGroup_OrgGroupID] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [UK_FolderOrgGroup] UNIQUE NONCLUSTERED ([FolderID] ASC, [OrgGroupID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_FolderOrgGroup_FolderOrgGroup]
    ON [V7].[FolderOrgGroup]([FolderID] ASC, [OrgGroupID] ASC);

