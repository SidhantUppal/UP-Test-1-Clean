CREATE TABLE [V7].[EventTagType] (
    [EventTagTypeID] INT IDENTITY (1, 1) NOT NULL,
    [EventID]        INT NOT NULL,
    [TagTypeID]      INT NOT NULL,
    PRIMARY KEY CLUSTERED ([EventTagTypeID] ASC),
    CONSTRAINT [FK_EventTagType_Event] FOREIGN KEY ([EventID]) REFERENCES [V7].[Event] ([EventID]),
    CONSTRAINT [FK_EventTagType_TagType] FOREIGN KEY ([TagTypeID]) REFERENCES [V7].[TagType] ([TagTypeID])
);

