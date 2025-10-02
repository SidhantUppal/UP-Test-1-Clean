CREATE TABLE [V7].[Contractor] (
    [ContractorID]         INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [CompanyName]          NVARCHAR (255)     NOT NULL,
    [ContactPersonName]    NVARCHAR (255)     NOT NULL,
    [Email]                NVARCHAR (255)     NOT NULL,
    [Phone]                NVARCHAR (50)      NULL,
    [StreetAddress]        NVARCHAR (500)     NULL,
    [City]                 NVARCHAR (100)     NULL,
    [State]                NVARCHAR (50)      NULL,
    [PostalCode]           NVARCHAR (20)      NULL,
    [Country]              NVARCHAR (100)     DEFAULT ('United States') NULL,
    [LicenseNumber]        NVARCHAR (100)     NULL,
    [InsuranceExpiryDate]  DATETIMEOFFSET (7) NULL,
    [CertificationLevel]   NVARCHAR (50)      DEFAULT ('Standard') NULL,
    [SpecialtyAreas]       NVARCHAR (500)     NULL,
    [Status]               NVARCHAR (50)      DEFAULT ('Active') NULL,
    [IsActive]             BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]     INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ContractorID] ASC),
    CONSTRAINT [FK_Contractor_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Contractor_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Contractor_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Contractor_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_Contractor_CompanyName]
    ON [V7].[Contractor]([UserAreaID] ASC, [CompanyName] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Contractor_Email]
    ON [V7].[Contractor]([UserAreaID] ASC, [Email] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Contractor_Status]
    ON [V7].[Contractor]([Status] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Contractor_UserAreaID]
    ON [V7].[Contractor]([UserAreaID] ASC);

