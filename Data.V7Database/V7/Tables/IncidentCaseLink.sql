CREATE TABLE [V7].[IncidentCaseLink] (
    [IncidentCaseLinkID]   INT                IDENTITY (1, 1) NOT NULL,
    [SourceIncidentCaseID] INT                NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [LinkedRecordType]     NVARCHAR (100)     NOT NULL,
    [LinkedRecordID]       INT                NOT NULL,
    [LinkedRecordTitle]    NVARCHAR (500)     NULL,
    [LinkComments]         NVARCHAR (MAX)     NULL,
    [LinkType]             NVARCHAR (50)      DEFAULT ('Related') NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_IncidentCaseLink] PRIMARY KEY CLUSTERED ([IncidentCaseLinkID] ASC),
    CONSTRAINT [FK_IncidentCaseLink_SourceIncidentCase] FOREIGN KEY ([SourceIncidentCaseID]) REFERENCES [V7].[IncidentCase] ([IncidentCaseID])
);


GO
CREATE NONCLUSTERED INDEX [IX_IncidentCaseLink_LinkedRecord]
    ON [V7].[IncidentCaseLink]([LinkedRecordType] ASC, [LinkedRecordID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_IncidentCaseLink_SourceIncident]
    ON [V7].[IncidentCaseLink]([SourceIncidentCaseID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_IncidentCaseLink_UserAreaID]
    ON [V7].[IncidentCaseLink]([UserAreaID] ASC);

