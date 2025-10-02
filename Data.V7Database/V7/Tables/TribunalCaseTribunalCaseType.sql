CREATE TABLE [V7].[TribunalCaseTribunalCaseType] (
    [TribunalCaseTribunalCaseTypeID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]         INT           NULL,
    [TribunalCaseID]                 INT NOT NULL,
    [TribunalCaseTypeID]             INT NOT NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TribunalCaseTribunalCaseTypeID] ASC),
    CONSTRAINT [FK_TribunalCaseTribunalCaseType_TribunalCase] FOREIGN KEY ([TribunalCaseID]) REFERENCES [V7].[TribunalCase] ([TribunalCaseID]),
    CONSTRAINT [FK_TribunalCaseTribunalCaseType_TribunalCaseType] FOREIGN KEY ([TribunalCaseTypeID]) REFERENCES [V7].[TribunalCaseType] ([TribunalCaseTypeID])
,
    CONSTRAINT [FK_TribunalCaseTribunalCaseType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseTribunalCaseType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseTribunalCaseType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseTribunalCaseType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TribunalCaseTribunalCaseType_TribunalCase]
    ON [V7].[TribunalCaseTribunalCaseType]([TribunalCaseID] ASC)
    INCLUDE([TribunalCaseTribunalCaseTypeID], [TribunalCaseTypeID]);


