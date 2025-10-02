CREATE TABLE [dbo].[LegalRegisterAttachments] (
    [AttachmentID]    INT             IDENTITY (1, 1) NOT NULL,
    [LegalRegisterID] INT             NOT NULL,
    [FileName]        NVARCHAR (500)  NOT NULL,
    [FileType]        NVARCHAR (100)  NULL,
    [FileSize]        BIGINT          NULL,
    [FileData]        VARBINARY (MAX) NULL,
    [FileUrl]         NVARCHAR (1000) NULL,
    [UploadDate]      DATETIMEOFFSET (7)        NULL,
    [UploadedBy]      NVARCHAR (100)  NULL,
    CONSTRAINT [PK_LegalRegisterAttachments] PRIMARY KEY CLUSTERED ([AttachmentID] ASC),
    CONSTRAINT [FK_LegalRegisterAttachments_LegalRegister] FOREIGN KEY ([LegalRegisterID]) REFERENCES [dbo].[LegalRegister] ([LegalRegisterID]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_LegalRegisterAttachments_LegalRegisterID]
    ON [dbo].[LegalRegisterAttachments]([LegalRegisterID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_LegalRegisterAttachments_UploadDate]
    ON [dbo].[LegalRegisterAttachments]([UploadDate] DESC);

