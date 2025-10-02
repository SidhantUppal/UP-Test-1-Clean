CREATE TABLE [V7].[ContractorSiteAccessSignOff] (
    [ContractorSiteAccessSignOffID]     INT            IDENTITY (1, 1) NOT NULL,
    [ContractorSiteAccessID]            INT            NOT NULL,
    [ContractorSiteAccessRequirementID] INT            NULL,
    [AccessDate]                        DATETIMEOFFSET (7) NOT NULL,
    [IsContractor]                      BIT            DEFAULT ((0)) NOT NULL,
    [IsSignOut]                         BIT            DEFAULT ((0)) NOT NULL,
    [SignatureText]                     NVARCHAR (MAX) NULL,
    [SignatureDate]                     DATETIMEOFFSET (7) NULL,
    [LoggedInUserID]                    INT            NULL,
    PRIMARY KEY CLUSTERED ([ContractorSiteAccessSignOffID] ASC),
    CONSTRAINT [FK_ContractorSiteAccessSignOff_ContractorSiteAccess] FOREIGN KEY ([ContractorSiteAccessID]) REFERENCES [V7].[ContractorSiteAccess] ([ContractorSiteAccessID]),
    CONSTRAINT [FK_ContractorSiteAccessSignOff_ContractorSiteAccessRequirement] FOREIGN KEY ([ContractorSiteAccessRequirementID]) REFERENCES [V7].[ContractorSiteAccessRequirement] ([ContractorSiteAccessRequirementID]),
    CONSTRAINT [FK_ContractorSiteAccessSignOff_LoggedInUser] FOREIGN KEY ([LoggedInUserID]) REFERENCES [V7].[User] ([UserID])
);

