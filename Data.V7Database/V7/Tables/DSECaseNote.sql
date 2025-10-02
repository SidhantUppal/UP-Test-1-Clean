CREATE TABLE [V7].[DSECaseNote] (
    [DSECaseNoteID]        INT            IDENTITY (1, 1) NOT NULL,
    [DSECaseID]            INT            NOT NULL,
    [Note]                 NVARCHAR (MAX) NOT NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [IsPrivate]            BIT            DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([DSECaseNoteID] ASC),
    CONSTRAINT [FK_DSECaseNote_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DSECaseNote_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DSECaseNote_DSECase] FOREIGN KEY ([DSECaseID]) REFERENCES [V7].[DSECase] ([DSECaseID]),
    CONSTRAINT [FK_DSECaseNote_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DSECaseNote_Note]
    ON [V7].[DSECaseNote]([DSECaseID] ASC)
    INCLUDE([Note], [CreatedByUserID], [CreatedDate]);

