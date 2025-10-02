CREATE TABLE [V7].[TextBlockOrgGroup] (
    [TextBlockOrgGroupID] INT IDENTITY (1, 1) NOT NULL,
    [TextBlockID]         INT NOT NULL,
    [OrgGroupID]          INT NOT NULL,
    PRIMARY KEY CLUSTERED ([TextBlockOrgGroupID] ASC),
    CONSTRAINT [FK_TextBlockOrgGroup_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_TextBlockOrgGroup_TextBlock] FOREIGN KEY ([TextBlockID]) REFERENCES [V7].[TextBlock] ([TextBlockID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TextBlockOrgGroup_TextBlockID_includes]
    ON [V7].[TextBlockOrgGroup]([TextBlockID] ASC)
    INCLUDE([TextBlockOrgGroupID], [OrgGroupID]);

