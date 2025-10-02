CREATE TABLE [V7].[ActionPlanItem] (
    [ActionPlanItemID]     INT      IDENTITY (1, 1) NOT NULL,
    [ActionPlanID]         INT      NOT NULL,
    [PlanCollectionItemID] INT      NOT NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [CompletedByUserID]    INT      NULL,
    [CompletedDate]        DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ActionPlanItemID] ASC),
    CONSTRAINT [FK_ActionPlanItem_ActionPlan] FOREIGN KEY ([ActionPlanID]) REFERENCES [V7].[ActionPlan] ([ActionPlanID]),
    CONSTRAINT [FK_ActionPlanItem_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ActionPlanItem_CompletedBy] FOREIGN KEY ([CompletedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ActionPlanItem_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ActionPlanItem_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ActionPlanItem_PlanCollectionItem] FOREIGN KEY ([PlanCollectionItemID]) REFERENCES [V7].[PlanCollectionItem] ([PlanCollectionItemID])
);

