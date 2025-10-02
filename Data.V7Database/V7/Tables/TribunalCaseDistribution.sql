CREATE TABLE [V7].[TribunalCaseDistribution] (
    [TribunalCaseDistributionID] INT            IDENTITY (1, 1) NOT NULL,
    [TribunalCaseID]             INT            NOT NULL,
    [UserAreaID]                 INT            NOT NULL,
    [UserID]                     INT            NULL,
    [RecipientName]              NVARCHAR (150) NOT NULL,
    [RecipientEmail]             NVARCHAR (255) NULL,
    [HasBeenPosted]              BIT            DEFAULT ((0)) NOT NULL,
    [HasBeenEmailed]             BIT            DEFAULT ((0)) NOT NULL,
    [HasConfirmedReceipt]        BIT            DEFAULT ((0)) NOT NULL,
    [PostedDate]                 DATETIMEOFFSET (7) NULL,
    [EmailedDate]                DATETIMEOFFSET (7) NULL,
    [ReceiptDate]                DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]            INT            NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([TribunalCaseDistributionID] ASC),
    CONSTRAINT [FK_TribunalCaseDistribution_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseDistribution_TribunalCase] FOREIGN KEY ([TribunalCaseID]) REFERENCES [V7].[TribunalCase] ([TribunalCaseID]),
    CONSTRAINT [FK_TribunalCaseDistribution_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseDistribution_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

