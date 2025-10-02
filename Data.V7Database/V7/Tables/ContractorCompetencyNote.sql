CREATE TABLE [V7].[ContractorCompetencyNote] (
    [ContractorCompetencyNoteID] INT            IDENTITY (1, 1) NOT NULL,
    [ContractorCompetencyID]     INT            NOT NULL,
    [Notes]                      NVARCHAR (MAX) NOT NULL,
    [CreatedByUserID]            INT            NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) NOT NULL,
    [ArchivedByUserID]           INT            NULL,
    [ArchivedDate]               DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ContractorCompetencyNoteID] ASC),
    CONSTRAINT [FK_ContractorCompetencyNote_AccidentCase] FOREIGN KEY ([ContractorCompetencyID]) REFERENCES [V7].[ContractorCompetency] ([ContractorCompetencyID]),
    CONSTRAINT [FK_ContractorCompetencyNote_ArchivedByUserID] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContractorCompetencyNote_CreatedByUserID] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID])
);

