CREATE TABLE [V7].[CourseAttachment] (
    [CourseAttachmentID]   INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [CourseID]             INT                NOT NULL,
    [AttachmentID]         INT                NOT NULL,
    [AttachmentType]       NVARCHAR (50)      DEFAULT ('Resource') NULL,
    [Title]                NVARCHAR (255)     NOT NULL,
    [Description]          NVARCHAR (500)     NULL,
    [SequenceOrder]        INT                DEFAULT ((0)) NULL,
    [IsRequired]           BIT                DEFAULT ((0)) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]     INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CourseAttachmentID] ASC),
    CONSTRAINT [FK_CourseAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_CourseAttachment_Course] FOREIGN KEY ([CourseID]) REFERENCES [V7].[Course] ([CourseID]),
    CONSTRAINT [FK_CourseAttachment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

