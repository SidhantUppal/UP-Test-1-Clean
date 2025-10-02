CREATE TABLE [V7].[ChecklistOrgGroup] (
    [ChecklistOrgGroupID] INT IDENTITY (1, 1) NOT NULL,
    [ChecklistID]         INT NOT NULL,
    [OrgGroupID]          INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ChecklistOrgGroupID] ASC),
    CONSTRAINT [FK_ChecklistOrgGroup_Checklist] FOREIGN KEY ([ChecklistID]) REFERENCES [V7].[Checklist] ([ChecklistID]),
    CONSTRAINT [FK_ChecklistOrgGroup_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID])
);

