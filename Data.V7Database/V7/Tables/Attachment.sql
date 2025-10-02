CREATE TABLE [V7].[Attachment] (
    [AttachmentID]         INT                IDENTITY (1, 1) NOT NULL,
    [AttachmentGuidName]   NVARCHAR (250)     NULL,
    [AttachmentType]       VARCHAR (20)       NOT NULL,
    [DisplayName]          NVARCHAR (255)     NOT NULL,
    [FileName]             NVARCHAR (255)     NOT NULL,
    [FileSizeBytes]        INT                NOT NULL,
    [ContentType]          NVARCHAR (100)     NOT NULL,
    [IsPublic]             BIT                DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AttachmentID] ASC),
    CONSTRAINT [FK_Attachment_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Attachment_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Attachment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

