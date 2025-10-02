CREATE TABLE [V7].[ContextHelpText] (
    [ContextHelpTextID]      INT            IDENTITY (1, 1) NOT NULL,
    [AnchorPoint]            NVARCHAR (100) NOT NULL,
    [ControllerName]         NVARCHAR (100) NOT NULL,
    [ActionName]             NVARCHAR (100) NOT NULL,
    [IsLive]                 BIT            CONSTRAINT [DF__ContextHe__IsLiv__7F3866D5] DEFAULT ((1)) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    [HelpText] NVARCHAR (MAX) NULL,
    [UseIntroJS]             BIT            CONSTRAINT [DF__ContextHe__UseIn__04872BD7] DEFAULT ((1)) NOT NULL,
    [AnchorElementName]      VARCHAR (20)   NULL,
    [AnchorCoordinates]      VARCHAR (20)   NULL,
    [ContextHelpTextStoryID] INT            NULL,
    [StoryItemOrderNum]      INT            NULL,
    [CreatedByUserID]        INT            NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]       INT            NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT            NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__ContextH__0C5118E98599DAB2] PRIMARY KEY CLUSTERED ([ContextHelpTextID] ASC),
    CONSTRAINT [FK_ContextHelpText_ArchivedByUserID] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContextHelpText_ContextHelpTextStory] FOREIGN KEY ([ContextHelpTextStoryID]) REFERENCES [V7].[ContextHelpTextStory] ([ContextHelpTextStoryID]),
    CONSTRAINT [FK_ContextHelpText_CreatedByUserID] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContextHelpText_ModifiedByUserID] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ContextHelpText_FindByAnchorAndPage]
    ON [V7].[ContextHelpText]([AnchorPoint] ASC, [ControllerName] ASC, [ActionName] ASC)
    INCLUDE([ContextHelpTextID], [IsLive], [UseIntroJS]);

