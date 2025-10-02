CREATE TABLE [V7].[HRCaseTask] (
    [HRCaseTaskID]       INT            IDENTITY (1, 1) NOT NULL,
    [TaskID]             INT            NOT NULL,
    [HRCaseID]           INT            NOT NULL,
    [HRCaseStatusTypeID] INT            NULL,
    [HRCaseMeetingID]    INT            NULL,
    [HRCaseEventID]      INT            NULL,
    [RelatedUserIDList]  NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([HRCaseTaskID] ASC),
    CONSTRAINT [FK_HRCaseTask_HRCase] FOREIGN KEY ([HRCaseID]) REFERENCES [V7].[HRCase] ([HRCaseID]),
    CONSTRAINT [FK_HRCaseTask_HRCaseEvent] FOREIGN KEY ([HRCaseEventID]) REFERENCES [V7].[HRCaseEvent] ([HRCaseEventID]),
    CONSTRAINT [FK_HRCaseTask_HRCaseMeeting] FOREIGN KEY ([HRCaseMeetingID]) REFERENCES [V7].[HRCaseMeeting] ([HRCaseMeetingID]),
    CONSTRAINT [FK_HRCaseTask_HRCaseStatusType] FOREIGN KEY ([HRCaseStatusTypeID]) REFERENCES [V7].[HRCaseStatusType] ([HRCaseStatusTypeID]),
    CONSTRAINT [FK_HRCaseTask_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [CK_HRCaseTask_Unique] UNIQUE NONCLUSTERED ([TaskID] ASC, [HRCaseID] ASC, [HRCaseMeetingID] ASC, [HRCaseEventID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_HRCaseTask_HRCaseID_includes]
    ON [V7].[HRCaseTask]([HRCaseID] ASC)
    INCLUDE([HRCaseTaskID], [TaskID]);

