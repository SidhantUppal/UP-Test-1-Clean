CREATE TABLE [V7].[UserAreaTaskType] (
    [UserAreaTaskTypeID] INT IDENTITY (1, 1) NOT NULL,
    [TaskTypeID]         INT NOT NULL,
    [UserAreaID]         INT NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaTaskTypeID] ASC),
    CONSTRAINT [FK_UserAreaTaskType_TaskType] FOREIGN KEY ([TaskTypeID]) REFERENCES [V7].[TaskType] ([TaskTypeID]),
    CONSTRAINT [FK_UserAreaTaskType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

