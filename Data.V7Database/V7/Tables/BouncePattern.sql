CREATE TABLE [V7].[BouncePattern] (
    [BouncePatternID]      INT                IDENTITY (1, 1) NOT NULL,
    [PatternName]          NVARCHAR (100)     NOT NULL,
    [SubjectPattern]       NVARCHAR (500)     NULL,
    [BodyPattern]          NVARCHAR (500)     NULL,
    [SenderPattern]        NVARCHAR (500)     NULL,
    [PatternType]          NVARCHAR (50)      NOT NULL,
    [IsActive]             BIT                DEFAULT ((1)) NOT NULL,
    [Priority]             INT                DEFAULT ((100)) NOT NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_BouncePattern] PRIMARY KEY CLUSTERED ([BouncePatternID] ASC),
    CONSTRAINT [FK_BouncePattern_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BouncePattern_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BouncePattern_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_BouncePattern_PatternType_IsActive]
    ON [V7].[BouncePattern]([PatternType] ASC, [IsActive] ASC) WHERE ([ArchivedDate] IS NULL);

