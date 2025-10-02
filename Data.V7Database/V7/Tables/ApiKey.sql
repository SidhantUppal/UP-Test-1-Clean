CREATE TABLE [V7].[ApiKey] (
    [ApiKeyID]             INT                IDENTITY (1, 1) NOT NULL,
    [GUID]                 UNIQUEIDENTIFIER   DEFAULT (newid()) NOT NULL,
    [UserID]               INT                NOT NULL,
    [KeyName]              NVARCHAR (255)     NOT NULL,
    [KeyHash]              NVARCHAR (512)     NOT NULL,
    [KeyPrefix]            NVARCHAR (20)      NOT NULL,
    [Scopes]               NVARCHAR (1000)    NULL,
    [IsActive]             BIT                DEFAULT ((1)) NOT NULL,
    [ExpiresAt]            DATETIMEOFFSET (7) NULL,
    [LastUsedAt]           DATETIMEOFFSET (7) NULL,
    [UsageCount]           INT                DEFAULT ((0)) NOT NULL,
    [IPRestrictions]       NVARCHAR (500)     NULL,
    [RateLimitRequests]    INT                DEFAULT ((1000)) NOT NULL,
    [RateLimitWindow]      INT                DEFAULT ((3600)) NOT NULL, -- seconds
    [CreatedByUserID]      INT                NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ApiKeyID] ASC),
    CONSTRAINT [FK_ApiKey_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ApiKey_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ApiKey_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ApiKey_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID])
);

GO
CREATE NONCLUSTERED INDEX [IX_ApiKey_KeyPrefix]
    ON [V7].[ApiKey]([KeyPrefix] ASC)
    INCLUDE([ApiKeyID], [UserID], [IsActive]);

GO
CREATE NONCLUSTERED INDEX [IX_ApiKey_User_Active]
    ON [V7].[ApiKey]([UserID] ASC, [IsActive] ASC)
    INCLUDE([KeyName], [ExpiresAt]);

GO
CREATE NONCLUSTERED INDEX [IX_ApiKey_Active_NotExpired]
    ON [V7].[ApiKey]([IsActive] ASC)
    INCLUDE([ApiKeyID], [UserID], [ExpiresAt])
    WHERE [IsActive] = 1;