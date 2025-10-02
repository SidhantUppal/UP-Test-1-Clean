CREATE TABLE [V7].[HazardReportAttachment] (
    [HazardReportAttachmentID] INT IDENTITY (1, 1) NOT NULL,
    [HazardReportID]           INT NOT NULL,
    [AttachmentID]             INT NOT NULL,
    PRIMARY KEY CLUSTERED ([HazardReportAttachmentID] ASC),
    CONSTRAINT [FK_HazardReportAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_HazardReportAttachment_HazardReport] FOREIGN KEY ([HazardReportID]) REFERENCES [V7].[HazardReport] ([HazardReportID])
);

