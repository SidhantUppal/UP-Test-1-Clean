CREATE TABLE [V7].[PolicyExternalLink] (
    [PolicyExternalLinkID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [PolicyID]             INT                NOT NULL,
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
    PRIMARY KEY CLUSTERED ([PolicyExternalLinkID] ASC),
    CONSTRAINT [FK_PolicyExternalLink_Policy] FOREIGN KEY ([PolicyID]) REFERENCES [V7].[Policy] ([PolicyID]),
    CONSTRAINT [FK_PolicyExternalLink_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyExternalLink_PolicyID]
    ON [V7].[PolicyExternalLink]([PolicyID] ASC);

