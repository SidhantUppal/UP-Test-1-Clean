CREATE TABLE [V7].[User] (
    [UserID]               INT                IDENTITY (1, 1) NOT NULL,
    [GUID]                 UNIQUEIDENTIFIER   DEFAULT (newid()) NOT NULL,
    [MasterUserAreaID]     INT                NULL,
    [FullName]             NVARCHAR (255)     NOT NULL,
    [Email]                NVARCHAR (255)     NULL,
    [IsMobileAppUser]      BIT                DEFAULT ((1)) NOT NULL,
    [HasReadDisclaimer]    BIT                DEFAULT ((0)) NOT NULL,
    [IsLocked]             BIT                DEFAULT ((0)) NOT NULL,
    [LockedMessage]        NVARCHAR (255)     NULL,
    [LastLoginDate]        DATETIMEOFFSET (7) NULL,
    [AzureADObjectId]      NVARCHAR (255)     NULL,
    [Username]             NVARCHAR (100)     NULL,
    [PasswordHash]         NVARCHAR (512)     NULL,
    [PasswordSalt]         NVARCHAR (256)     NULL,
    [FailedLoginAttempts]  INT                DEFAULT ((0)) NOT NULL,
    [LastPasswordChange]   DATETIMEOFFSET (7) NULL,
    [EmailVerified]        BIT                DEFAULT ((0)) NOT NULL,
    [TwoFactorEnabled]     BIT                DEFAULT ((0)) NOT NULL,
    [LastLoginAt]          DATETIMEOFFSET (7) NULL,
    [IPAddress]            NVARCHAR (45)      NULL,
    [CreatedByUserID]      INT                NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserID] ASC),
    CONSTRAINT [FK_User_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_User_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_User_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_User_UserArea] FOREIGN KEY ([MasterUserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_V7User_Guid]
    ON [V7].[User]([GUID] ASC)
    INCLUDE([UserID]);

GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_User_AzureADObjectId] 
    ON [V7].[User]([AzureADObjectId] ASC) 
    WHERE [AzureADObjectId] IS NOT NULL;

GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_User_Username] 
    ON [V7].[User]([Username] ASC) 
    WHERE [Username] IS NOT NULL;

GO
CREATE NONCLUSTERED INDEX [IX_User_Email]
    ON [V7].[User]([Email] ASC)
    INCLUDE([UserID], [FullName]);

