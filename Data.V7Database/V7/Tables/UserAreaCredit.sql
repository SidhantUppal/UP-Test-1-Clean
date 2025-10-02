CREATE TABLE [V7].[UserAreaCredit] (
    [UserAreaCreditID]     INT      IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT      NOT NULL,
    [CreditType]           INT      NOT NULL,
    [AvailableCredits]     INT      NOT NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT      NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [RoleID]               INT      NULL,
    [IsEnabled]            BIT      DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaCreditID] ASC),
    CONSTRAINT [FK_UserAreaCredit_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaCredit_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaCredit_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaCredit_Role] FOREIGN KEY ([RoleID]) REFERENCES [V7].[Role] ([RoleID]),
    CONSTRAINT [FK_UserAreaCredit_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

