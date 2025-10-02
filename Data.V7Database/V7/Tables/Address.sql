CREATE TABLE [V7].[Address] (
    [AddressID] INT            IDENTITY (1, 1) NOT NULL,
    [Line1]     NVARCHAR (255) NULL,
    [Line2]     NVARCHAR (255) NULL,
    [Line3]     NVARCHAR (255) NULL,
    [TownCity]  NVARCHAR (50)  NULL,
    [County]    NVARCHAR (50)  NULL,
    [PostCode]  NVARCHAR (8)   NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AddressID] ASC),
    CONSTRAINT [FK_Address_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Address_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Address_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

