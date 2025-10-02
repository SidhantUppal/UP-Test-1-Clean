CREATE TABLE [V7].[BodyPart] (
    [BodyPartID]           INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT           NULL,
    [ParentBodyPartID]     INT           NULL,
    [Reference]            NVARCHAR (50) NOT NULL,
    [CreatedByUserID]      INT           NULL,
    [ModifiedByUserID] INT           NULL,
    [ArchivedByUserID]     INT           NULL,
    [RIDDORValue]          INT           NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [CreatedDate] DATETIMEOFFSET (7) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([BodyPartID] ASC),
    CONSTRAINT [FK_BodyPart_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BodyPart_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BodyPart_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BodyPart_ParentBodyPartID] FOREIGN KEY ([ParentBodyPartID]) REFERENCES [V7].[BodyPart] ([BodyPartID]),
    CONSTRAINT [FK_BodyPart_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

