CREATE TABLE [Referrer].[ReferrerFriendBenefit] (
    [ReferrerFriendBenefitID] INT            IDENTITY (1, 1) NOT NULL,
    [ReferrerFriendID]        INT            NOT NULL,
    [BenefitTypeID]           INT            NOT NULL,
    [Comments]                NVARCHAR (255) NULL,
    [CreatedDate]             DATETIMEOFFSET (7)       NOT NULL,
    [ModifiedDate]        DATETIMEOFFSET (7)       NULL,
    [ArchivedDate]            DATETIMEOFFSET (7)       NULL,
    PRIMARY KEY CLUSTERED ([ReferrerFriendBenefitID] ASC),
    CONSTRAINT [FK_ReferrerFriendBenefit_BenefitType] FOREIGN KEY ([BenefitTypeID]) REFERENCES [Referrer].[BenefitType] ([BenefitTypeID]),
    CONSTRAINT [FK_ReferrerFriendBenefit_ReferrerFriend] FOREIGN KEY ([ReferrerFriendID]) REFERENCES [Referrer].[ReferrerFriend] ([ReferrerFriendID])
);

