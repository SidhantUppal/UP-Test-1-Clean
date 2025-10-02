CREATE TABLE [V7].[Licence] (
    [LicenceID]            INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT            NOT NULL,
    [Notes]                NVARCHAR (MAX) NULL,
    [UserLimit]            INT            NULL,
    [ExpiryDate]           DATE           NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [IsNotArchived]        AS             (case when [ArchivedDate] is null then (1) else (0) end) PERSISTED NOT NULL,
    PRIMARY KEY CLUSTERED ([LicenceID] ASC),
    CONSTRAINT [FK_Licence_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ArchivedDate]
    ON [V7].[Licence]([ArchivedDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_ExpiryDate]
    ON [V7].[Licence]([ExpiryDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_IsNotArchived]
    ON [V7].[Licence]([IsNotArchived] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Licence_UserArea]
    ON [V7].[Licence]([UserAreaID] ASC, [ArchivedDate] ASC)
    INCLUDE([UserLimit], [ExpiryDate]);

