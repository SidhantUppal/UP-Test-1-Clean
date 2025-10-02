CREATE TABLE [V7].[TaskClassification] (
    [TaskClassificationID]     INT IDENTITY (1, 1) NOT NULL,
    [TaskID]                   INT NOT NULL,
    [TaskClassificationTypeID] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([TaskClassificationID] ASC),
    CONSTRAINT [FK_TaskClassification_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [FK_TaskClassification_TaskClassificationType] FOREIGN KEY ([TaskClassificationTypeID]) REFERENCES [V7].[TaskClassificationType] ([TaskClassificationTypeID]),
    CONSTRAINT [CK_TaskClassification_Unique] UNIQUE NONCLUSTERED ([TaskID] ASC, [TaskClassificationTypeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskClassification_TaskID_includes]
    ON [V7].[TaskClassification]([TaskID] ASC)
    INCLUDE([TaskClassificationID], [TaskClassificationTypeID]);

