CREATE TABLE [V7].[ContactAttachment] (
    [ContactAttachmentID]     INT IDENTITY (1, 1) NOT NULL,
    [ContactID]               INT NOT NULL,
    [AttachmentID]            INT NOT NULL,
    [ContactAttachmentTypeID] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ContactAttachmentID] ASC),
    CONSTRAINT [FK_ContactAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_ContactAttachment_Contact] FOREIGN KEY ([ContactID]) REFERENCES [V7].[Contact] ([ContactID])
);

