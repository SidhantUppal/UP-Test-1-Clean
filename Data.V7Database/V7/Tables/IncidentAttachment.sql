CREATE TABLE [V7].[IncidentAttachment] (
    [IncidentAttachmentID] INT           IDENTITY (1, 1) NOT NULL,
    [IncidentCaseID]       INT           NOT NULL,
    [AttachmentID]         INT           NOT NULL,
    [FormType]             NVARCHAR (50) NULL,
    [CreatedDate]          DATETIME2 (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [CreatedByUserID]      INT           NOT NULL,
    CONSTRAINT [PK_IncidentAttachment] PRIMARY KEY CLUSTERED ([IncidentAttachmentID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_IncidentAttachment_AttachmentID]
    ON [V7].[IncidentAttachment]([AttachmentID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_IncidentAttachment_IncidentCaseID]
    ON [V7].[IncidentAttachment]([IncidentCaseID] ASC);

