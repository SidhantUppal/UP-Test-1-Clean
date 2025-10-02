CREATE TABLE [V7].[ContractorSiteAccessPersonnel] (
    [ContractorSiteAccessPersonnelID] INT            IDENTITY (1, 1) NOT NULL,
    [ContractorSiteAccessID]          INT            NOT NULL,
    [EmployeeID]                      INT            NULL,
    [AltPersonName]                   NVARCHAR (100) NULL,
    [AltPersonEmail]                  NVARCHAR (255) NULL,
    [HasArrived]                      BIT            DEFAULT ((0)) NOT NULL,
    [HasAuthorisation]                BIT            DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]                 INT            NOT NULL,
    [CreatedDate]                     DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]                INT            NULL,
    [ModifiedDate]                DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]                INT            NULL,
    [ArchivedDate]                    DATETIMEOFFSET (7) NULL,
    [IsAuthorisationOverridden]       BIT            DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([ContractorSiteAccessPersonnelID] ASC),
    CONSTRAINT [FK_ContractorSiteAccessPersonnel_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContractorSiteAccessPersonnel_ContractorSiteAccess] FOREIGN KEY ([ContractorSiteAccessID]) REFERENCES [V7].[ContractorSiteAccess] ([ContractorSiteAccessID]),
    CONSTRAINT [FK_ContractorSiteAccessPersonnel_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContractorSiteAccessPersonnel_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_ContractorSiteAccessPersonnel_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

