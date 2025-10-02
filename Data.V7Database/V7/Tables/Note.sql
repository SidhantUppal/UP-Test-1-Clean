CREATE TABLE [V7].[Note] (
    [NoteID]               INT            IDENTITY (1, 1) NOT NULL,
    [NoteTypeID]           INT            NOT NULL,
    [NoteParentItemID]     INT            NOT NULL,
    [NoteChildItemID]      INT            NULL,
    [NoteText]             NVARCHAR (MAX) NOT NULL,
    [UserAreaID]           INT            NOT NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([NoteID] ASC),
    CONSTRAINT [FK_Note_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Note_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Note_ModifiedByUser] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Note_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

