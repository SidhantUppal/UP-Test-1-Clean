CREATE TABLE [V7].[TaskTypeUserArea] (
    [TaskTypeUserAreaID] INT IDENTITY (1, 1) NOT NULL,
    [TaskTypeID]         INT NOT NULL,
    [UserAreaID]         INT NOT NULL,
    PRIMARY KEY CLUSTERED ([TaskTypeUserAreaID] ASC),
    CONSTRAINT [FK_TaskTypeUserArea_TaskType] FOREIGN KEY ([TaskTypeID]) REFERENCES [V7].[TaskType] ([TaskTypeID]),
    CONSTRAINT [FK_TaskTypeUserArea_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [CK_TaskTypeUserArea_Unique] UNIQUE NONCLUSTERED ([TaskTypeID] ASC, [UserAreaID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskTypeUserArea_TaskTypeID]
    ON [V7].[TaskTypeUserArea]([TaskTypeID] ASC)
    INCLUDE([TaskTypeUserAreaID], [UserAreaID]);


GO
CREATE NONCLUSTERED INDEX [IX_TaskTypeUserArea_UserAreaID]
    ON [V7].[TaskTypeUserArea]([UserAreaID] ASC)
    INCLUDE([TaskTypeUserAreaID], [TaskTypeID]);

