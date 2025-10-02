CREATE TABLE [V7].[SSOWLocation] (
    [SSOWLocationID]        INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]            INT                NOT NULL,
    [LocationID]            INT                NOT NULL,
    [DocumentType]          NVARCHAR (50)      NOT NULL,
    [DocumentID]            INT                NOT NULL,
    [LocationSpecificNotes] NVARCHAR (MAX)     NULL,
    [LocalVariations]       NVARCHAR (MAX)     NULL,
    [CreatedByUserID]       INT                NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]  INT                NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT                NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([SSOWLocationID] ASC),
    CONSTRAINT [FK_SSOWLocation_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_SSOWLocation_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

