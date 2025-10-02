CREATE TABLE [V7].[BCARMClient] (
    [BCARMClientID]           INT      IDENTITY (1, 1) NOT NULL,
    [BCARMUserAreaInternalID] INT      NOT NULL,
    [IsV5Client]              BIT      CONSTRAINT [DF__BCARMClie__IsV5C__52C4E7BA] DEFAULT ((0)) NOT NULL,
    [HasNewDesign]            BIT      CONSTRAINT [DF__BCARMClie__HasNe__7CE60A0F] DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__BCARMCli__A13ACE1CF30E4084] PRIMARY KEY CLUSTERED ([BCARMClientID] ASC),
    CONSTRAINT [UQ__BCARMCli__552D9ED8F0EA5C01] UNIQUE NONCLUSTERED ([BCARMUserAreaInternalID] ASC),
    CONSTRAINT [FK_BCARMClient_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BCARMClient_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BCARMClient_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

