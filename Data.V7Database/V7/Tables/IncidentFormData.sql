CREATE TABLE [V7].[IncidentFormData] (
    [IncidentFormDataID] INT            IDENTITY (1, 1) NOT NULL,
    [IncidentCaseID]     INT            NULL,
    [UserAreaID]         INT            NOT NULL,
    [IncidentTypeID]     INT            NOT NULL,
    [FormData]           NVARCHAR (MAX) NULL,
    [Status]             NVARCHAR (50)  DEFAULT ('Draft') NULL,
    [SubmittedDate]      DATETIMEOFFSET (7) NULL,
    [SubmittedByUserID]  INT            NULL,
    [CreatedDate]        DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NULL,
    [CreatedByUserID]    INT            NOT NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedByUserID]   INT            NOT NULL,
    [IsDeleted]          BIT            DEFAULT ((0)) NULL,
    PRIMARY KEY CLUSTERED ([IncidentFormDataID] ASC),
    FOREIGN KEY ([IncidentCaseID]) REFERENCES [V7].[IncidentCase] ([IncidentCaseID]),
    FOREIGN KEY ([IncidentTypeID]) REFERENCES [V7].[IncidentType] ([IncidentTypeID])
);

