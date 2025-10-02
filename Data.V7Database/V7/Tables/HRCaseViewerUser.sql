CREATE TABLE [V7].[HRCaseViewerUser] (
    [HRCaseViewerUserID] INT      IDENTITY (1, 1) NOT NULL,
    [HRCaseID]           INT      NOT NULL,
    [UserAreaID]         INT      NOT NULL,
    [UserID]             INT      NOT NULL,
    [CreatedByUserID]    INT      NULL,
    [CreatedDate]        DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HRCaseViewerUserID] ASC),
    CONSTRAINT [FK_HRCaseViewerUser_HRCase] FOREIGN KEY ([HRCaseID]) REFERENCES [V7].[HRCase] ([HRCaseID]),
    CONSTRAINT [FK_HRCaseViewerUser_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseViewerUser_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

