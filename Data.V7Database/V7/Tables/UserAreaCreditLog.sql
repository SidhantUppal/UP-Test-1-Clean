CREATE TABLE [V7].[UserAreaCreditLog] (
    [UserAreaCreditLogID]  INT             IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT             NOT NULL,
    [UserAreaCreditID]     INT             NOT NULL,
    [Credits]              INT             NOT NULL,
    [Operation]            BIT             NOT NULL,
    [Notes]                NVARCHAR (1024) NULL,
    [CreatedByUserID]      INT             NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT             NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT             NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [RoleID]               INT             NULL,
    [IsEnabled]            BIT             DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaCreditLogID] ASC),
    CONSTRAINT [FK_UserAreaCreditLog_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaCreditLog_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaCreditLog_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaCreditLog_Role] FOREIGN KEY ([RoleID]) REFERENCES [V7].[Role] ([RoleID]),
    CONSTRAINT [FK_UserAreaCreditLog_UserAreaCreditID] FOREIGN KEY ([UserAreaCreditID]) REFERENCES [V7].[UserAreaCredit] ([UserAreaCreditID]),
    CONSTRAINT [FK_UserAreaCreditLog_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

