CREATE TABLE [V7].[AttachmentType] (
    [AttachmentTypeID] INT            IDENTITY (1, 1) NOT NULL,
    [Title]            NVARCHAR (250) NOT NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([AttachmentTypeID] ASC)
);

