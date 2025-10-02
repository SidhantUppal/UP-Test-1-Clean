CREATE TABLE [V7].[CaseAssignableUser] (
    [CaseAssignableUserID] INT      IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT      NULL,
    [UserID]               INT      NOT NULL,
    [CaseUserTypeID]       INT      NOT NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CaseAssignableUserID] ASC),
    CONSTRAINT [FK_CaseAssignableUser_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CaseAssignableUser_CaseUserType] FOREIGN KEY ([CaseUserTypeID]) REFERENCES [V7].[CaseUserType] ([CaseUserTypeID]),
    CONSTRAINT [FK_CaseAssignableUser_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CaseAssignableUser_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CaseAssignableUser_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

