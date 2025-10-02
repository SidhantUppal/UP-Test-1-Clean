CREATE TABLE [V7].[DocumentBundle] (
    [BundleID]                  INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                INT                NOT NULL,
    [BundleName]                NVARCHAR (255)     NOT NULL,
    [Description]               NVARCHAR (MAX)     NULL,
    [Category]                  NVARCHAR (100)     NULL,
    [BundleType]                NVARCHAR (50)      DEFAULT ('Standard') NOT NULL,
    [RequiresSequentialSigning] BIT                DEFAULT ((0)) NOT NULL,
    [AllowBulkSign]             BIT                DEFAULT ((1)) NOT NULL,
    [ValidityDays]              INT                NULL,
    [IsActive]                  BIT                DEFAULT ((1)) NOT NULL,
    [Tags]                      NVARCHAR (MAX)     NULL,
    [Metadata]                  NVARCHAR (MAX)     NULL,
    [CreatedByUserID]           INT                NOT NULL,
    [CreatedDate]               DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]      INT                NULL,
    [ModifiedDate]          DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]          INT                NULL,
    [ArchivedDate]              DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_DocumentBundle] PRIMARY KEY CLUSTERED ([BundleID] ASC),
    CONSTRAINT [FK_DocumentBundle_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentBundle_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentBundle_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentBundle_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentBundle_Category]
    ON [V7].[DocumentBundle]([Category] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentBundle_IsActive]
    ON [V7].[DocumentBundle]([IsActive] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentBundle_UserAreaID]
    ON [V7].[DocumentBundle]([UserAreaID] ASC) WHERE ([ArchivedDate] IS NULL);

