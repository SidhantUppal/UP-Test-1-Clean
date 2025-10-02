CREATE TABLE [V7].[Import] (
    [ImportID]             INT            IDENTITY (1, 1) NOT NULL,
    [ImportRecordTypeID]   INT            NOT NULL,
    [ImportStatusTypeID]   INT            NOT NULL,
    [UserAreaID]           INT            NOT NULL,
    [OriginalData]         NVARCHAR (MAX) NULL,
    [PreImportData]        NVARCHAR (MAX) NULL,
    [PostImportData]       NVARCHAR (MAX) NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [ImportProgress]       TINYINT        DEFAULT ((0)) NULL,
    PRIMARY KEY CLUSTERED ([ImportID] ASC),
    CONSTRAINT [FK_Import_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Import_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Import_ImportRecordType] FOREIGN KEY ([ImportRecordTypeID]) REFERENCES [V7].[ImportRecordType] ([ImportRecordTypeID]),
    CONSTRAINT [FK_Import_ImportStatusType] FOREIGN KEY ([ImportStatusTypeID]) REFERENCES [V7].[ImportStatusType] ([ImportStatusTypeID]),
    CONSTRAINT [FK_Import_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Import_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

