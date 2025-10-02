CREATE TABLE [V7].[CompanyInsurance] (
    [CompanyInsuranceID] INT            IDENTITY (1, 1) NOT NULL,
    [CompanyID]          INT            NOT NULL,
    [PolicyName]         NVARCHAR (255) NOT NULL,
    [PolicyNumber]       NVARCHAR (255) NULL,
    [RenewalDate]        DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CompanyInsuranceID] ASC),
    CONSTRAINT [FK_CompanyInsurance_CompanyID] FOREIGN KEY ([CompanyID]) REFERENCES [V7].[Company] ([CompanyID])
);

