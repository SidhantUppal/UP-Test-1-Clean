CREATE TABLE [Referrer].[ReferrerUserBenefit] (
    [ReferrerUserBenefitID] INT            IDENTITY (1, 1) NOT NULL,
    [ReferrerUserID]        INT            NOT NULL,
    [BenefitTypeID]         INT            NOT NULL,
    [CharityDetails]        NVARCHAR (150) NULL,
    [GiftCardDetails]       NVARCHAR (150) NULL,
    [CreatedDate]           DATETIMEOFFSET (7)       NOT NULL,
    [ModifiedDate]      DATETIMEOFFSET (7)       NULL,
    [ArchivedDate]          DATETIMEOFFSET (7)       NULL,
    PRIMARY KEY CLUSTERED ([ReferrerUserBenefitID] ASC),
    CONSTRAINT [FK_ReferrerUserBenefit_BenefitType] FOREIGN KEY ([BenefitTypeID]) REFERENCES [Referrer].[BenefitType] ([BenefitTypeID]),
    CONSTRAINT [FK_ReferrerUserBenefit_ReferrerUser] FOREIGN KEY ([ReferrerUserID]) REFERENCES [Referrer].[ReferrerUser] ([ReferrerUserID])
);

