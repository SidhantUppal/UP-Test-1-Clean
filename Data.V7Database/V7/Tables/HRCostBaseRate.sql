CREATE TABLE [V7].[HRCostBaseRate] (
    [HRCostBaseRateID]   INT            IDENTITY (1, 1) NOT NULL,
    [Tier1AnnualCostGBP] DECIMAL (8, 2) NOT NULL,
    [Tier2AnnualCostGBP] DECIMAL (8, 2) NOT NULL,
    [Tier3AnnualCostGBP] DECIMAL (8, 2) NOT NULL,
    [CreatedByUserID]    INT            NOT NULL,
    [CreatedDate]        DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([HRCostBaseRateID] ASC),
    CONSTRAINT [FK_HRCostBaseRate_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID])
);

