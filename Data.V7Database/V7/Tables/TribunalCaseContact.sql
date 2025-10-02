CREATE TABLE [V7].[TribunalCaseContact] (
    [TribunalCaseContactID] INT      IDENTITY (1, 1) NOT NULL,
    [TribunalCaseID]        INT      NOT NULL,
    [ContactID]             INT      NOT NULL,
    [UserID]                INT      NOT NULL,
    [UserAreaID]            INT      NOT NULL,
    [CreatedByUserID]       INT      NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]  INT      NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT      NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TribunalCaseContactID] ASC),
    CONSTRAINT [FK_TribunalCaseContact_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseContact_Contact] FOREIGN KEY ([ContactID]) REFERENCES [V7].[Contact] ([ContactID]),
    CONSTRAINT [FK_TribunalCaseContact_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseContact_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseContact_TribunalCase] FOREIGN KEY ([TribunalCaseID]) REFERENCES [V7].[TribunalCase] ([TribunalCaseID]),
    CONSTRAINT [FK_TribunalCaseContact_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseContact_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

