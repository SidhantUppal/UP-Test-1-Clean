CREATE TABLE [V7].[Competency] (
    [CompetencyID]         INT           IDENTITY (1, 1) NOT NULL,
    [Reference]            NVARCHAR (50) NULL,
    [UserAreaID]           INT           NULL,
    [CreatedByUserID]      INT           NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT           NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT           NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [CategoryID]           INT           NULL,
    [IsGlobal]             BIT           DEFAULT ((1)) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([CompetencyID] ASC),
    CONSTRAINT [FK_Competency_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Competency_Category] FOREIGN KEY ([CategoryID]) REFERENCES [V7].[Category] ([CategoryID]),
    CONSTRAINT [FK_Competency_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Competency_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Competency_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

