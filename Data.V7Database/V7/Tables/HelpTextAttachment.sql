CREATE TABLE [V7].[HelpTextAttachment] (
    [HelpTextAttachmentID] INT IDENTITY (1, 1) NOT NULL,
    [HelpTextID]           INT NOT NULL,
    [AttachmentID]         INT NOT NULL,
    PRIMARY KEY CLUSTERED ([HelpTextAttachmentID] ASC)
);

