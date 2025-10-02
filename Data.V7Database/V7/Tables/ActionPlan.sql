CREATE TABLE [V7].[ActionPlan] (
    [ActionPlanID]         INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT           NOT NULL,
    [OrgGroupID]           INT           NULL,
    [Reference]            NVARCHAR (50) NULL,
    [CreatedByUserID]      INT           NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT           NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT           NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ActionPlanID] ASC),
    CONSTRAINT [FK_ActionPlan_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ActionPlan_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ActionPlan_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ActionPlan_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_ActionPlan_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

