CREATE TABLE [V7].[IncidentKind] (
    [IncidentKindID]       INT           IDENTITY (1, 1) NOT NULL,
    [Reference]            NVARCHAR (50) NOT NULL,
    [UserAreaID]           INT           NULL,
    [CreatedByUserID]      INT           NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NULL,
    [ModifiedByUserID] INT           NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT           NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [RIDDORValue]          INT           NULL,
    [IsForNonAccidentOnly] BIT           DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK__Incident__B9D2D68B3FD729EC] PRIMARY KEY CLUSTERED ([IncidentKindID] ASC),
    CONSTRAINT [FK_IncidentKind_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_IncidentKind_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_IncidentKind_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_IncidentKind_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

