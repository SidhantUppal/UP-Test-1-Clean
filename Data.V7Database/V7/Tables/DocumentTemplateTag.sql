CREATE TABLE [V7].[DocumentTemplateTag] (
    [DocumentTemplateTagID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]            INT                NOT NULL,
    [TagName]               NVARCHAR (100)     NOT NULL,
    [DisplayName]           NVARCHAR (255)     NOT NULL,
    [Description]           NVARCHAR (500)     NULL,
    [Category]              NVARCHAR (50)      NULL,
    [DataType]              NVARCHAR (20)      DEFAULT ('text') NOT NULL,
    [SampleValue]           NVARCHAR (500)     NULL,
    [IsSystemTag]           BIT                DEFAULT ((0)) NOT NULL,
    [IsActive]              BIT                DEFAULT ((1)) NOT NULL,
    [CreatedByUserID]       INT                NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]  INT                NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT                NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([DocumentTemplateTagID] ASC),
    FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    UNIQUE NONCLUSTERED ([UserAreaID] ASC, [TagName] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentTemplateTag_Category]
    ON [V7].[DocumentTemplateTag]([Category] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentTemplateTag_IsActive]
    ON [V7].[DocumentTemplateTag]([IsActive] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentTemplateTag_TagName]
    ON [V7].[DocumentTemplateTag]([TagName] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentTemplateTag_UserAreaID]
    ON [V7].[DocumentTemplateTag]([UserAreaID] ASC);

