CREATE TABLE [V7].[DSECaseAttachment] (
    [DSECaseAttachmentID] INT IDENTITY (1, 1) NOT NULL,
    [DSECaseID]           INT NOT NULL,
    [AttachmentID]        INT NOT NULL,
    PRIMARY KEY CLUSTERED ([DSECaseAttachmentID] ASC),
    CONSTRAINT [FK_DSECaseAttachment_DSECase] FOREIGN KEY ([DSECaseID]) REFERENCES [V7].[DSECase] ([DSECaseID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DSECaseAttachment_DSECaseIDAttachmentID]
    ON [V7].[DSECaseAttachment]([DSECaseID] ASC, [AttachmentID] ASC);

