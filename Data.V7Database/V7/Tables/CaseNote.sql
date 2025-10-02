CREATE TABLE [V7].[CaseNote] (
    [CaseNoteID]       INT             IDENTITY (1, 1) NOT NULL,
    [CaseID]           INT             NOT NULL,
    [Notes]            NVARCHAR (MAX)  NOT NULL,
    [IsInternal]       BIT             DEFAULT ((0)) NOT NULL,
    [ActionFromDate]   DATETIMEOFFSET (7) NULL,
    [ActionToDate]     DATETIMEOFFSET (7) NULL,
    [ActionInHours]    DECIMAL (10, 2) NULL,
    [CreatedByUserID]  INT             NOT NULL,
    [CreatedDate]      DATETIMEOFFSET (7) NOT NULL,
    [ArchivedByUserID] INT             NULL,
    [ArchivedDate]     DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CaseNoteID] ASC),
    CONSTRAINT [FK_CaseNote_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CaseNote_Case] FOREIGN KEY ([CaseID]) REFERENCES [V7].[Case] ([CaseID]),
    CONSTRAINT [FK_CaseNote_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID])
);

