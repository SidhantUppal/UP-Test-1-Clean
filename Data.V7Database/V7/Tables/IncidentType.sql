CREATE TABLE [V7].[IncidentType] (
    [IncidentTypeID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]     INT            NULL,
    [Title]          NVARCHAR (100) NOT NULL,
    [Reference]      NVARCHAR (50)  NOT NULL,
    [Description]    NVARCHAR (500) NULL,
    [FormTemplateID] INT            NULL,
    [IsActive]       BIT            DEFAULT ((1)) NULL,
    [DisplayOrder]   INT            DEFAULT ((0)) NULL,
    [CreatedByUserID]          INT            DEFAULT (1) NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) DEFAULT (SYSDATETIMEOFFSET()) NOT NULL,
    [ModifiedByUserID]         INT            NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT            NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([IncidentTypeID] ASC),
    UNIQUE NONCLUSTERED ([Reference] ASC),
    CONSTRAINT [FK_IncidentType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_IncidentType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_IncidentType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_IncidentType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


