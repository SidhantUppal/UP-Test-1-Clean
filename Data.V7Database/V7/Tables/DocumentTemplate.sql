CREATE TABLE [V7].[DocumentTemplate] (
    [DocumentTemplateID]   INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [Title]                NVARCHAR (255)     NOT NULL,
    [Description]          NVARCHAR (MAX)     NULL,
    [Content]              NVARCHAR (MAX)     NOT NULL,
    [DocumentType]         NVARCHAR (50)      DEFAULT ('contract') NOT NULL,
    [Category]             NVARCHAR (100)     NULL,
    [Tags]                 NVARCHAR (MAX)     NULL,
    [PlaceholderTags]      NVARCHAR (MAX)     NULL,
    [Version]              NVARCHAR (20)      DEFAULT ('1.0') NOT NULL,
    [IsActive]             BIT                DEFAULT ((1)) NOT NULL,
    [IsPublic]             BIT                DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([DocumentTemplateID] ASC),
    FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentTemplate_Category]
    ON [V7].[DocumentTemplate]([Category] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentTemplate_DocumentType]
    ON [V7].[DocumentTemplate]([DocumentType] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentTemplate_IsActive]
    ON [V7].[DocumentTemplate]([IsActive] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentTemplate_Title]
    ON [V7].[DocumentTemplate]([Title] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentTemplate_UserAreaID]
    ON [V7].[DocumentTemplate]([UserAreaID] ASC);

