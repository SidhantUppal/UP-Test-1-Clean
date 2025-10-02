CREATE TABLE [V7].[TribunalCaseCounsel] (
    [TribunalCaseCounselID] INT      IDENTITY (1, 1) NOT NULL,
    [TribunalCaseID]        INT      NOT NULL,
    [CounselID]             INT      NOT NULL,
    [AssignedToCaseDate]    DATETIMEOFFSET (7) NULL,
    [HasAccessToCase]       BIT      DEFAULT ((0)) NOT NULL,
    [UserAreaID]            INT      NULL,
    [CreatedByUserID]       INT      NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]  INT      NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT      NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TribunalCaseCounselID] ASC),
    CONSTRAINT [FK_TribunalCaseCounsel_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseCounsel_Counsel] FOREIGN KEY ([CounselID]) REFERENCES [V7].[Counsel] ([CounselID]),
    CONSTRAINT [FK_TribunalCaseCounsel_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseCounsel_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseCounsel_TribunalCase] FOREIGN KEY ([TribunalCaseID]) REFERENCES [V7].[TribunalCase] ([TribunalCaseID]),
    CONSTRAINT [FK_TribunalCaseCounsel_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

