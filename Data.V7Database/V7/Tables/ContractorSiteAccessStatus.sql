CREATE TABLE [V7].[ContractorSiteAccessStatus] (
    [ContractorSiteAccessStatusID] INT            IDENTITY (1, 1) NOT NULL,
    [ContractorSiteAccessID]       INT            NOT NULL,
    [GenericStatusTypeID]          INT            NOT NULL,
    [Comments]                     NVARCHAR (255) NULL,
    [CreatedByUserID]              INT            NOT NULL,
    [CreatedDate]                  DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]             INT            NULL,
    [ModifiedDate]             DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]             INT            NULL,
    [ArchivedDate]                 DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ContractorSiteAccessStatusID] ASC),
    CONSTRAINT [FK_ContractorSiteAccessStatus_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContractorSiteAccessStatus_ContractorSiteAccess] FOREIGN KEY ([ContractorSiteAccessID]) REFERENCES [V7].[ContractorSiteAccess] ([ContractorSiteAccessID]),
    CONSTRAINT [FK_ContractorSiteAccessStatus_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContractorSiteAccessStatus_GenericStatusType] FOREIGN KEY ([GenericStatusTypeID]) REFERENCES [V7].[GenericStatusType] ([GenericStatusTypeID]),
    CONSTRAINT [FK_ContractorSiteAccessStatus_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

