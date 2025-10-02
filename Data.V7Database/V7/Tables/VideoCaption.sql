CREATE TABLE [V7].[VideoCaption] (
    [VideoCaptionID]      INT            IDENTITY (1, 1) NOT NULL,
    [AttachmentID]        INT            NOT NULL,
    [CaptionAttachmentID] INT            NOT NULL,
    [Title]               NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([VideoCaptionID] ASC),
    CONSTRAINT [FK_VideoCaption_AttachmentID] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_VideoCaption_CaptionAttachmentID] FOREIGN KEY ([CaptionAttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID])
);

