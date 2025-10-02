CREATE TABLE [V7].[TaskNote] (
    [TaskNoteID]       INT            IDENTITY (1, 1) NOT NULL,
    [TaskID]           INT            NOT NULL,
    [Notes]            NVARCHAR (MAX) NOT NULL,
    [UserAreaID]       INT            NOT NULL,
    [CreatedByUserID]  INT            NOT NULL,
    [CreatedDate]      DATETIMEOFFSET (7) NOT NULL,
    [ArchivedByUserID] INT            NULL,
    [ArchivedDate]     DATETIMEOFFSET (7) NULL,
    [TaskActivityID]   INT            NULL,
    PRIMARY KEY CLUSTERED ([TaskNoteID] ASC),
    CONSTRAINT [FK_TaskNote_ArchivedByUserID] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskNote_CreatedByUserID] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskNote_TaskActivity] FOREIGN KEY ([TaskActivityID]) REFERENCES [V7].[TaskActivity] ([TaskActivityID]),
    CONSTRAINT [FK_TaskNote_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskNote_TaskID_UserAreaID_ArchivedDate]
    ON [V7].[TaskNote]([TaskID] ASC, [UserAreaID] ASC, [ArchivedDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_TaskNote_UserAreaIDTaskID]
    ON [V7].[TaskNote]([UserAreaID] ASC, [TaskID] ASC)
    INCLUDE([TaskNoteID], [Notes], [CreatedByUserID], [CreatedDate]);

