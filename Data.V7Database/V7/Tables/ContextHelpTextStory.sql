CREATE TABLE [V7].[ContextHelpTextStory] (
    [ContextHelpTextStoryID] INT             IDENTITY (1, 1) NOT NULL,
    [StoryName]              NVARCHAR (100)  NOT NULL,
    [StoryDescription]       NVARCHAR (1000) NULL,
    [ControllerName]         NVARCHAR (100)  NOT NULL,
    [ActionName]             NVARCHAR (100)  NOT NULL,
    [CreatedByUserID]        INT             NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]       INT             NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT             NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__ContextH__169E9E1E06DD39AD] PRIMARY KEY CLUSTERED ([ContextHelpTextStoryID] ASC),
    CONSTRAINT [FK_ContextHelpTextStory_ArchivedByUserID] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContextHelpTextStory_CreatedByUserID] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContextHelpTextStory_ModifiedByUserID] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

