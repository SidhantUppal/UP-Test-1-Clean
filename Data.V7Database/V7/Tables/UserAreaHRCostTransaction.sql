CREATE TABLE [V7].[UserAreaHRCostTransaction] (
    [UserAreaHRCostTransactionID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaHRCostLogID]         INT            NOT NULL,
    [UserAreaID]                  INT            NOT NULL,
    [TransactionDate]             DATE           NOT NULL,
    [TransactionAmountGBP]        DECIMAL (8, 2) NOT NULL,
    [TransactionType]             TINYINT        NOT NULL,
    [NewEmployeesAdded]           INT            NULL,
    [NewUsersAdded]               INT            NULL,
    [Note]                        NVARCHAR (255) NULL,
    [CreatedByUserID]             INT            NOT NULL,
    [CreatedDate]                 DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]        INT            NULL,
    [ModifiedDate]            DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]            INT            NULL,
    [ArchivedDate]                DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaHRCostTransactionID] ASC),
    CONSTRAINT [FK_UserAreaHRCostTransaction_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaHRCostTransaction_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaHRCostTransaction_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaHRCostTransaction_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_UserAreaHRCostTransaction_UserAreaHRCostLog] FOREIGN KEY ([UserAreaHRCostLogID]) REFERENCES [V7].[UserAreaHRCostLog] ([UserAreaHRCostLogID])
);

