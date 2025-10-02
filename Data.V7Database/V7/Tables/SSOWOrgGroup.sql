CREATE TABLE [V7].[SSOWOrgGroup] (
    [SSOWOrgGroupID]         INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]             INT                NOT NULL,
    [OrgGroupID]             INT                NOT NULL,
    [DocumentType]           NVARCHAR (50)      NOT NULL,
    [DocumentID]             INT                NOT NULL,
    [GroupSpecificNotes]     NVARCHAR (MAX)     NULL,
    [AdditionalRequirements] NVARCHAR (MAX)     NULL,
    [CreatedByUserID]        INT                NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]   INT                NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT                NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([SSOWOrgGroupID] ASC),
    CONSTRAINT [FK_SSOWOrgGroup_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_SSOWOrgGroup_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

