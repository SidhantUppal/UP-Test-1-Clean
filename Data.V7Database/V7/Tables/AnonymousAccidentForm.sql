CREATE TABLE [V7].[AnonymousAccidentForm] (
    [AnonymousAccidentFormID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]              INT            NOT NULL,
    [AccidentFormTypeID]      INT            NOT NULL,
    [IncidentDate]            DATETIMEOFFSET (7) NOT NULL,
    [IncidentTime]            NVARCHAR (15)  NULL,
    [AdditionalReference]     NVARCHAR (250) NULL,
    [TemplateVersion]         TINYINT        CONSTRAINT [DF__Anonymous__Templ__3C417515] DEFAULT ((1)) NOT NULL,
    [XMLResponse]             XML            NULL,
    [IsSpam]                  BIT            CONSTRAINT [DF__Anonymous__IsSpa__3D35994E] DEFAULT ((0)) NOT NULL,
    [SubmittedByName]         NVARCHAR (100) NOT NULL,
    [SubmittedDate]           DATETIMEOFFSET (7) NOT NULL,
    [ProcessedByUserID]       INT            NULL,
    [ProcessedDate]           DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]        INT            NULL,
    [ArchivedDate]            DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__Anonymou__071CD56ACD74815C] PRIMARY KEY CLUSTERED ([AnonymousAccidentFormID] ASC),
    CONSTRAINT [FK_AnonymousAccidentForm_AccidentFormTypeID] FOREIGN KEY ([AccidentFormTypeID]) REFERENCES [V7].[AccidentFormType] ([AccidentFormTypeID]),
    CONSTRAINT [FK_AnonymousAccidentForm_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AnonymousAccidentForm_ProcessedBy] FOREIGN KEY ([ProcessedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_AnonymousAccidentForm_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

