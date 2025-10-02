CREATE TABLE [V7].[AccidentCaseAssociation] (
    [AccidentCaseAssociationID] INT            IDENTITY (1, 1) NOT NULL,
    [MasterAccidentCaseID]      INT            NOT NULL,
    [AssociatedAccidentCaseID]  INT            NOT NULL,
    [Comment]                   NVARCHAR (MAX) NULL,
    [CreatedByUserID]           INT            NOT NULL,
    [CreatedDate]               DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]      INT            NULL,
    [ModifiedDate]          DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]          INT            NULL,
    [ArchivedDate]              DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AccidentCaseAssociationID] ASC),
    CONSTRAINT [FK_AccidentCaseAssociation_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseAssociation_AssociatedAccidentCase] FOREIGN KEY ([AssociatedAccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_AccidentCaseAssociation_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AccidentCaseAssociation_MasterAccidentCase] FOREIGN KEY ([MasterAccidentCaseID]) REFERENCES [V7].[AccidentCase] ([AccidentCaseID]),
    CONSTRAINT [FK_AccidentCaseAssociation_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

