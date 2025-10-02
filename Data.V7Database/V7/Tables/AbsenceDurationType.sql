CREATE TABLE [V7].[AbsenceDurationType] (
    [AbsenceDurationTypeID] INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]            INT           NULL,
    [IsConfigurable]        BIT           NOT NULL,
    [Reference]             NVARCHAR (50) NULL,
    [Title] NVARCHAR (100) NULL,
    [CreatedByUserID]       INT           NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]      INT           NULL,
    [ModifiedDate]          DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT           NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AbsenceDurationTypeID] ASC),
    CONSTRAINT [FK_AbsenceDurationType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceDurationType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceDurationType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AbsenceDurationType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

