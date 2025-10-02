CREATE TABLE [V7].[AbsenceReasonType] (
    [AbsenceReasonTypeID]  INT           IDENTITY (1000, 1) NOT NULL,
    [UserAreaID]           INT           NULL,
    [AbsenceTypeID]        INT           NULL,
    [Title]                NVARCHAR (100)NULL,
    [Reference]            NVARCHAR (50) NULL,
    [CreatedByUserID]      INT           NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT           NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT           NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AbsenceReasonTypeID] ASC),
    CONSTRAINT [FK_AbsenceReasonType_AbsenceType] FOREIGN KEY ([AbsenceTypeID]) REFERENCES [V7].[AbsenceType] ([AbsenceTypeID]),
    CONSTRAINT [FK_AbsenceReasonType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceReasonType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceReasonType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceReasonType_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

