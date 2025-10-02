CREATE TABLE [V7].[ContactContactType] (
    [ContactContactTypeID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]         INT           NULL,
    [ContactID]            INT NOT NULL,
    [ContactTypeID]        INT NOT NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ContactContactTypeID] ASC),
    CONSTRAINT [FK_ContactContactType_Contact] FOREIGN KEY ([ContactID]) REFERENCES [V7].[Contact] ([ContactID]),
    CONSTRAINT [FK_ContactContactType_ContactType] FOREIGN KEY ([ContactTypeID]) REFERENCES [V7].[ContactType] ([ContactTypeID]),
    CONSTRAINT [CK_ContactContactType_Unique] UNIQUE NONCLUSTERED ([ContactID] ASC, [ContactTypeID] ASC)
,
    CONSTRAINT [FK_ContactContactType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContactContactType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContactContactType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContactContactType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ContactContactType_ContactTypeID_includes]
    ON [V7].[ContactContactType]([ContactTypeID] ASC)
    INCLUDE([ContactContactTypeID], [ContactID]);


