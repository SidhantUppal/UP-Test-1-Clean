CREATE TABLE [V7].[SafeSystemOfWorkLog] (
    [SafeSystemOfWorkLogID]     INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                INT            NOT NULL,
    [SafeSystemOfWorkID]        INT            NOT NULL,
    [SafeSystemOfWorkLogTypeID] INT            NOT NULL,
    [Comments]                  NVARCHAR (255) NULL,
    [LoggedDate]                DATETIMEOFFSET (7) NOT NULL,
    [LoggedByUserID]            INT            NOT NULL,
    [LoggedByFullName]          NVARCHAR (100) NULL,
    [LoggedByJobTitle]          NVARCHAR (100) NULL,
    [LoggedBySignature]         NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([SafeSystemOfWorkLogID] ASC),
    CONSTRAINT [FK_SafeSystemOfWorkLog_SafeSystemOfWork] FOREIGN KEY ([SafeSystemOfWorkID]) REFERENCES [V7].[SafeSystemOfWork] ([SafeSystemOfWorkID]),
    CONSTRAINT [FK_SafeSystemOfWorkLog_SafeSystemOfWorkLogType] FOREIGN KEY ([SafeSystemOfWorkLogTypeID]) REFERENCES [V7].[SafeSystemOfWorkLogType] ([SafeSystemOfWorkLogTypeID]),
    CONSTRAINT [FK_SafeSystemOfWorkLog_User] FOREIGN KEY ([LoggedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SafeSystemOfWorkLog_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

