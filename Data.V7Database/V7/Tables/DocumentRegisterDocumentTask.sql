CREATE TABLE [V7].[DocumentRegisterDocumentTask] (
    [DocumentRegisterDocumentTaskID] INT IDENTITY (1, 1) NOT NULL,
    [DocumentRegisterDocumentID]     INT NOT NULL,
    [TaskID]                         INT NOT NULL,
    PRIMARY KEY CLUSTERED ([DocumentRegisterDocumentTaskID] ASC),
    CONSTRAINT [FK_DocumentRegisterDocumentTask_DocumentRegisterDocument] FOREIGN KEY ([DocumentRegisterDocumentID]) REFERENCES [V7].[DocumentRegisterDocument] ([DocumentRegisterDocumentID]),
    CONSTRAINT [FK_DocumentRegisterDocumentTask_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [CK_DocumentRegisterDocumentTask_Unique] UNIQUE NONCLUSTERED ([DocumentRegisterDocumentID] ASC, [TaskID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentRegisterDocumentTask_DocumentRegisterDocumentID_includes]
    ON [V7].[DocumentRegisterDocumentTask]([DocumentRegisterDocumentID] ASC)
    INCLUDE([DocumentRegisterDocumentTaskID], [TaskID]);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentRegisterDocumentTask_TaskID_includes]
    ON [V7].[DocumentRegisterDocumentTask]([TaskID] ASC)
    INCLUDE([DocumentRegisterDocumentTaskID], [DocumentRegisterDocumentID]);

