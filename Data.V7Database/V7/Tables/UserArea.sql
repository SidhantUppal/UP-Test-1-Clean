CREATE TABLE [V7].[UserArea] (
    [UserAreaID]                  INT                IDENTITY (1, 1) NOT NULL,
    [ThemeTypeID]                 INT                DEFAULT (1) NOT NULL,
    [GUID]                        UNIQUEIDENTIFIER   DEFAULT (newid()) NOT NULL,
    [Title]                       NVARCHAR (255)     NOT NULL,
    [Description]                 NVARCHAR (MAX)     NULL,
    [Prefix]                      NVARCHAR (10)      NULL,
    [IsDemo]                      BIT                DEFAULT ((0)) NOT NULL,
    [ExpiryDate]                  DATE               NULL,
    [BaseURL]                     NVARCHAR (255)     NULL,
    [SSOLoginURL]                 NVARCHAR (255)     NULL,
    [MobileIdentityAPIInstanceID] INT                NULL,
    [UploadedFileMBLimit]         INT                NULL,
    [CreatedByUserID]             INT                NOT NULL,
    [CreatedDate]                 DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]        INT                NULL,
    [ModifiedDate]            DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]            INT                NULL,
    [ArchivedDate]                DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaID] ASC),
    CONSTRAINT [FK_UserArea_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserArea_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserArea_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserArea_ThemeType] FOREIGN KEY ([ThemeTypeID]) REFERENCES [V7].[ThemeType] ([ThemeTypeID]),
    CONSTRAINT [CK_UserArea_Title] UNIQUE NONCLUSTERED ([Title] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_V7UserArea_Guid]
    ON [V7].[UserArea]([GUID] ASC)
    INCLUDE([UserAreaID]);

