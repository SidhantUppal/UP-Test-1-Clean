CREATE TABLE [V7].[AssetAttachment] (
    [AssetAttachmentID]     INT IDENTITY (1, 1) NOT NULL,
    [AttachmentID]          INT NOT NULL,
    [AssetID]               INT NOT NULL,
    [TextBlockCollectionID] INT NULL,
    PRIMARY KEY CLUSTERED ([AssetAttachmentID] ASC)
);

