CREATE TABLE [V7].[AssetInspectionAttachment] (
    [AssetInspectionAttachmentID] INT IDENTITY (1, 1) NOT NULL,
    [AttachmentID]                INT NOT NULL,
    [AssetInspectionID]           INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AssetInspectionAttachmentID] ASC)
);

