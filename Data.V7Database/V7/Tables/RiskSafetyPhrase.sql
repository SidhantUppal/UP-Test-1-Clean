CREATE TABLE [V7].[RiskSafetyPhrase] (
    [RiskSafetyPhraseID]   INT           IDENTITY (1, 1) NOT NULL,
    [IsRiskPhrase]         BIT           NOT NULL,
    [Reference]            VARCHAR (30)  NULL,
    [UserAreaID]           INT           NULL,
    [CreatedByUserID]      INT           NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT           NULL,
    [ArchivedByUserID]     INT           NULL,
    [temptitle]            NVARCHAR (50) NULL,
    [Title] NVARCHAR (255) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RiskSafetyPhraseID] ASC),
    CONSTRAINT [FK_RiskSafetyPhrase_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskSafetyPhrase_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskSafetyPhrase_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RiskSafetyPhrase_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

