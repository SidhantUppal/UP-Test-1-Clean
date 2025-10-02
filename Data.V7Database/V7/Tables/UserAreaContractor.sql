CREATE TABLE [V7].[UserAreaContractor] (
    [UserAreaContractorID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [ContractorUserAreaID] INT                NOT NULL,
    [IsActive]             BIT                DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaContractorID] ASC),
    CONSTRAINT [FK_UserAreaContractor_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaContractor_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaContractor_Employee] FOREIGN KEY ([ContractorUserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_UserAreaContractor_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaContractor_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaContractor_UserAreaID]
    ON [V7].[UserAreaContractor]([UserAreaID] ASC)
    INCLUDE([UserAreaContractorID], [ContractorUserAreaID], [IsActive], [ArchivedDate]);

