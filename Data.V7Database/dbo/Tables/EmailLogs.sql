CREATE TABLE [dbo].[EmailLogs] (
    [Id]           UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [ToAddress]    NVARCHAR (1000)  NOT NULL,
    [FromAddress]  NVARCHAR (255)   NOT NULL,
    [Subject]      NVARCHAR (500)   NOT NULL,
    [Provider]     NVARCHAR (50)    NOT NULL,
    [MessageId]    NVARCHAR (255)   NULL,
    [Status]       NVARCHAR (50)    NOT NULL,
    [ErrorMessage] NVARCHAR (MAX)   NULL,
    [CreatedAt]    DATETIME2 (7)    DEFAULT (getutcdate()) NULL,
    [SentAt]       DATETIME2 (7)    NULL,
    [DeliveredAt]  DATETIME2 (7)    NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_EmailLogs_CreatedAt]
    ON [dbo].[EmailLogs]([CreatedAt] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_EmailLogs_Provider]
    ON [dbo].[EmailLogs]([Provider] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_EmailLogs_Status]
    ON [dbo].[EmailLogs]([Status] ASC);

