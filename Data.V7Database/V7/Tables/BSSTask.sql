CREATE TABLE [V7].[BSSTask] (
    [TaskID]                           INT             IDENTITY (1, 1) NOT NULL,
    [Title]                            NVARCHAR (1024) NOT NULL,
    [Description]                      NVARCHAR (MAX)  NULL,
    [Reference]                        NVARCHAR (100)  NULL,
    [UserAreaID]                       INT             NOT NULL,
    [LocationID]                       INT             NULL,
    [TaskTypeID]                       INT             NOT NULL,
    [TaskScheduleID]                   INT             NULL,
    [TaskSeverityID]                   INT             NULL,
    [TaskSeverity]                     VARCHAR (20)    NULL,
    [DueFromDate]                      DATETIMEOFFSET (7) NULL,
    [DueByDate]                        DATETIMEOFFSET (7) NULL,
    [DueDate]                          DATETIMEOFFSET (7) NULL,
    [CompletedDate]                    DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]                  INT             NOT NULL,
    [CreatedDate]                      DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]             INT             NULL,
    [ModifiedDate]                 DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]                 INT             NULL,
    [ArchivedDate]                     DATETIMEOFFSET (7) NULL,
    [ParentID]                         INT             NULL,
    [TaskStatusTypeID]                 INT             NULL,
    [CompletedBySignature]             NVARCHAR (MAX)  NULL,
    [CompletedByFullName]              NVARCHAR (100)  NULL,
    [IsAnonymous]                      BIT             DEFAULT ((0)) NOT NULL,
    [IsAnonymouslyReported]            BIT             DEFAULT ((0)) NOT NULL,
    [CanOneEmployeeAccept]             BIT             DEFAULT ((0)) NOT NULL,
    [CompletedBySignatureAttachmentID] INT             NULL,
    [DueFrom]                          DATETIMEOFFSET (7) NULL,
    [IsEvidenceRequiredToClose]        BIT             DEFAULT ((0)) NOT NULL,
    [AssetDetails]                     NVARCHAR (1024) NULL,
    [IsCreatorApprovalRequiredToClose] BIT             DEFAULT ((0)) NOT NULL,
    [IsSubmittedForApproval]           BIT             DEFAULT ((0)) NOT NULL,
    [IsLiveDate]                       DATETIMEOFFSET (7) NULL,
    [RelatedDocumentTypeName]          NVARCHAR (30)   NULL,
    [RelatedDocumentTitle]             NVARCHAR (255)  NULL,
    [TribunalCaseID]                   INT             NULL,
    [HRCaseID]                         INT             NULL,
    [HRTypeID]                         INT             NULL,
    [ExpiredDate]                      DATETIMEOFFSET (7) NULL,
    [TempID]                           INT             NULL,
    [HasTravelCost]                    BIT             DEFAULT ((0)) NOT NULL,
    [ExtraLocationIDList]              NVARCHAR (150)  NULL,
    [InProgressByUserID]               INT             NULL,
    [InProgressStartDate]              DATETIMEOFFSET (7) NULL,
    [IsPooledTask]                     BIT             DEFAULT ((0)) NOT NULL,
    [MaxConcurrentWorkers]             INT             DEFAULT ((1)) NOT NULL,
    [RequireAllUsersComplete]          BIT             DEFAULT ((0)) NOT NULL,
    [ReturnedToPoolDate]               DATETIMEOFFSET (7) NULL,
    [ReturnedToPoolByUserID]           INT             NULL,
    [ReturnToPoolReason]               NVARCHAR (1024) NULL,
    [IsOpenToAll]                      BIT             DEFAULT ((0)) NOT NULL,
    [OpenToOrgGroupID]                 INT             NULL,
    [OpenToLocationID]                 INT             NULL,
    [TaskPriorityID]                   INT             NULL,
    CONSTRAINT [PK__Task__7C6949D1A74D81F7] PRIMARY KEY CLUSTERED ([TaskID] ASC),
    CONSTRAINT [Fk_Attachment_AttachmentID] FOREIGN KEY ([CompletedBySignatureAttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_Task_ArchivedByUserID] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Task_CreatedByUserID] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Task_HRCase] FOREIGN KEY ([HRCaseID]) REFERENCES [V7].[HRCase] ([HRCaseID]),
    CONSTRAINT [FK_Task_HRType] FOREIGN KEY ([HRTypeID]) REFERENCES [V7].[HRType] ([HRTypeID]),
    CONSTRAINT [FK_Task_ModifiedByUserID] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Task_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_Task_Parent] FOREIGN KEY ([ParentID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [FK_BSSTask_TaskSchedule] FOREIGN KEY ([TaskScheduleID]) REFERENCES [V7].[TaskSchedule] ([TaskScheduleID]),
    CONSTRAINT [FK_Task_TaskSeverity] FOREIGN KEY ([TaskSeverityID]) REFERENCES [V7].[TaskSeverity] ([TaskSeverityID]),
    CONSTRAINT [FK_Task_TaskStatusType] FOREIGN KEY ([TaskStatusTypeID]) REFERENCES [V7].[TaskStatusType] ([TaskStatusTypeID]),
    CONSTRAINT [FK_Task_TaskType] FOREIGN KEY ([TaskTypeID]) REFERENCES [V7].[TaskType] ([TaskTypeID]),
    CONSTRAINT [FK_Task_TribunalCase] FOREIGN KEY ([TribunalCaseID]) REFERENCES [V7].[TribunalCase] ([TribunalCaseID]),
    CONSTRAINT [FK_Task_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_BSSTask_InProgressBy] FOREIGN KEY ([InProgressByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BSSTask_ReturnedToPoolBy] FOREIGN KEY ([ReturnedToPoolByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BSSTask_TaskPriority] FOREIGN KEY ([TaskPriorityID]) REFERENCES [V7].[TaskPriority] ([TaskPriorityID]),
    CONSTRAINT [CK_BSSTask_MaxConcurrentWorkers] CHECK ([MaxConcurrentWorkers]>(0)),
    CONSTRAINT [CK_BSSTask_PoolOpenLogic] CHECK (NOT ([IsPooledTask]=(1) AND [IsOpenToAll]=(1))),
    CONSTRAINT [CK_BSSTask_ReturnReason] CHECK (len([ReturnToPoolReason])<=(1024))
);


GO
CREATE NONCLUSTERED INDEX [IX_Task_CompletedArchivedDue]
    ON [V7].[BSSTask]([UserAreaID] ASC, [CompletedDate] ASC, [ArchivedDate] ASC, [DueDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Task_TaskScheduleID_ArchivedDate_DueDate]
    ON [V7].[BSSTask]([TaskScheduleID] ASC, [ArchivedDate] ASC, [DueDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Task_UserAreaID_CompletedDate_ArchivedDate_includes]
    ON [V7].[BSSTask]([UserAreaID] ASC, [CompletedDate] ASC, [ArchivedDate] ASC)
    INCLUDE([LocationID], [TaskTypeID], [TaskScheduleID]);


GO
CREATE NONCLUSTERED INDEX [IX_Task_UserAreaID_CompletedDate_ArchivedDate_TaskTypeID_IsLiveDate_includes]
    ON [V7].[BSSTask]([UserAreaID] ASC, [CompletedDate] ASC, [ArchivedDate] ASC, [TaskTypeID] ASC, [IsLiveDate] ASC)
    INCLUDE([LocationID], [TaskScheduleID], [DueDate]);


GO
CREATE NONCLUSTERED INDEX [IX_Task_UserAreaID_CompletedDate_TaskTypeID_includes]
    ON [V7].[BSSTask]([UserAreaID] ASC, [CompletedDate] ASC, [TaskTypeID] ASC)
    INCLUDE([Title], [Description], [Reference], [LocationID], [TaskScheduleID], [TaskSeverityID], [DueDate], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ArchivedDate], [DueFrom], [AssetDetails], [IsCreatorApprovalRequiredToClose], [IsSubmittedForApproval]);


GO
CREATE NONCLUSTERED INDEX [IX_Task_UserAreaIDTaskID]
    ON [V7].[BSSTask]([UserAreaID] ASC, [TaskID] ASC)
    INCLUDE([Title]);


GO
CREATE NONCLUSTERED INDEX [IX_BSSTask_Location]
    ON [V7].[BSSTask]([OpenToLocationID] ASC, [UserAreaID] ASC) WHERE ([OpenToLocationID] IS NOT NULL);


GO
CREATE NONCLUSTERED INDEX [IX_BSSTask_OrgGroup]
    ON [V7].[BSSTask]([OpenToOrgGroupID] ASC, [UserAreaID] ASC) WHERE ([OpenToOrgGroupID] IS NOT NULL);

