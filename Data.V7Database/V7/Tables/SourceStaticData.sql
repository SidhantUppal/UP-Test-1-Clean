CREATE TABLE [V7].[SourceStaticData] (
    [SourceStaticDataID]     INT            IDENTITY (1, 1) NOT NULL,
    [Title]                  VARCHAR (512)  NULL,
    [SourceStaticDataTypeID] INT            NOT NULL,
    [UserAreaID]             INT            NULL,
    [IconFileName]           NVARCHAR (256) NULL,
    [CreatedByUserID]        INT            NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]   INT            NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT            NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([SourceStaticDataID] ASC),
    CONSTRAINT [FK_SourceStaticData_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SourceStaticData_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SourceStaticData_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SourceStaticData_SourceStaticDataTypeID] FOREIGN KEY ([SourceStaticDataTypeID]) REFERENCES [V7].[SourceStaticDataType] ([SourceStaticDataTypeID]),
    CONSTRAINT [FK_SourceStaticData_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

