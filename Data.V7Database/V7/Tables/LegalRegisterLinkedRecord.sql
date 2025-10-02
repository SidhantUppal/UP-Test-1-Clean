CREATE TABLE [V7].[LegalRegisterLinkedRecord] (
    [LegalRegisterLinkedRecordID] INT                IDENTITY (1, 1) NOT NULL,
    [LegalRegisterID]             INT                NOT NULL,
    [LinkedRecordType]            NVARCHAR (100)     NOT NULL,
    [LinkedRecordID]              INT                NOT NULL,
    [LinkedRecordTitle]           NVARCHAR (500)     NOT NULL,
    [CreatedByUserID]             INT                NOT NULL,
    [CreatedDate]                 DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]        INT                NULL,
    [ModifiedDate]            DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]            INT                NULL,
    [ArchivedDate]                DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_LegalRegisterLinkedRecord] PRIMARY KEY CLUSTERED ([LegalRegisterLinkedRecordID] ASC),
    CONSTRAINT [FK_LegalRegisterLinkedRecord_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_LegalRegisterLinkedRecord_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_LegalRegisterLinkedRecord_LegalRegister] FOREIGN KEY ([LegalRegisterID]) REFERENCES [V7].[LegalRegister] ([LegalRegisterID]),
    CONSTRAINT [FK_LegalRegisterLinkedRecord_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_LegalRegisterLinkedRecord_LegalRegisterID]
    ON [V7].[LegalRegisterLinkedRecord]([LegalRegisterID] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_LegalRegisterLinkedRecord_LinkedRecord]
    ON [V7].[LegalRegisterLinkedRecord]([LinkedRecordType] ASC, [LinkedRecordID] ASC) WHERE ([ArchivedDate] IS NULL);

