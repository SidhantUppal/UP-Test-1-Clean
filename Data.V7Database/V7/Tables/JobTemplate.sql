CREATE TABLE [V7].[JobTemplate] (
    [JobTemplateID]         INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]            INT                NOT NULL,
    [TemplateName]          NVARCHAR (255)     NOT NULL,
    [TemplateDescription]   NVARCHAR (1000)    NULL,
    [TemplateCategory]      NVARCHAR (100)     NOT NULL,
    [IsSystemTemplate]      BIT                DEFAULT ((0)) NOT NULL,
    [IsActive]              BIT                DEFAULT ((1)) NOT NULL,
    [DefaultJobType]        NVARCHAR (100)     NOT NULL,
    [DefaultCronExpression] NVARCHAR (100)     NOT NULL,
    [DefaultTargetService]  NVARCHAR (100)     NOT NULL,
    [DefaultTargetEndpoint] NVARCHAR (500)     NOT NULL,
    [DefaultHttpMethod]     NVARCHAR (10)      DEFAULT ('POST') NOT NULL,
    [DefaultRequestHeaders] NVARCHAR (MAX)     NULL,
    [DefaultRequestPayload] NVARCHAR (MAX)     NULL,
    [DefaultTimeoutSeconds] INT                DEFAULT ((30)) NOT NULL,
    [DefaultMaxRetries]     INT                DEFAULT ((3)) NOT NULL,
    [Instructions]          NVARCHAR (MAX)     NULL,
    [ConfigurationSchema]   NVARCHAR (MAX)     NULL,
    [ExamplePayload]        NVARCHAR (MAX)     NULL,
    [Tags]                  NVARCHAR (500)     NULL,
    [UsageCount]            INT                DEFAULT ((0)) NOT NULL,
    [LastUsedDate]          DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]       INT                NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]  INT                NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT                NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_JobTemplate] PRIMARY KEY CLUSTERED ([JobTemplateID] ASC),
    CONSTRAINT [CK_JobTemplate_TemplateCategory] CHECK ([TemplateCategory]='custom' OR [TemplateCategory]='maintenance' OR [TemplateCategory]='reporting' OR [TemplateCategory]='compliance' OR [TemplateCategory]='system'),
    CONSTRAINT [FK_JobTemplate_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_JobTemplate_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_JobTemplate_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_JobTemplate_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_JobTemplate_UserAreaID_TemplateCategory]
    ON [V7].[JobTemplate]([UserAreaID] ASC, [TemplateCategory] ASC) WHERE ([ArchivedDate] IS NULL AND [IsActive]=(1));

