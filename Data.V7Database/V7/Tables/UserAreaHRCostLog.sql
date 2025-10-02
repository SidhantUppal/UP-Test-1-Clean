CREATE TABLE [V7].[UserAreaHRCostLog] (
    [UserAreaHRCostLogID]     INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]              INT            NOT NULL,
    [BaseRateAnnualCostGBP]   DECIMAL (8, 2) NOT NULL,
    [UserRateAnnualCostGBP]   DECIMAL (8, 2) NOT NULL,
    [TotalPurchasedEmployees] INT            NOT NULL,
    [TotalActualEmployees]    INT            NOT NULL,
    [TotalPurchasedUsers]     INT            NOT NULL,
    [TotalActualUsers]        INT            NOT NULL,
    [ProductLevel]            TINYINT        NOT NULL,
    [CreatedByUserID]         INT            NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaHRCostLogID] ASC),
    CONSTRAINT [FK_UserAreaHRCostLog_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaHRCostLog_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

