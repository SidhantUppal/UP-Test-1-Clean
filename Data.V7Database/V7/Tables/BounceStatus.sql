CREATE TABLE [V7].[BounceStatus] (
    [BounceStatusID]       INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [EmailAddress]         NVARCHAR (255)     NOT NULL,
    [UserID]               INT                NULL,
    [BounceType]           NVARCHAR (50)      NOT NULL,
    [BounceReason]         NVARCHAR (MAX)     NULL,
    [FirstBounceDate]      DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [LastBounceDate]       DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [BounceCount]          INT                DEFAULT ((1)) NOT NULL,
    [OooReturnDate]        DATETIMEOFFSET (7) NULL,
    [OooMessage]           NVARCHAR (MAX)     NULL,
    [IsActive]             BIT                DEFAULT ((1)) NOT NULL,
    [ResolvedDate]         DATETIMEOFFSET (7) NULL,
    [ResolvedByUserID]     INT                NULL,
    [InboundEmailID]       INT                NULL,
    [LlmAnalysis]          NVARCHAR (MAX)     NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_BounceStatus] PRIMARY KEY CLUSTERED ([BounceStatusID] ASC),
    CONSTRAINT [FK_BounceStatus_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BounceStatus_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BounceStatus_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BounceStatus_ResolvedBy] FOREIGN KEY ([ResolvedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BounceStatus_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BounceStatus_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_BounceStatus_UserAreaID_EmailAddress_IsActive]
    ON [V7].[BounceStatus]([UserAreaID] ASC, [EmailAddress] ASC, [IsActive] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_BounceStatus_UserID_IsActive]
    ON [V7].[BounceStatus]([UserID] ASC, [IsActive] ASC) WHERE ([ArchivedDate] IS NULL);

