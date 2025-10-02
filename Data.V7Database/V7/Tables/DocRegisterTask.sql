CREATE TABLE [V7].[DocRegisterTask] (
    [DocRegisterTaskID]                INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                       INT NOT NULL,
    [DocumentLinkTableTypeID]          INT NOT NULL,
    [OriginalDocumentID]               INT NOT NULL,
    [LatestDocumentID]                 INT NOT NULL,
    [TaskID]                           INT NULL,
    [RequireReadAllAttachedForSigning] BIT DEFAULT ((0)) NOT NULL,
    [InductionEnrolmentID]             INT NULL,
    PRIMARY KEY CLUSTERED ([DocRegisterTaskID] ASC),
    CONSTRAINT [FK_DocRegisterTask_DocumentLinkTableType] FOREIGN KEY ([DocumentLinkTableTypeID]) REFERENCES [V7].[DocumentLinkTableType] ([DocumentLinkTableTypeID]),
    CONSTRAINT [FK_DocRegisterTask_InductionEnrolment] FOREIGN KEY ([InductionEnrolmentID]) REFERENCES [V7].[InductionEnrolment] ([InductionEnrolmentID]),
    CONSTRAINT [FK_DocRegisterTask_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [FK_DocRegisterTask_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocRegisterTask_LatestDocument_includes]
    ON [V7].[DocRegisterTask]([UserAreaID] ASC, [DocumentLinkTableTypeID] ASC, [LatestDocumentID] ASC)
    INCLUDE([DocRegisterTaskID], [OriginalDocumentID], [TaskID]);


GO
CREATE NONCLUSTERED INDEX [IX_DocRegisterTask_OriginalDocument_includes]
    ON [V7].[DocRegisterTask]([UserAreaID] ASC, [DocumentLinkTableTypeID] ASC, [OriginalDocumentID] ASC)
    INCLUDE([DocRegisterTaskID], [LatestDocumentID], [TaskID]);


GO
CREATE NONCLUSTERED INDEX [IX_DocRegisterTask_Task_includes]
    ON [V7].[DocRegisterTask]([UserAreaID] ASC, [TaskID] ASC)
    INCLUDE([DocRegisterTaskID], [DocumentLinkTableTypeID], [OriginalDocumentID], [LatestDocumentID]);

