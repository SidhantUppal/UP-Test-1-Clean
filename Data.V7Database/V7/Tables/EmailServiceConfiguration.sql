CREATE TABLE [V7].[EmailServiceConfiguration] (
    [EmailServiceConfigurationID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                  INT                NOT NULL,
    [ProviderType]                NVARCHAR (50)      NOT NULL,
    [ConfigurationName]           NVARCHAR (255)     NOT NULL,
    [IsActive]                    BIT                DEFAULT ((1)) NOT NULL,
    [IsDefault]                   BIT                DEFAULT ((0)) NOT NULL,
    [ConfigurationData]           NVARCHAR (MAX)     NOT NULL,
    [FromEmail]                   NVARCHAR (255)     NULL,
    [FromName]                    NVARCHAR (255)     NULL,
    [ReplyToEmail]                NVARCHAR (255)     NULL,
    [TestEmailAddress]            NVARCHAR (255)     NULL,
    [LastTestDate]                DATETIMEOFFSET (7) NULL,
    [LastTestResult]              NVARCHAR (MAX)     NULL,
    [RequiresEncryption]          BIT                DEFAULT ((1)) NOT NULL,
    [MaxDailyEmails]              INT                NULL,
    [CreatedByUserID]             INT                NOT NULL,
    [CreatedDate]                 DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]        INT                NULL,
    [ModifiedDate]            DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]            INT                NULL,
    [ArchivedDate]                DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_EmailServiceConfiguration] PRIMARY KEY CLUSTERED ([EmailServiceConfigurationID] ASC),
    CONSTRAINT [CK_EmailServiceConfiguration_ProviderType] CHECK ([ProviderType]='mailchimp' OR [ProviderType]='gmail' OR [ProviderType]='smtp' OR [ProviderType]='sendgrid' OR [ProviderType]='mailgun' OR [ProviderType]='office365'),
    CONSTRAINT [FK_EmailServiceConfiguration_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmailServiceConfiguration_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmailServiceConfiguration_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmailServiceConfiguration_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_EmailServiceConfiguration_ProviderType]
    ON [V7].[EmailServiceConfiguration]([ProviderType] ASC) WHERE ([ArchivedDate] IS NULL AND [IsActive]=(1));


GO
CREATE NONCLUSTERED INDEX [IX_EmailServiceConfiguration_UserAreaID_IsActive]
    ON [V7].[EmailServiceConfiguration]([UserAreaID] ASC, [IsActive] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_EmailServiceConfiguration_OneDefaultPerTenant]
    ON [V7].[EmailServiceConfiguration]([UserAreaID] ASC) WHERE ([IsDefault]=(1) AND [ArchivedDate] IS NULL);

