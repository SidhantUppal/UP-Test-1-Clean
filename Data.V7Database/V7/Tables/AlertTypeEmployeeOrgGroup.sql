CREATE TABLE [V7].[AlertTypeEmployeeOrgGroup] (
    [AlertTypeEmployeeOrgGroupID] INT IDENTITY (1, 1) NOT NULL,
    [AlertTypeEmployeeID]         INT NOT NULL,
    [OrgGroupID]                  INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AlertTypeEmployeeOrgGroupID] ASC),
    CONSTRAINT [FK_AlertTypeEmployeeOrgGroup_AlertTypeEmployee] FOREIGN KEY ([AlertTypeEmployeeID]) REFERENCES [V7].[AlertTypeEmployee] ([AlertTypeEmployeeID]),
    CONSTRAINT [FK_AlertTypeEmployeeOrgGroup_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AlertTypeEmployeeOrgGroup_AlertTypeEmployee]
    ON [V7].[AlertTypeEmployeeOrgGroup]([AlertTypeEmployeeID] ASC)
    INCLUDE([AlertTypeEmployeeOrgGroupID], [OrgGroupID]);

