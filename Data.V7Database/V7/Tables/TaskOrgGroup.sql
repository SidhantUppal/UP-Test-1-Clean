CREATE TABLE [V7].[TaskOrgGroup] (
    [TaskOrgGroupID] INT IDENTITY (1, 1) NOT NULL,
    [TaskID]         INT NOT NULL,
    [OrgGroupID]     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([TaskOrgGroupID] ASC),
    CONSTRAINT [FK_TaskOrgGroup_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_TaskOrgGroup_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskOrgGroup_TaskID_includes]
    ON [V7].[TaskOrgGroup]([TaskID] ASC)
    INCLUDE([OrgGroupID]);

