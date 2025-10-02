CREATE TABLE [V7].[AttachmentLocation] (
    [AttachmentLocationID] INT IDENTITY (1, 1) NOT NULL,
    [AttachmentID]         INT NOT NULL,
    [LocationID]           INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AttachmentLocationID] ASC),
    CONSTRAINT [FK_AttachmentLocation_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_AttachmentLocation_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [CK_AttachmentLocation_Unique] UNIQUE NONCLUSTERED ([AttachmentID] ASC, [LocationID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_AttachmentLocation_LocationID_includes]
    ON [V7].[AttachmentLocation]([LocationID] ASC)
    INCLUDE([AttachmentLocationID], [AttachmentID]);

