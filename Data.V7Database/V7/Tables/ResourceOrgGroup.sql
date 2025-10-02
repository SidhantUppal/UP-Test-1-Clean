CREATE TABLE [V7].[ResourceOrgGroup] (
    [ResourceOrgGroupID] INT IDENTITY (1, 1) NOT NULL,
    [ResourceID]         INT NOT NULL,
    [OrgGroupID]         INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ResourceOrgGroupID] ASC),
    CONSTRAINT [FK_ResourceOrgGroup_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_ResourceOrgGroup_Resource] FOREIGN KEY ([ResourceID]) REFERENCES [V7].[Resource] ([ResourceID]),
    CONSTRAINT [CK_ResourceOrgGroup_Unique] UNIQUE NONCLUSTERED ([ResourceID] ASC, [OrgGroupID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_ResourceOrgGroup_ResourceID_includes]
    ON [V7].[ResourceOrgGroup]([ResourceID] ASC)
    INCLUDE([ResourceOrgGroupID], [OrgGroupID]);

