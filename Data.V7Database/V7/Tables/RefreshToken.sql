CREATE TABLE [V7].[RefreshToken] (
    [RefreshTokenID]       INT                IDENTITY (1, 1) NOT NULL,
    [GUID]                 UNIQUEIDENTIFIER   DEFAULT (newid()) NOT NULL,
    [UserID]               INT                NOT NULL,
    [TokenHash]            NVARCHAR (512)     NOT NULL,
    [JwtTokenId]           NVARCHAR (100)     NULL, -- JTI claim from original JWT
    [IsActive]             BIT                DEFAULT ((1)) NOT NULL,
    [ExpiresAt]            DATETIMEOFFSET (7) NOT NULL,
    [CreatedAt]            DATETIMEOFFSET (7) NOT NULL,
    [UsedAt]               DATETIMEOFFSET (7) NULL,
    [RevokedAt]            DATETIMEOFFSET (7) NULL,
    [RevokedReason]        NVARCHAR (255)     NULL,
    [IPAddress]            NVARCHAR (45)      NULL,
    [UserAgent]            NVARCHAR (500)     NULL,
    [CreatedByUserID]      INT                NULL,
    PRIMARY KEY CLUSTERED ([RefreshTokenID] ASC),
    CONSTRAINT [FK_RefreshToken_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RefreshToken_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID])
);

GO
CREATE NONCLUSTERED INDEX [IX_RefreshToken_User_Active]
    ON [V7].[RefreshToken]([UserID] ASC, [IsActive] ASC)
    INCLUDE([ExpiresAt], [TokenHash]);

GO
CREATE NONCLUSTERED INDEX [IX_RefreshToken_TokenHash]
    ON [V7].[RefreshToken]([TokenHash] ASC)
    INCLUDE([UserID], [IsActive], [ExpiresAt]);

GO
CREATE NONCLUSTERED INDEX [IX_RefreshToken_Cleanup]
    ON [V7].[RefreshToken]([ExpiresAt] ASC, [IsActive] ASC)
    WHERE [IsActive] = 0;