CREATE TABLE [V7].[CaseLog] (
    [CaseLogID]       INT            IDENTITY (1, 1) NOT NULL,
    [CaseID]          INT            NOT NULL,
    [Comment]         NVARCHAR (MAX) NOT NULL,
    [CreatedByUserID] INT            NOT NULL,
    [CreatedDate]     DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([CaseLogID] ASC),
    CONSTRAINT [FK_CaseLog_Case] FOREIGN KEY ([CaseID]) REFERENCES [V7].[Case] ([CaseID]),
    CONSTRAINT [FK_CaseLog_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID])
);

