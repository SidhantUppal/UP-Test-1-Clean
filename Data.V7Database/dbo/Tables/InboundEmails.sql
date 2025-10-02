CREATE TABLE [dbo].[InboundEmails] (
    [Id]           UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [MessageId]    NVARCHAR (255)   NOT NULL,
    [FromAddress]  NVARCHAR (255)   NOT NULL,
    [ToAddress]    NVARCHAR (255)   NOT NULL,
    [Subject]      NVARCHAR (500)   NULL,
    [TextBody]     NVARCHAR (MAX)   NULL,
    [HtmlBody]     NVARCHAR (MAX)   NULL,
    [Headers]      NVARCHAR (MAX)   NULL,
    [Provider]     NVARCHAR (50)    NOT NULL,
    [ProviderData] NVARCHAR (MAX)   NULL,
    [Processed]    BIT              DEFAULT ((0)) NULL,
    [ProcessedAt]  DATETIME2 (7)    NULL,
    [ReceivedAt]   DATETIME2 (7)    DEFAULT (getutcdate()) NULL,
    [CreatedAt]    DATETIME2 (7)    DEFAULT (getutcdate()) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    UNIQUE NONCLUSTERED ([MessageId] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_InboundEmails_FromAddress]
    ON [dbo].[InboundEmails]([FromAddress] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_InboundEmails_Processed]
    ON [dbo].[InboundEmails]([Processed] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_InboundEmails_Provider]
    ON [dbo].[InboundEmails]([Provider] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_InboundEmails_ReceivedAt]
    ON [dbo].[InboundEmails]([ReceivedAt] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_InboundEmails_ToAddress]
    ON [dbo].[InboundEmails]([ToAddress] ASC);

