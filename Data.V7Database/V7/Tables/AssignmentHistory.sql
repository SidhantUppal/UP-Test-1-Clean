CREATE TABLE [V7].[AssignmentHistory] (
    [HistoryID]         INT                IDENTITY (1, 1) NOT NULL,
    [AssignmentID]      INT                NOT NULL,
    [Action]            NVARCHAR (100)     NOT NULL,
    [PerformedByUserID] INT                NOT NULL,
    [ActionDate]        DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [OldStatus]         NVARCHAR (50)      NULL,
    [NewStatus]         NVARCHAR (50)      NULL,
    [Notes]             NVARCHAR (MAX)     NULL,
    [IPAddress]         NVARCHAR (50)      NULL,
    [Metadata]          NVARCHAR (MAX)     NULL,
    CONSTRAINT [PK_AssignmentHistory] PRIMARY KEY CLUSTERED ([HistoryID] ASC),
    CONSTRAINT [FK_AssignmentHistory_Assignment] FOREIGN KEY ([AssignmentID]) REFERENCES [V7].[DocumentAssignment] ([AssignmentID]),
    CONSTRAINT [FK_AssignmentHistory_PerformedBy] FOREIGN KEY ([PerformedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AssignmentHistory_ActionDate]
    ON [V7].[AssignmentHistory]([ActionDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_AssignmentHistory_AssignmentID]
    ON [V7].[AssignmentHistory]([AssignmentID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_AssignmentHistory_PerformedByUserID]
    ON [V7].[AssignmentHistory]([PerformedByUserID] ASC);

