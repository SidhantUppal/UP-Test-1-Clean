CREATE TABLE [V7].[IncidentCaseNote] (
    [CaseNoteID]           INT                IDENTITY (1, 1) NOT NULL,
    [IncidentCaseID]       INT                NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [NoteText]             NVARCHAR (MAX)     NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedByName]        NVARCHAR (255)     NOT NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NOT NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [IsDeleted]            BIT                DEFAULT ((0)) NULL,
    CONSTRAINT [PK_IncidentCaseNote] PRIMARY KEY CLUSTERED ([CaseNoteID] ASC),
    CONSTRAINT [CK_IncidentCaseNote_CreatedByUserID_Positive] CHECK ([CreatedByUserID]>(0)),
    CONSTRAINT [CK_IncidentCaseNote_NoteText_Length] CHECK (len(ltrim(rtrim([NoteText])))>(0)),
    CONSTRAINT [CK_IncidentCaseNote_UserAreaID_Positive] CHECK ([UserAreaID]>(0)),
    CONSTRAINT [FK_IncidentCaseNote_IncidentCase] FOREIGN KEY ([IncidentCaseID]) REFERENCES [V7].[IncidentCase] ([IncidentCaseID])
);


GO
CREATE NONCLUSTERED INDEX [IX_IncidentCaseNote_IncidentCaseID_UserAreaID_Archived]
    ON [V7].[IncidentCaseNote]([IncidentCaseID] ASC, [UserAreaID] ASC, [ArchivedDate] ASC)
    INCLUDE([CaseNoteID], [CreatedDate], [CreatedByName], [NoteText]);


GO
CREATE NONCLUSTERED INDEX [IX_IncidentCaseNote_UserAreaID_CreatedDate]
    ON [V7].[IncidentCaseNote]([UserAreaID] ASC, [CreatedDate] DESC) WHERE ([ArchivedDate] IS NULL);

