CREATE TABLE [V7].[SSOWExternalLink] (
    [SSOWExternalLinkID]   INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [DocumentType]         NVARCHAR (50)      NOT NULL,
    [DocumentID]           INT                NOT NULL,
    [LinkTitle]            NVARCHAR (255)     NOT NULL,
    [LinkURL]              NVARCHAR (500)     NOT NULL,
    [LinkDescription]      NVARCHAR (500)     NULL,
    [LinkType]             NVARCHAR (50)      DEFAULT ('Reference') NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([SSOWExternalLinkID] ASC),
    CONSTRAINT [FK_SSOWExternalLink_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

