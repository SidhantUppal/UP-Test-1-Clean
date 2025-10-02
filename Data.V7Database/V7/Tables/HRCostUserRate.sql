CREATE TABLE [V7].[HRCostUserRate] (
    [HRCostUserRateID]    INT            IDENTITY (1, 1) NOT NULL,
    [Level1AnnualCostGBP] DECIMAL (8, 2) NOT NULL,
    [Level2AnnualCostGBP] DECIMAL (8, 2) NOT NULL,
    [Level3AnnualCostGBP] DECIMAL (8, 2) NOT NULL,
    [CreatedByUserID]     INT            NOT NULL,
    [CreatedDate]         DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([HRCostUserRateID] ASC),
    CONSTRAINT [FK_HRCostUserRate_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID])
);

