CREATE TABLE [V7].[ContractorCompliance] (
    [ComplianceID]         INT                IDENTITY (1, 1) NOT NULL,
    [ContractorID]         INT                NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [ComplianceType]       NVARCHAR (100)     NOT NULL,
    [ComplianceStatus]     NVARCHAR (50)      NOT NULL,
    [ExpiryDate]           DATETIMEOFFSET (7) NULL,
    [DocumentPath]         NVARCHAR (500)     NULL,
    [Notes]                NVARCHAR (MAX)     NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedByUserID]     INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ComplianceID] ASC),
    CONSTRAINT [FK_ContractorCompliance_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ContractorCompliance_ContractorID]
    ON [V7].[ContractorCompliance]([ContractorID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_ContractorCompliance_ExpiryDate]
    ON [V7].[ContractorCompliance]([ExpiryDate] ASC);

