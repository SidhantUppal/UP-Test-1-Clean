CREATE TABLE [V7].[UserAreaHRCost] (
    [UserAreaHRCostID]        INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]              INT            NOT NULL,
    [HRCostBaseRateID]        INT            NOT NULL,
    [HRCostUserRateID]        INT            NOT NULL,
    [TotalPurchasedEmployees] INT            NOT NULL,
    [TotalPurchasedUsers]     INT            NOT NULL,
    [ProductLevel]            TINYINT        NOT NULL,
    [Comments]                NVARCHAR (MAX) NULL,
    [CreatedByUserID]         INT            NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]    INT            NULL,
    [ModifiedDate]        DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaHRCostID] ASC),
    CONSTRAINT [FK_UserAreaHRCost_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaHRCost_HRCostBaseRate] FOREIGN KEY ([HRCostBaseRateID]) REFERENCES [V7].[HRCostBaseRate] ([HRCostBaseRateID]),
    CONSTRAINT [FK_UserAreaHRCost_HRCostUserRate] FOREIGN KEY ([HRCostUserRateID]) REFERENCES [V7].[HRCostUserRate] ([HRCostUserRateID]),
    CONSTRAINT [FK_UserAreaHRCost_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaHRCost_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [CK_UserAreaHRCost_UserArea] UNIQUE NONCLUSTERED ([UserAreaID] ASC)
);

