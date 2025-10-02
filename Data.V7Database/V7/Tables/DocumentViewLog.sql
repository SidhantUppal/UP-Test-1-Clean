CREATE TABLE [V7].[DocumentViewLog] (
    [ViewLogID]           INT                IDENTITY (1, 1) NOT NULL,
    [DocumentID]          INT                NOT NULL,
    [UserID]              INT                NOT NULL,
    [ViewedAt]            DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ViewMethod]          NVARCHAR (50)      NOT NULL,
    [ViewDurationSeconds] INT                NULL,
    [IPAddress]           NVARCHAR (50)      NULL,
    [UserAgent]           NVARCHAR (500)     NULL,
    [GeographicLocation]  NVARCHAR (255)     NULL,
    CONSTRAINT [PK_DocumentViewLog] PRIMARY KEY CLUSTERED ([ViewLogID] ASC),
    CONSTRAINT [FK_DocumentViewLog_Document] FOREIGN KEY ([DocumentID]) REFERENCES [V7].[Document] ([DocumentID]),
    CONSTRAINT [FK_DocumentViewLog_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentViewLog_DocumentID]
    ON [V7].[DocumentViewLog]([DocumentID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentViewLog_UserID]
    ON [V7].[DocumentViewLog]([UserID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentViewLog_ViewedAt]
    ON [V7].[DocumentViewLog]([ViewedAt] ASC);

