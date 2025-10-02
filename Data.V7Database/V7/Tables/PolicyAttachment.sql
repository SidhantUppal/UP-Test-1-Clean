CREATE TABLE [V7].[PolicyAttachment] (
    [PolicyAttachmentID]    INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]            INT                NOT NULL,
    [PolicyID]              INT                NOT NULL,
    [AttachmentID]          INT                NOT NULL,
    [AttachmentType]        NVARCHAR (50)      DEFAULT ('Document') NULL,
    [AttachmentTitle]       NVARCHAR (255)     NOT NULL,
    [AttachmentDescription] NVARCHAR (500)     NULL,
    [SequenceOrder]         INT                DEFAULT ((0)) NULL,
    [IsRequired]            BIT                DEFAULT ((0)) NULL,
    [CreatedByUserID]       INT                NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]  INT                NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT                NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PolicyAttachmentID] ASC),
    CONSTRAINT [FK_PolicyAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_PolicyAttachment_Policy] FOREIGN KEY ([PolicyID]) REFERENCES [V7].[Policy] ([PolicyID]),
    CONSTRAINT [FK_PolicyAttachment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyAttachment_PolicyID]
    ON [V7].[PolicyAttachment]([PolicyID] ASC);

