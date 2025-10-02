CREATE TABLE [V7].[CostSheet] (
    [CostSheetID]            INT             IDENTITY (1, 1) NOT NULL,
    [AccidentCaseID]         INT             NOT NULL,
    [CostToReputationTypeID] INT             NOT NULL,
    [CurrencyTypeID]         INT             NULL,
    [TotalCost]              NUMERIC (10, 2) CONSTRAINT [DF__CostSheet__Total__19EAC663] DEFAULT ((0)) NOT NULL,
    [TotalHours]             NUMERIC (10, 2) CONSTRAINT [DF__CostSheet__Total__1ADEEA9C] DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]        INT             NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]       INT             NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT             NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__CostShee__18138A885CC00828] PRIMARY KEY CLUSTERED ([CostSheetID] ASC),
    CONSTRAINT [FK_CostSheet_AccidentCase] FOREIGN KEY ([AccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_CostSheet_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CostSheet_CostToReputationType] FOREIGN KEY ([CostToReputationTypeID]) REFERENCES [V7].[CostToReputationType] ([CostToReputationTypeID]),
    CONSTRAINT [FK_CostSheet_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CostSheet_CurrencyType] FOREIGN KEY ([CurrencyTypeID]) REFERENCES [V7].[CurrencyType] ([CurrencyTypeID]),
    CONSTRAINT [FK_CostSheet_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

