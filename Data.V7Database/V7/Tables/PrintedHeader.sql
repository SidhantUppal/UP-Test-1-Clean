CREATE TABLE [V7].[PrintedHeader] (
    [PrintedHeaderID]      INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT            NOT NULL,
    [AttachmentID]         INT            NOT NULL,
    [OrgGroupID]           INT            NULL,
    [Title]                NVARCHAR (255) NULL,
    [DisplayWidthPX]       INT            NULL,
    [DisplayHeightPX]      INT            NULL,
    [PDFRowHeightMM]       INT            NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__PrintedH__CA57F9B63BFF49F5] PRIMARY KEY CLUSTERED ([PrintedHeaderID] ASC),
    CONSTRAINT [FK_PrintedHeader_ArchivedByUserID] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PrintedHeader_AttachmentID] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_PrintedHeader_CreatedByUserID] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PrintedHeader_ModifiedByUserID] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PrintedHeader_OrgGroupID] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_PrintedHeader_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

