CREATE TABLE [V7].[CaseEmailNotification] (
    [CaseEmailNotificationID] INT            IDENTITY (1, 1) NOT NULL,
    [CaseID]                  INT            NOT NULL,
    [EmailTo]                 NVARCHAR (255) NOT NULL,
    [EmailSubject]            NVARCHAR (255) NOT NULL,
    [EmailBody]               NVARCHAR (MAX) NOT NULL,
    [IsSent]                  BIT            DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]         INT            NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ProcessedDate]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CaseEmailNotificationID] ASC),
    CONSTRAINT [FK_CaseEmailNotification_Case] FOREIGN KEY ([CaseID]) REFERENCES [V7].[Case] ([CaseID]),
    CONSTRAINT [FK_CaseEmailNotification_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID])
);

